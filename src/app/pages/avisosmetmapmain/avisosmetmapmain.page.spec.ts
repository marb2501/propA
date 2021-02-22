import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisosmetmapmainPage } from './avisosmetmapmain.page';

describe('AvisosmetmapmainPage', () => {
  let component: AvisosmetmapmainPage;
  let fixture: ComponentFixture<AvisosmetmapmainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisosmetmapmainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisosmetmapmainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
