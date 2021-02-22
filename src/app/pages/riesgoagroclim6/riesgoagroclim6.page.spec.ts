import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Riesgoagroclim6Page } from './riesgoagroclim6.page';

describe('Riesgoagroclim6Page', () => {
  let component: Riesgoagroclim6Page;
  let fixture: ComponentFixture<Riesgoagroclim6Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Riesgoagroclim6Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Riesgoagroclim6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
