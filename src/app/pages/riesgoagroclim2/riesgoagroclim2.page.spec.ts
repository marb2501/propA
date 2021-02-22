import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Riesgoagroclim2Page } from './riesgoagroclim2.page';

describe('Riesgoagroclim2Page', () => {
  let component: Riesgoagroclim2Page;
  let fixture: ComponentFixture<Riesgoagroclim2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Riesgoagroclim2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Riesgoagroclim2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
