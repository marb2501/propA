import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Smetmap2Page } from './smetmap2.page';

describe('Smetmap2Page', () => {
  let component: Smetmap2Page;
  let fixture: ComponentFixture<Smetmap2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Smetmap2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Smetmap2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
