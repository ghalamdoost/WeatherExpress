import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCitiesComponent } from './last-cities.component';

describe('LastCitiesComponent', () => {
  let component: LastCitiesComponent;
  let fixture: ComponentFixture<LastCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
