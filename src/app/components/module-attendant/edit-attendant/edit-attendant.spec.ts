import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttendant } from './edit-attendant';

describe('EditAttendant', () => {
  let component: EditAttendant;
  let fixture: ComponentFixture<EditAttendant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAttendant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAttendant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
