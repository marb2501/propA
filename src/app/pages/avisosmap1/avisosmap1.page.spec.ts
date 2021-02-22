import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Avisosmap1Page } from './avisosmap1.page';

describe('Avisosmap1Page', () => {
  let component: Avisosmap1Page;
  let fixture: ComponentFixture<Avisosmap1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Avisosmap1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Avisosmap1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
