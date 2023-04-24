import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BntuInfoComponent } from './bntu-info.component';

describe('BntuInfoComponent', () => {
  let component: BntuInfoComponent;
  let fixture: ComponentFixture<BntuInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BntuInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BntuInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
