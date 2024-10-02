import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule  } from '@angular/forms';
import { ProductSearchService, Product } from '@ecommerce/product-data-access';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'lib-product-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , MatAutocompleteModule, MatInputModule, MatFormFieldModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss',
})
export class ProductSearchComponent implements OnInit {
  public control = new FormControl('');
  public products$!: Observable<Product[]>;

  constructor(private productSearchService: ProductSearchService) {}

  ngOnInit(): void {
    this.products$ = this.control.valueChanges.pipe(
      debounceTime(500), // wait 500ms after the last event before emitting last event
      distinctUntilChanged(), // only emit when the current value is different than the last
      filter((text: any) => text.length > 1), // only emit when the current value is at least 2 characters long
      switchMap((text: any) => this.productSearchService.searchByName(text))  // replaces the previous observable with a new one
    );
  }
}
