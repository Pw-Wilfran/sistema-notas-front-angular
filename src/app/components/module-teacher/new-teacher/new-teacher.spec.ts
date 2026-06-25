import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTeacher } from './new-teacher';

describe('NewTeacher', () => {
  let component: NewTeacher;
  let fixture: ComponentFixture<NewTeacher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTeacher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTeacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
