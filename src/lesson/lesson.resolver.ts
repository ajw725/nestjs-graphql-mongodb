import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './create-lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import { AssignStudentsInput } from './assign-students.input';

@Resolver((_of) => LessonType)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query((_returns) => LessonType)
  lesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLesson(id);
  }

  @Query((_returns) => [LessonType])
  allLessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons();
  }

  @Mutation((_returns) => LessonType)
  createLesson(
    @Args('lesson') lessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(lessonInput);
  }

  @Mutation((_returns) => LessonType)
  assignStudents(
    @Args('assignStudents') assignInput: AssignStudentsInput,
  ): Promise<Lesson> {
    return this.lessonService.assignStudents(assignInput);
  }
}
