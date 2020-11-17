import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver((_of) => LessonType)
export class LessonResolver {
  @Query((_returns) => LessonType)
  lesson() {
    return {
      id: 'abcdef',
      name: 'Computer Science',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }

  @Mutation((returns) => LessonType)
  createLesson() {
    // TODO
  }
}
