import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Avisosmap24hPage } from './avisosmap24h.page';

describe('Avisosmap24hPage', () => {
  let component: Avisosmap24hPage;
  let fixture: ComponentFixture<Avisosmap24hPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Avisosmap24hPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Avisosmap24hPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
