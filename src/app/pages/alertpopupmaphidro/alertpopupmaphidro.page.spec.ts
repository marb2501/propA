import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertpopupmaphidroPage } from './alertpopupmaphidro.page';

describe('AlertpopupmaphidroPage', () => {
  let component: AlertpopupmaphidroPage;
  let fixture: ComponentFixture<AlertpopupmaphidroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertpopupmaphidroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertpopupmaphidroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
