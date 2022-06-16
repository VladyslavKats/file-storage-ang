import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocumentRemoveComponent } from './dialog-document-remove.component';

describe('DialogDocumentRemoveComponent', () => {
  let component: DialogDocumentRemoveComponent;
  let fixture: ComponentFixture<DialogDocumentRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDocumentRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
