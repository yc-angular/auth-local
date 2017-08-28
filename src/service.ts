import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Auth } from '@yca/auth';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthLocal {

  constructor(
    public readonly paths: AuthLocalPaths,
    private auth: Auth,
    private http: Http
  ) { }

  async signin(params: any): Promise<void> {
    const url = this.paths.root + this.paths.signin;
    const data = await this.http.post(url, params)
      .map(x => x.json())
      .toPromise();
    this.auth.signJwt(data.token);
  }

  async signup(params: any): Promise<void> {
    const url = this.paths.root + this.paths.signup;
    const data = await this.http.post(url, params)
      .map(x => x.json())
      .toPromise();
    this.auth.signJwt(data.token);
  }

  async reset(params: any): Promise<void> {
    const url = this.paths.root + this.paths.reset;
    await this.http.post(url, params)
      .toPromise();
  }

}

export interface AuthLocalPaths {
  root?: string;
  signin?: string;
  signup?: string;
  reset?: string;
}

