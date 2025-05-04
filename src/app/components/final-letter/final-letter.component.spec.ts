import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalLetterComponent } from './final-letter.component';

describe('FinalLetterComponent', () => {
  let component: FinalLetterComponent;
  let fixture: ComponentFixture<FinalLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
