import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Riesgoagroclim5Page } from './riesgoagroclim5.page';

describe('Riesgoagroclim5Page', () => {
  let component: Riesgoagroclim5Page;
  let fixture: ComponentFixture<Riesgoagroclim5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Riesgoagroclim5Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Riesgoagroclim5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
