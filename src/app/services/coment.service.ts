import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { comment } from '../coment';
import { response } from '../response';

@Injectable({
  providedIn: 'root',
})
export class ComentService {
  private baseapiurl = environment.baseapiurl;
  private apiurl = `${this.baseapiurl}api/moments`;
  constructor(private http: HttpClient) {}

  createcoment(data: comment): Observable<response<comment>> {
    const url = `${this.apiurl}/${data.momentId}/comments`;

    return this.http.post<response<comment>>(url, data);
  }
}
