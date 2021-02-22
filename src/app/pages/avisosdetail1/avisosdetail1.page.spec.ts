import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Avisosdetail1Page } from './avisosdetail1.page';

describe('Avisosdetail1Page', () => {
  let component: Avisosdetail1Page;
  let fixture: ComponentFixture<Avisosdetail1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Avisosdetail1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Avisosdetail1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
