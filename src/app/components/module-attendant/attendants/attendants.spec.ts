import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Attendants } from './attendants';

describe('Attendants', () => {
  let component: Attendants;
  let fixture: ComponentFixture<Attendants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Attendants]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Attendants);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
