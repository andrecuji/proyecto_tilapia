import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTotalComponent } from './grafico-total.component';

describe('GraficoTotalComponent', () => {
  let component: GraficoTotalComponent;
  let fixture: ComponentFixture<GraficoTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoTotalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
