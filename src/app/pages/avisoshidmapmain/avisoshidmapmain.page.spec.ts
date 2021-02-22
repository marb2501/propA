import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisoshidmapmainPage } from './avisoshidmapmain.page';

describe('AvisoshidmapmainPage', () => {
  let component: AvisoshidmapmainPage;
  let fixture: ComponentFixture<AvisoshidmapmainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoshidmapmainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoshidmapmainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
