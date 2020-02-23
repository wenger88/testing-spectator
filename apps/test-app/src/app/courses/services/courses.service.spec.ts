import { createHTTPFactory, SpectatorHTTP } from '@netbasal/spectator';
import { CoursesService } from './courses.service';
import { COURSES, findLessonsForCourse } from '../../../../../server/db-data';
import { Course } from '../model/course';
import { HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';

export const courseAPI = {
  get: '/api/courses',
  put: (courseId: number) => `/api/courses/${courseId}`,
  getLessons: '/api/lessons',
};

const expectedDescription = 'A new title';
const saveData: Partial<Course> = {
  titles: {
    description: expectedDescription,
  },
};

describe('CoursesService', () => {
  let spectator: SpectatorHTTP<CoursesService>;
  const test = createHTTPFactory(CoursesService);
  const courseId = 12;

  beforeEach(() => {
    spectator = test();
  });

  it('should retrieve all courses', async(() => {
    spectator.dataService.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy();
      expect(courses.length).toBe(12);
      const course = courses.find(c => c.id === courseId);
      expect(course.titles.description).toBe('Angular Testing Course');
    });
    const req = spectator.controller.expectOne(courseAPI.get);
    expect(req.request.method).toEqual('GET');
    req.flush({ payload: Object.values(COURSES) });
  }));

  it('should find a course by id', async(() => {
    spectator.dataService.findCourseById(courseId).subscribe(course => {
      expect(course).toBeTruthy();
      expect(course.id).toBe(courseId);
    });
    const req = spectator.controller.expectOne(courseAPI.put(courseId));
    expect(req.request.method).toEqual('GET');
    req.flush(COURSES[courseId]);
  }));

  it('should save the course data', async(() => {
    spectator.dataService.saveCourse(courseId, saveData).subscribe(course => {
      expect(course).toBeTruthy();
      expect(course.id).toEqual(courseId);
    });

    const req = spectator.controller.expectOne(courseAPI.put(courseId));
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.titles.description).toEqual(expectedDescription);
    req.flush({
      ...COURSES[12],
      ...saveData,
    });
  }));

  it('should give an error if course save fails', async(() => {
    spectator.dataService.saveCourse(courseId, saveData).subscribe(
      () => {
        fail('course should have failed');
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    );
    const req = spectator.controller.expectOne(courseAPI.put(courseId));
    expect(req.request.method).toEqual('PUT');
    req.flush('Save course failed', {
      status: 500,
      statusText: 'Internal server error',
    });
  }));

  it('should find lessons', async(() => {
    spectator.dataService.findLessons(courseId).subscribe(lessons => {
      expect(lessons).toBeTruthy();
      expect(lessons.length).toBe(3);
    });
    const req = spectator.controller.expectOne(r => r.url === courseAPI.getLessons);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('courseId')).toEqual(courseId.toString());
    expect(req.request.params.get('sortOrder')).toEqual('asc');
    expect(req.request.params.get('pageNumber')).toEqual('0');
    expect(req.request.params.get('pageSize')).toEqual('3');
    req.flush({
      payload: findLessonsForCourse(courseId).slice(0, 3),
    });
  }));

  afterEach(() => {
    spectator.controller.verify();
  });
});
