import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodiumComponentComponent } from './podium-component.component';

describe('PodiumComponentComponent', () => {
  let component: PodiumComponentComponent;
  let fixture: ComponentFixture<PodiumComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodiumComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodiumComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
