import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAttendant } from './details-attendant';

describe('DetailsAttendant', () => {
  let component: DetailsAttendant;
  let fixture: ComponentFixture<DetailsAttendant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAttendant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAttendant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
