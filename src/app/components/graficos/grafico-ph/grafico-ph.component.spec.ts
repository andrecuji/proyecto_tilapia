import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPhComponent } from './grafico-ph.component';

describe('GraficoPhComponent', () => {
  let component: GraficoPhComponent;
  let fixture: ComponentFixture<GraficoPhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoPhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoPhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
