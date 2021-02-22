import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Avisosinfo1Page } from './avisosinfo1.page';

describe('Avisosinfo1Page', () => {
  let component: Avisosinfo1Page;
  let fixture: ComponentFixture<Avisosinfo1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Avisosinfo1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Avisosinfo1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
