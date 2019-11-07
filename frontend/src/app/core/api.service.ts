import {
  HttpClient,
  HttpParameterCodec,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, RegisterForm } from '../auth/auth.interface';
import { UserSimple } from './user.interface';

export class HttpQueryEncoderCodec implements HttpParameterCodec {
  encodeKey(k: string): string {
    return encodeURIComponent(k);
  }

  encodeValue(v: string): string {
    return encodeURIComponent(v);
  }

  decodeKey(k: string): string {
    return decodeURIComponent(k);
  }

  decodeValue(v: string): string {
    return decodeURIComponent(v);
  }
}

function mergeObjects(...objs) {
  let merged = {};
  for (const obj of objs) {
    merged = Object.assign(merged, obj);
  }
  return merged;
}

@Injectable()
export class ApiService {
  URL_PATH = '/api';
  auth = {
    register: (registerData: RegisterForm) =>
      this.post('/rest-auth/register/', registerData),

    login: (loginData: LoginForm) => this.post('/rest-auth/login/', loginData),

    logout: () => this.post('/rest-auth/logout/'),

  };
  users = {
    me: () => this.get<UserSimple>('/rest-auth/user/'),

  };

  constructor(public http: HttpClient) {
  }

  private buildParams(params: any = {}) {
    params = params || {};
    let searchParams = new HttpParams({
      encoder: new HttpQueryEncoderCodec(),
    });
    for (const [key, param] of Object.entries<any>(params)) {
      if (Array.isArray(param)) {
        for (const value of param) {
          searchParams = searchParams.append(key, value);
        }
      } else if (param !== undefined) {
        searchParams = searchParams.set(key, param);
      }
    }
    return searchParams;
  }

  private url(url: string, params: any = {}) {
    const searchParams = this.buildParams(params);
    return `${this.URL_PATH}${url}?${searchParams}`;
  }

  private get<T>(url: string, params: any = {}): Promise<T> {
    const searchParams = this.buildParams(params);

    return this.http
      .get<T>(`${this.URL_PATH}${url}`, {
        params: searchParams,
      })
      .toPromise();
  }

  private post<T>(url: string, body: any = null, params: any = {}) {
    const searchParams = this.buildParams(params);

    return this.http
      .post<T>(`${this.URL_PATH}${url}`, body, {
        params: searchParams,
      })
      .toPromise();
  }

  private put<T>(url: string, body: any) {
    return this.http.put<T>(`${this.URL_PATH}${url}`, body).toPromise();
  }

  private patch<T>(url: string, body: any) {
    return this.http.patch<T>(`${this.URL_PATH}${url}`, body).toPromise();
  }

  private delete<T>(url: string) {
    return this.http.delete<T>(`${this.URL_PATH}${url}`).toPromise();
  }
}
