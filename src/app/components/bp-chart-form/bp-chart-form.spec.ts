import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpChartForm } from './bp-chart-form';

describe('BpChartForm', () => {
  let component: BpChartForm;
  let fixture: ComponentFixture<BpChartForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BpChartForm],
    }).compileComponents();

    fixture = TestBed.createComponent(BpChartForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
