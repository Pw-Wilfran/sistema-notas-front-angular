import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTeacher } from './details-teacher';

describe('DetailsTeacher', () => {
  let component: DetailsTeacher;
  let fixture: ComponentFixture<DetailsTeacher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTeacher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTeacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
