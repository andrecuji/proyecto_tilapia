import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoAmmoniacoComponent } from './grafico-ammoniaco.component';

describe('GraficoAmmoniacoComponent', () => {
  let component: GraficoAmmoniacoComponent;
  let fixture: ComponentFixture<GraficoAmmoniacoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoAmmoniacoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoAmmoniacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
