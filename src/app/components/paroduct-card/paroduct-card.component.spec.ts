import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParoductCardComponent } from './paroduct-card.component';

describe('ParoductCardComponent', () => {
  let component: ParoductCardComponent;
  let fixture: ComponentFixture<ParoductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParoductCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParoductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
