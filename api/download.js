import crypto from 'crypto';

// ================= SECURITY CONFIG =================
const allowedOrigin = 'https://www.snapvideo.asia';

// chống replay (demo memory)
const usedNonce = new Set();

// verify signature
function verifyRequest(url, timestamp, nonce, signature) {
    const SECRET = process.env.SERVER_SECRET;

    console.log(SECRET);

    if (!SECRET) return false;

    // chống replay
    if (usedNonce.has(nonce)) return false;
    usedNonce.add(nonce);

    // chống request cũ
    if (Math.abs(Date.now() - timestamp) > 30000) return false;

    const expected = crypto
        .createHmac('sha256', SECRET)
        .update(`${url}|${timestamp}|${nonce}`)
        .digest('hex');

    return expected === signature;
}


export default async function handler(req, res) {
    // ================= CORS =================
    const allowedOrigin = 'https://www.snapvideo.asia';

    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with');

    // ================= PRE-FLIGHT =================
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {

        // ================= SECURITY LAYER (NEW - NOT TOUCH OLD LOGIC) =================

        const origin = req.headers.origin;
        const referer = req.headers.referer;
        const ua = req.headers['user-agent'];

        // chặn domain lạ
        if (
            origin !== allowedOrigin &&
            (!referer || !referer.startsWith(allowedOrigin)) &&
            (!ua || ua.length < 10)
        ) {
            return res.status(403).json({
                error: 'Blocked request (security)'
            });
        }

        // lấy input (GIỮ NGUYÊN CŨ + thêm field mới)
        const { url, timestamp, nonce, signature } =
            req.method === 'POST' ? req.body : req.query;

        if (!url) {
            return res.status(400).json({ error: 'Missing url' });
        }

        // verify chống clone
        if (!verifyRequest(url, timestamp, nonce, signature)) {
            return res.status(403).json({
                error: 'Invalid signature or replay detected'
            });
        }

        // ================= TỪ ĐÂY GIỮ NGUYÊN CODE CỦA BẠN =================

        // ================= DOMAIN CHECK =================
        const isValidOrigin =
            origin === allowedOrigin ||
            (referer && referer.startsWith(allowedOrigin));

        if (!isValidOrigin) {
            return res.status(403).json({
                error: 'Forbidden: Invalid origin'
            });
        }

        // ================= BASIC BOT CHECK =================

        if (!ua || ua.length < 10) {
            return res.status(403).json({
                error: 'Forbidden: Invalid client'
            });
        }

        // ================= GET URL =================

        if (!url) {
            return res.status(400).json({ error: 'Missing url' });
        }

        const link = extractLink(url);

        // ===== TIKTOK =====
        if (link.includes('tiktok.com')) {
            const data = await fetchTikTok(link);
            if (data) return res.json(data);
        }

        // ===== FACEBOOK =====
        if (link.includes('facebook.com') || link.includes('fb.watch')) {
            const data = await fetchFacebook(link);
            if (data) return res.json(data);
        }

        // ===== YOUTUBE =====
        if (link.includes('youtube.com') || link.includes('youtu.be')) {
            const data = await fetchYoutube(link);
            if (data) return res.json(data);
        }

        // ===== FALLBACK =====
        const data = await fetchFallback(link);
        return res.json(data);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Server error' });
    }
}

// ================= EXTRACT LINK =================
function extractLink(text) {
    const regex = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+/g;

    if (text.includes('xhslink.com')) {
        const match = text.match(regex);
        return match ? match[match.length - 1] : text;
    }

    return text;
}

// ================= TIKTOK =================
async function fetchTikTok(url) {
    try {
        const r = await fetch(`https://tikwm.com/api/?url=${url}`);
        const res = await r.json();

        if (res?.code === 0 && res?.data?.play) {
            return {
                title: res.data.title || 'TikTok Video',
                thumbnail: res.data.cover,
                medias: [
                    { url: res.data.play, quality: 'hd', extension: 'mp4' }
                ]
            };
        }
    } catch (e) {
        console.log('TikTok fail');
    }
    return null;
}

// ================= FACEBOOK =================
async function fetchFacebook(url) {
    try {
        const r = await fetch('https://fdown.isuru.eu.org/info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const res = await r.json();

        if (res?.status === 'success') {
            const formats = res.available_formats;

            formats.sort((a, b) =>
                parseInt(b.quality) - parseInt(a.quality)
            );

            const best = formats[0];

            return {
                title: res.video_info?.title || 'Facebook Video',
                thumbnail: res.video_info?.thumbnail,
                medias: [
                    { url: best.url, quality: best.quality, extension: 'mp4' }
                ]
            };
        }
    } catch (e) {
        console.log('Facebook fail');
    }
    return null;
}

// ================= YOUTUBE =================
async function fetchYoutube(url) {
    try {
        const id = extractYoutubeId(url);

        const r = await fetch(
            `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${id}`,
            {
                headers: {
                    'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com',
                    'x-rapidapi-key': process.env.RAPID_YT_KEY
                }
            }
        );

        const res = await r.json();

        if (res?.status === 'OK') {
            const video = res.adaptiveFormats.find(v =>
                v.mimeType?.includes('video/mp4')
            );

            return {
                title: res.title,
                thumbnail: res.thumbnail?.slice(-1)[0]?.url,
                medias: [
                    { url: video?.url, quality: 'hd', extension: 'mp4' }
                ]
            };
        }
    } catch (e) {
        console.log('Youtube fail');
    }
    return null;
}

function extractYoutubeId(url) {
    const reg = /(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return reg.exec(url)?.[1] || '';
}

// ================= FALLBACK =================
async function fetchFallback(url) {
    const maxRetries = 5;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const r = await fetch(
                'https://snap-video3.p.rapidapi.com/download',
                {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify({ url })
                }
            );

            const res = await r.json();

            if (res?.medias) {
                const medias = res.medias.filter(m =>
                    m.extension === 'mp4' &&
                    (m.quality === 'hd' || m.quality === '720p')
                );

                if (medias.length > 0) {
                    return {
                        title: res.title || 'Video',
                        thumbnail: res.thumbnail,
                        medias
                    };
                }
            }

            throw new Error('Invalid response');

        } catch (e) {
            console.log(`Retry ${i + 1}/${maxRetries}`);

            if (i === maxRetries - 1) {
                throw new Error('API failed');
            }

            await delay(500);
        }
    }
}

// ================= HEADERS =================
function getHeaders() {
    const keys = process.env.RAPID_KEYS?.split(',') || [];
    const key = keys[Math.floor(Math.random() * keys.length)];

    return {
        'x-rapidapi-host': 'snap-video3.p.rapidapi.com',
        'x-rapidapi-key': key,
        'Content-Type': 'application/json'
    };
}

// ================= DELAY =================
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}