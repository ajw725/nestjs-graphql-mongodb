import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((_of) => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation((_returns) => StudentType)
  createStudent(
    @Args('student') studentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(studentInput);
  }

  @Query((_returns) => [StudentType])
  getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Query((_returns) => StudentType)
  student(@Args('id') id: string): Promise<Student> {
    return this.studentService.findStudent(id);
  }
}
