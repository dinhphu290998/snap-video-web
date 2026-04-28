import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      // Thêm cấu hình cuộn trang ở đây
      withInMemoryScrolling({ 
        scrollPositionRestoration: 'enabled', // Tự động lên đầu trang khi chuyển link
        anchorScrolling: 'enabled'            // Hỗ trợ cuộn đến các id (#) nếu cần
      })),
    provideHttpClient(),
    FormsModule
  ]
};