import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocumentRenameComponent } from './dialog-document-rename.component';

describe('DialogDocumentRenameComponent', () => {
  let component: DialogDocumentRenameComponent;
  let fixture: ComponentFixture<DialogDocumentRenameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDocumentRenameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentRenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
