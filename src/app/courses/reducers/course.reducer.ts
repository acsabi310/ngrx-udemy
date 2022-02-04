import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { CourseActions } from '../action-types';
import { compareCourses, Course } from '../model/course';

// entity format - egy MAP kulcs -> adat, és kulcs -> sorrend[]

// export interface CoursesState {
//   entities: { [key: number]: Course };
//   ids: number[];
// }

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  selectId: (course) => course.id, // "id" a default id, de így kell megadni ha valami más
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,

  on(CourseActions.allCoursesLoaded, (state, action) => {
    return adapter.addAll(action.courses, { ...state, allCoursesLoaded: true });
  }),

  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const { selectAll } = adapter.getSelectors();
