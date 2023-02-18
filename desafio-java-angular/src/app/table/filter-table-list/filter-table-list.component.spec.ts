/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterTableListComponent } from './filter-table-list.component';

describe('FilterTableListComponent', () => {
  let component: FilterTableListComponent;
  let fixture: ComponentFixture<FilterTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterTableListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
