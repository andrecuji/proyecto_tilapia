import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoOxigenoComponent } from './grafico-oxigeno.component';

describe('GraficoOxigenoComponent', () => {
  let component: GraficoOxigenoComponent;
  let fixture: ComponentFixture<GraficoOxigenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoOxigenoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoOxigenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
