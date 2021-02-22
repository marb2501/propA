import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Avisosmap4Page } from './avisosmap4.page';

describe('Avisosmap4Page', () => {
  let component: Avisosmap4Page;
  let fixture: ComponentFixture<Avisosmap4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Avisosmap4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Avisosmap4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
