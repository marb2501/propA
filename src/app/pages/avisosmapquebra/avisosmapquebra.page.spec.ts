import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisosmapquebraPage } from './avisosmapquebra.page';

describe('AvisosmapquebraPage', () => {
  let component: AvisosmapquebraPage;
  let fixture: ComponentFixture<AvisosmapquebraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisosmapquebraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisosmapquebraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
