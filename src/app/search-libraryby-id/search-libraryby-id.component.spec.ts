import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLibrarybyIDComponent } from './search-libraryby-id.component';

describe('SearchLibrarybyIDComponent', () => {
  let component: SearchLibrarybyIDComponent;
  let fixture: ComponentFixture<SearchLibrarybyIDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLibrarybyIDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLibrarybyIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
