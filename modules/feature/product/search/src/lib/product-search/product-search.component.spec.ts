import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ProductSearchComponent } from './product-search.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockProducts, ProductSearchService } from '@ecommerce/product-data-access';
import { of } from 'rxjs';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;
  let productSearchService: ProductSearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSearchComponent, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [
        {
          provide: ProductSearchService,
          useValue: {
            searchByName: () => { return of(mockProducts); }
          }
        }
      ]

    }).compileComponents();

    productSearchService = TestBed.inject(ProductSearchService);

    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should debounce when input field is changed', fakeAsync(() => {
    jest.spyOn(productSearchService, 'searchByName');
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    input.value = 'tv';
    input.dispatchEvent(new Event('input'));

    expect(productSearchService.searchByName).toHaveBeenCalledTimes(1);
  }));

  it('should prevent identical submissions', fakeAsync(() => {
    jest.spyOn(productSearchService, 'searchByName');
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    input.value = 'tv';
    input.dispatchEvent(new Event('input'));

    expect(productSearchService.searchByName).toHaveBeenCalledTimes(1);

    tick(500);

    input.value = 'tv';
    input.dispatchEvent(new Event('input'));

    expect(productSearchService.searchByName).toHaveBeenCalledTimes(1);
  }));

  it('should prevent empty submissions', () => {
    jest.spyOn(productSearchService, 'searchByName');
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    input.value = 'a';
    input.dispatchEvent(new Event('input'));

    expect(productSearchService.searchByName).not.toHaveBeenCalled();
  });

  it('should return products observable correctly', () => {
    component.products$.subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });
  });


});
