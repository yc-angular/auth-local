import { async, fakeAsync, tick, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthModule } from '@yca/auth';

import { AuthLocalModule, AuthLocal, DefaultAuthLocalPaths } from '../src/';

describe('Test default config', () => {
  let al: AuthLocal;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AuthModule.forRoot(),
        AuthLocalModule.forRoot()
      ]
    });
  }));

  beforeEach(inject([AuthLocal], _al => {
    al = _al;
  }));

  it('Should be defined', () => {
    expect(al).toBeDefined();
  });

  it('Should be default', () => {
    expect(al.paths).toMatchObject(DefaultAuthLocalPaths);
  })
});

describe('Test custom config', () => {
  let al: AuthLocal;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AuthModule.forRoot(),
        AuthLocalModule.forRoot({
          root: 'http://xxx.xxx',
          signin: '1',
          signup: '2',
          reset: '3'
        })
      ]
    });
  });

  beforeEach(inject([AuthLocal], _al => {
    al = _al;
  }));

  it('Should be defined', () => {
    expect(al).toBeDefined();
  });

  it('Should be custom', () => {
    expect(al.paths.root).toBe('http://xxx.xxx');
    expect(al.paths.signin).toBe('1');
    expect(al.paths.signup).toBe('2');
    expect(al.paths.reset).toBe('3');
  })
});

describe('Test methods', () => {
  let al: AuthLocal;
  let mb: MockBackend;
  let res;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        AuthModule.forRoot(),
        AuthLocalModule.forRoot()
      ]
    });
  }));

  beforeEach(inject([AuthLocal, MockBackend], (_al, _mb) => {
    al = _al;
    mb = _mb;
    al['auth'].signJwt = x => Promise.resolve(res = x);
  }));

  it('Should be defined', () => {
    expect(al).toBeDefined();
    expect(al.signin).toBeDefined();
    expect(al.signup).toBeDefined();
    expect(al.reset).toBeDefined();
  });

  it('Should signin', fakeAsync(() => {
    const sub = mb.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({
        body: {
          token: 'signin'
        }
      })));
    });
    al.signin({});
    tick();
    sub.unsubscribe();
    expect(res).toBe('signin');
  }));

  it('Should signup', fakeAsync(() => {
    const sub = mb.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({
        body: {
          token: 'signup'
        }
      })));
    });
    al.signup({});
    tick();
    sub.unsubscribe();
    expect(res).toBe('signup');
  }));

  it('Should reset', fakeAsync(() => {
    const sub = mb.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions()));
    });
    al.reset({})
      .then(x => res = true);
    tick();
    sub.unsubscribe();
    expect(res).toBe(true);
  }));

  it('Should throw an http error', fakeAsync(() => {
    class MockError extends Response implements Error {
      name: any
      message: any
    }
    const mbSub = mb.connections.subscribe((conn: MockConnection) => {
      conn.mockError(new MockError(new ResponseOptions({
        body: 'Not Found',
        type: ResponseType.Error,
        status: 404
      })));
    });

    let error;
    al.signin({})
      .then(x => { }, e => {
        error = e;
      });

    tick();
    mbSub.unsubscribe();
    expect(error.status).toBe(404);
  }));
});
