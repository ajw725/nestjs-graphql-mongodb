import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './create-lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import { AssignStudentsInput } from './assign-students.input';
import { StudentService } from '../student/student.service';
import { Student } from 'src/student/student.entity';
import { StudentType } from 'src/student/student.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService,
  ) {}

  @Query(() => LessonType)
  lesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLesson(id);
  }

  @Query(() => [LessonType])
  allLessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons();
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('lesson') lessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(lessonInput);
  }

  @Mutation(() => LessonType)
  assignStudents(
    @Args('assignStudents') assignInput: AssignStudentsInput,
  ): Promise<Lesson> {
    return this.lessonService.assignStudents(assignInput);
  }

  @ResolveField(() => [StudentType])
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    const studentIds = lesson.studentIds;
    return await this.studentService.findStudents(studentIds);
  }
}
