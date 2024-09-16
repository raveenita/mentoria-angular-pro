import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

const mockTitle = 'E-commerce';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.title = mockTitle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the title ecommerce', () => {
    const header: HTMLHeadingElement = fixture.nativeElement.querySelector('header');
    console.log(header.textContent)
    expect(header.textContent).toBe(mockTitle);

    component.title = 'New Title';
    fixture.detectChanges();
    expect(header.textContent).toBe(component.title);
  });
});
