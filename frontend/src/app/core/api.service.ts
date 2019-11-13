import {
  HttpClient,
  HttpParameterCodec,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, RegisterForm } from '../auth/auth.interface';
import { UserSimple } from './user.interface';
import {
  Balance,
  BalanceSummary,
} from '../budget/budget.interface';
import { Category, CategoryBalance } from '../categories/categories.interface';

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


@Injectable(
  {
    providedIn: 'root'
  }
)
export class ApiService {
  URL_PATH = '/api';
  auth = {
    register: (registerData: RegisterForm) =>
      this.post('/rest-auth/register/', registerData),

    login: (loginData: LoginForm) => this.post('/rest-auth/login/', loginData),

    logout: () => this.post('/rest-auth/logout/'),

  };
  user = {
    me: () => this.get<UserSimple>('/rest-auth/user/'),
  };

  category = {
    list: (isIncome: boolean) =>
      this.get<Category[]>(`/category/`, { isIncome: isIncome }),

    listWithBalance: (isIncome: boolean) =>
      this.get<CategoryBalance[]>(
        `/category/list_with_balance/`,
        { isIncome: isIncome }
      ),

    create: (name: string, isIncome: boolean) =>
      this.post<CategoryBalance>(
        `/category/`,
        {
          name: name, isIncome: isIncome
        }),

    update: (id: number, name: string) =>
      this.patch<Category>(`/category/${id}/`, { name: name }),

    remove: (id: number) => this.delete(`/category/${id}/`),
  };

  balance = {
    create: (balance: Balance) => this.post<Balance>(`/balance/`, balance),
    summary: () => this.get<BalanceSummary>(`/balance/balance_summary/`),
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
