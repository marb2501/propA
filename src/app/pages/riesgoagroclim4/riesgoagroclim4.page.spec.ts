import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Riesgoagroclim4Page } from './riesgoagroclim4.page';

describe('Riesgoagroclim4Page', () => {
  let component: Riesgoagroclim4Page;
  let fixture: ComponentFixture<Riesgoagroclim4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Riesgoagroclim4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Riesgoagroclim4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
