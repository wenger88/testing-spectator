import {Course} from '../model/course';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import { COURSES } from '../../../../../server/db-data';


export function setupCourses() : Course[] {
  return Object.values(COURSES).sort(sortCoursesBySeqNo) as Course[];
}


