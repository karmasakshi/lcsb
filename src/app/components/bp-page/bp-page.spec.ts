import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpPage } from './bp-page';

describe('BpPage', () => {
  let component: BpPage;
  let fixture: ComponentFixture<BpPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BpPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
