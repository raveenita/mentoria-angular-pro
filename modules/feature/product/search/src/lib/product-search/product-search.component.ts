import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { mockProducts } from '@ecommerce/product-data-access';

@Component({
  selector: 'lib-product-search',
  standalone: true,
  imports: [CommonModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss',
})
export class ProductSearchComponent {
  public control = new FormControl('');
  products = mockProducts
}
