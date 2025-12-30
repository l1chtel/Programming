import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usersReducer } from './app/state/user-reducer';
import { UserEffects } from './app/state/user-effects';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideStore({ users: usersReducer, router: routerReducer }),
    provideEffects([UserEffects]),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25 }),
    provideAnimations(),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
