import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Avisosdetail4Page } from './avisosdetail4.page';

describe('Avisosdetail4Page', () => {
  let component: Avisosdetail4Page;
  let fixture: ComponentFixture<Avisosdetail4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Avisosdetail4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Avisosdetail4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
