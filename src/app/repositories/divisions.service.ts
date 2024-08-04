import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Division } from '../interfaces/Division';

@Injectable({
  providedIn: 'root'
})
export class DivisionsService {
  private readonly apiUrl = `${environment.apiUrl}/divisions`;
  private http = inject(HttpClient);

  getAll(): Observable<Array<Division>> {
    return this.http.get<Array<Division>>(this.apiUrl);
  }
}
