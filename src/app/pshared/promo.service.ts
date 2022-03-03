import { Injectable } from '@angular/core';
import { Promo } from './promo';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PromoService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  addPromo(promo: Promo): Observable<any> {
    return this.http.post<Promo>('http://localhost:3000/api/create-pro', promo, this.httpOptions)
      .pipe(
        catchError(this.handleError<Promo>('Add Promotion'))
      );
  }

  getPromo(id): Observable<Promo[]> {
    return this.http.get<Promo[]>('http://localhost:3000/api/get-pro/' + id)
      .pipe(
        tap(_ => console.log(`Promo fetched: ${id}`)),
        catchError(this.handleError<Promo[]>(`Get promo id=${id}`))
      );
  }
  getPromoList(): Observable<Promo[]> {
    return this.http.get<Promo[]>('http://localhost:3000/api/promo')
      .pipe(
        tap(promo => console.log('promo fetched!')),
        catchError(this.handleError<Promo[]>('Get Promo', []))
      );
  }
  updatePromo(id, promo: Promo): Observable<any> {
    return this.http.put('http://localhost:3000/api/update-pro/' + id, promo, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Promotion updated: ${id}`)),
        catchError(this.handleError<Promo[]>('Update Promo'))
      );
  }
  deletePromo(id): Observable<Promo[]> {
    return this.http.delete<Promo[]>('http://localhost:3000/api/delete-pro/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Promo deleted: ${id}`)),
        catchError(this.handleError<Promo[]>('Delete Promotion'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
