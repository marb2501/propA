import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Avisosinfo4Page } from './avisosinfo4.page';

describe('Avisosinfo4Page', () => {
  let component: Avisosinfo4Page;
  let fixture: ComponentFixture<Avisosinfo4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Avisosinfo4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Avisosinfo4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
