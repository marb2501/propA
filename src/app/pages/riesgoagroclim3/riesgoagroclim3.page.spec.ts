import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Riesgoagroclim3Page } from './riesgoagroclim3.page';

describe('Riesgoagroclim3Page', () => {
  let component: Riesgoagroclim3Page;
  let fixture: ComponentFixture<Riesgoagroclim3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Riesgoagroclim3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Riesgoagroclim3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
