import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { Auth } from '@yca/auth';
import { AuthLocal, AuthLocalPaths } from './service';

export * from './service';

export const DefaultAuthLocalPaths: AuthLocalPaths = {
  root: 'http://localhost:9000',
  signin: '/auth/local',
  signup: '/auth/local/signup',
  reset: '/auth/local/reset'
}

export function AuthLocalFactory(alp: AuthLocalPaths, auth: Auth, http: Http) {
  return new AuthLocal(alp, auth, http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ]
})
export class AuthLocalModule {
  static forRoot(options: AuthLocalPaths = DefaultAuthLocalPaths): ModuleWithProviders {
    return {
      ngModule: AuthLocalModule,
      providers: [
        Http,
        {
          provide: DefaultAuthLocalPaths,
          useValue: options
        },
        {
          provide: AuthLocal,
          useFactory: AuthLocalFactory,
          deps: [DefaultAuthLocalPaths, Auth, Http]
        }
      ]
    };
  }
}
