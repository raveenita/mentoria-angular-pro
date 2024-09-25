import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  readonly API_URL = 'https://65009f9718c34dee0cd53786.mockapi.io';

  constructor(private httpClient: HttpClient) {}

  searchByName(name: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.API_URL}/products`, {
      params: {
        name
      }
    });     
  }
}
