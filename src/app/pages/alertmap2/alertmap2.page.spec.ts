import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Alertmap2Page } from './alertmap2.page';

describe('Alertmap2Page', () => {
  let component: Alertmap2Page;
  let fixture: ComponentFixture<Alertmap2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Alertmap2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Alertmap2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
