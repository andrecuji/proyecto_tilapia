import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTotalComponent } from './datos-total.component';

describe('DatosTotalComponent', () => {
  let component: DatosTotalComponent;
  let fixture: ComponentFixture<DatosTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosTotalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
