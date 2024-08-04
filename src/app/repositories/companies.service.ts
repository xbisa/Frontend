import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/Company';
import { PagedResponse } from '../interfaces/paged-results';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private readonly apiUrl = `${environment.apiUrl}/companies`;
  private http = inject(HttpClient);

  getAll({ pageSize, skip = 0 }: { pageSize: number, skip?: number }): Observable<PagedResponse<Company>> {
    return this.http.get<PagedResponse<Company>>(`${this.apiUrl}/${pageSize}/${skip}`);
  }

  add({
        name,
        divisionId,
        numberOfProperties,
        numberOfNotListedUnits,
        numberOfAvailableUnits,
        numberOfInProgressUnits,
        numberOfActiveUnits,
        createdBy
      }: {
    name: string,
    divisionId: number,
    numberOfProperties: number,
    numberOfNotListedUnits: number,
    numberOfAvailableUnits: number,
    numberOfInProgressUnits: number,
    numberOfActiveUnits: number,
    createdBy: string,
  }): Observable<Company> {

    return this.http.post<Company>(this.apiUrl, {
      name,
      divisionId,
      numberOfProperties,
      numberOfNotListedUnits,
      numberOfAvailableUnits,
      numberOfInProgressUnits,
      numberOfActiveUnits,
      createdBy
    });
  }

  update({
           id,
           name,
           divisionId,
           numberOfProperties,
           numberOfNotListedUnits,
           numberOfAvailableUnits,
           numberOfInProgressUnits,
           numberOfActiveUnits,
           updatedBy,
         }: {
    id: number,
    name: string,
    divisionId: number,
    numberOfProperties: number,
    numberOfNotListedUnits: number,
    numberOfAvailableUnits: number,
    numberOfInProgressUnits: number,
    numberOfActiveUnits: number,
    updatedBy: string,
  }): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}/${id}`, {
      id,
      name,
      divisionId,
      numberOfProperties,
      numberOfNotListedUnits,
      numberOfAvailableUnits,
      numberOfInProgressUnits,
      numberOfActiveUnits,
      updatedBy,
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
