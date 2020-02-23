import { createTestComponentFactory, mockProvider, Spectator, SpectatorService } from '@netbasal/spectator';
import { HomeComponent } from './home.component';
import { CoursesModule } from '../courses.module';
import { CoursesService } from '../services/courses.service';
import { APP_BASE_HREF } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { async } from '@angular/core/testing';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { SpyObject } from '@netbasal/spectator/lib/mock';
import { DebugElement } from '@angular/core';
import { click } from '../common/test-utils';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  let coursesService: SpyObject<CoursesService>;
  const beginnerCourses = setupCourses().filter(c => c.category === 'BEGINNER');
  const advancedCourses = setupCourses().filter(c => c.category === 'ADVANCED');

  const createComponent = createTestComponentFactory({
    component: HomeComponent,
    imports: [CoursesModule, NoopAnimationsModule],
    providers: [
      {
        provide: APP_BASE_HREF,
        useValue: '/',
      },
    ],
    mocks: [CoursesService],
    declareComponent: false,
    detectChanges: false,
  });
  beforeEach(async(() => {
    spectator = createComponent();
    coursesService = spectator.get<CoursesService>(CoursesService);
  }));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display only beginner courses', () => {
    coursesService.findAllCourses.and.returnValues(of(beginnerCourses));
    spectator.detectChanges();
    const tabs = spectator.debugElement.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1);
  });

  it('should display only advanced courses', () => {
    coursesService.findAllCourses.and.returnValues(of(advancedCourses));
    spectator.detectChanges();
    const tabs = spectator.debugElement.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1);
  });

  it('should display both tabs', () => {
    coursesService.findAllCourses.and.returnValues(of(setupCourses()));
    spectator.detectChanges();
    const tabs = spectator.debugElement.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2);
  });

  it('should display advanced courses when tab clicked', async () => {
    coursesService.findAllCourses.and.returnValues(of(setupCourses()));
    spectator.detectChanges();
    const tabs = spectator.debugElement.queryAll(By.css('.mat-tab-label'));
    tabs[1].nativeElement.click();
    await spectator.detectChanges();
    const cardTitles = spectator.debugElement.queryAll(By.css('.mat-card-title'));
    expect(cardTitles.length).toBeGreaterThan(0);
    expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');
  });
});
