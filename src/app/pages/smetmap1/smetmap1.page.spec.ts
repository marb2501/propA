import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Smetmap1Page } from './smetmap1.page';

describe('Smetmap1Page', () => {
  let component: Smetmap1Page;
  let fixture: ComponentFixture<Smetmap1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Smetmap1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Smetmap1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
