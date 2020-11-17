import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((_of) => LessonType)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query((_returns) => LessonType)
  lesson() {
    return {
      id: 'abcdef',
      name: 'Computer Science',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }

  @Mutation((_returns) => LessonType)
  createLesson(
    @Args('name') name: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(name, startDate, endDate);
  }
}
