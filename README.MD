[![Build Status](https://travis-ci.org/yc-angular/auth-local.svg?branch=master)](https://travis-ci.org/yc-angular/auth-local.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/yc-angular/auth-local/badge.svg?branch=master)](https://coveralls.io/github/yc-angular/auth-local?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# @yca/auth-local

## Installation

1. Install the dependencies

install [@yca/auth](https://github.com/yc-angular/auth.git)

2. Install the Ionic plugin
```
 npm i -S @yca/auth-local
```

3. Add it to your app’s NgModule.

```typescript
// Import your library
import { AuthLocalModule } from '@yca/auth-local';

@NgModule({

  ...

  imports: [

    ...

    // Specify your library as an import
    AuthLocalModule.forRoot()

    // or user custom paths
    AuthLocalModule.forRoot({
      root: 'http://xxx.xxx',
      signin: '/signin',
      signup: '/signup',
      reset: '/reset'
    })
  ],
  
  ...

})
export class AppModule { }
```

## Usage
Once your library is imported, you can use its service in your Angular application:

```ts
import { AuthLocal } from '@yca/auth-local';

constructor(public al: AuthLocal) {
  al.signin({
    username: 'xxx',
    password: 'xxx',
    ...
  });
}
```

## Methods
```ts
signin(params: any): Promise<void>;
signup(params: any): Promise<void>;
reset(params: any): Promise<void>;
```

## Interfaces and Types
```ts
export interface AuthLocalPaths {
  root?: string;
  signin?: string;
  signup?: string;
  reset?: string;
}

export const DefaultAuthLocalPaths: AuthLocalPaths = {
  root: 'http://localhost:9000',
  signin: '/auth/local',
  signup: '/auth/local/signup',
  reset: '/auth/local/reset'
}

```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

## License

MIT © [Yu Chen](mailto:yu.chen@live.ie)

