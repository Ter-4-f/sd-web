import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMakerComponent } from './image-maker.component';

describe('ImageMakerComponent', () => {
  let component: ImageMakerComponent;
  let fixture: ComponentFixture<ImageMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageMakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
