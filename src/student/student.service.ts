import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createStudent(studentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = studentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return await this.studentRepository.save(student);
  }
}
