import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisometinfomainPage } from './avisometinfomain.page';

describe('AvisometinfomainPage', () => {
  let component: AvisometinfomainPage;
  let fixture: ComponentFixture<AvisometinfomainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisometinfomainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisometinfomainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
