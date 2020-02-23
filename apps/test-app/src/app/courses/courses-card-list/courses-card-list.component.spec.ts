import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { createTestComponentFactory, Spectator } from '@netbasal/spectator';
import { APP_BASE_HREF } from '@angular/common';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CoursesCardListComponent', () => {
  let spectator: Spectator<CoursesCardListComponent>;
  const createComponent = createTestComponentFactory({
    component: CoursesCardListComponent,
    imports: [CoursesModule],
    declareComponent: false,
    providers: [
      {
        provide: APP_BASE_HREF,
        useValue: '/',
      },
    ],
  });
  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display the course list', () => {
    spectator.component.courses = setupCourses();
    spectator.detectChanges();
    const cards = spectator.debugElement.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy();
    expect(cards.length).toBe(12);
  });

  it('should display the first course', () => {
    spectator.component.courses = setupCourses();
    spectator.detectChanges();
    const course = spectator.component.courses[0];
    const card: DebugElement = spectator.debugElement.query(By.css('.course-card:first-child'));
    expect(card).toBeTruthy();
    const title: HTMLElement = card.query(By.css('.mat-card-title')).nativeElement;
    expect(title.textContent).toBe(course.titles.description);
    const image: HTMLImageElement = card.query(By.css('img')).nativeElement;
    expect(image.src).toBe(course.iconUrl);
  });
});
