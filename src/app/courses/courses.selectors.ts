import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CoursesState } from './reducers/course.reducer';
import * as fromCourses from './reducers/course.reducer';

export const selectCoursesState =
  createFeatureSelector<CoursesState>("courses");

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((c) => c.category === "BEGINNER")
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((c) => c.category === "ADVANCED")
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses) => courses.filter((c) => c.promo).length
);

export const allCoursesLoaded = createSelector(
  selectCoursesState,
  (state) => state.allCoursesLoaded
);