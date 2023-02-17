import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentFileListComponent } from './recent-file-list.component';

describe('RecentFileListComponent', () => {
  let component: RecentFileListComponent;
  let fixture: ComponentFixture<RecentFileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentFileListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
