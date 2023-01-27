import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WindTrianglePage } from './windtriangle.page';

describe('WindTrianglePage', () => {
  let component: WindTrianglePage;
  let fixture: ComponentFixture<WindTrianglePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WindTrianglePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WindTrianglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
