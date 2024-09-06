import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoyceComponent } from './joyce.component';

describe('JoyceComponent', () => {
  let component: JoyceComponent;
  let fixture: ComponentFixture<JoyceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoyceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoyceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
