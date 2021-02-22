import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisohidinfomainPage } from './avisohidinfomain.page';

describe('AvisohidinfomainPage', () => {
  let component: AvisohidinfomainPage;
  let fixture: ComponentFixture<AvisohidinfomainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisohidinfomainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisohidinfomainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
