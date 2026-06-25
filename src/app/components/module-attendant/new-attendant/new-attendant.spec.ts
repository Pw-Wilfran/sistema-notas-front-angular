import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAttendant } from './new-attendant';

describe('NewAttendant', () => {
  let component: NewAttendant;
  let fixture: ComponentFixture<NewAttendant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAttendant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAttendant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
