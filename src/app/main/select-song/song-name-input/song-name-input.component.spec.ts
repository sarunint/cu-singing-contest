import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SongNameInputComponent } from './song-name-input.component';

describe('SongNameInputComponent', () => {
  let component: SongNameInputComponent;
  let fixture: ComponentFixture<SongNameInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SongNameInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongNameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
