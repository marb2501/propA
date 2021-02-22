import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertmaphidroPage } from './alertmaphidro.page';

describe('AlertmaphidroPage', () => {
  let component: AlertmaphidroPage;
  let fixture: ComponentFixture<AlertmaphidroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertmaphidroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertmaphidroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
