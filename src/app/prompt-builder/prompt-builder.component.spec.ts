import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptBuilderComponent } from './prompt-builder.component';

describe('PromptBuilderComponent', () => {
  let component: PromptBuilderComponent;
  let fixture: ComponentFixture<PromptBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
