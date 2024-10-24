import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTemperaturaComponent } from './grafico-temperatura.component';

describe('GraficoTemperaturaComponent', () => {
  let component: GraficoTemperaturaComponent;
  let fixture: ComponentFixture<GraficoTemperaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoTemperaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoTemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
