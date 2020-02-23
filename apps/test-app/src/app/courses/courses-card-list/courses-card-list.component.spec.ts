import { TestBed } from '@angular/core/testing';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { createTestComponentFactory, Spectator } from '@netbasal/spectator';

describe('CoursesCardListComponent', () => {
  let spectator: Spectator<CoursesCardListComponent>;
  const createComponent = createTestComponentFactory({
    component: CoursesCardListComponent
  });
  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  xit('should display the course list', () => {
    pending();
  });

  xit('should display the first course', () => {
    pending();
  });
});
