import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpChart } from './bp-chart';

describe('BpChart', () => {
  let component: BpChart;
  let fixture: ComponentFixture<BpChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BpChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
