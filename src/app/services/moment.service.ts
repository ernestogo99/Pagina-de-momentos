import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { moment } from '../moment';
import { environment } from '../../environments/environment.development';
import { response } from '../response';
@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseapiurl = environment.baseapiurl;
  private apiurl = `${this.baseapiurl}api/moments`;
  constructor(private http: HttpClient) {}

  getmoments(): Observable<response<moment[]>> {
    return this.http.get<response<moment[]>>(this.apiurl);
  }

  getmoment(id: number): Observable<response<moment>> {
    const url = `${this.apiurl}/${id}`;

    return this.http.get<response<moment>>(url);
  }

  createmoment(formdata: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiurl, formdata);
  }

  removemoment(id: number) {
    const url = `${this.apiurl}/${id}`;

    return this.http.delete(url);
  }

  updatemoment(id: number, formdata: FormData): Observable<FormData> {
    const url = `${this.apiurl}/${id}`;
    return this.http.put<FormData>(url, formdata);
  }
}
