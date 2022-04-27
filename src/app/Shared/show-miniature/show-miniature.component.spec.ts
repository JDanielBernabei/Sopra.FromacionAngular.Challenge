import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMiniatureComponent } from './show-miniature.component';

describe('ShowMiniatureComponent', () => {
  let component: ShowMiniatureComponent;
  let fixture: ComponentFixture<ShowMiniatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMiniatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMiniatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
