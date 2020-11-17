import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './create-lesson.input';
import { AssignStudentsInput } from './assign-students.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(lessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, studentIds } = lessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      studentIds,
    });
    return this.lessonRepository.save(lesson);
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  async getLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async assignStudents(assignInput: AssignStudentsInput): Promise<Lesson> {
    const { lessonId, studentIds } = assignInput;
    const lesson = await this.getLesson(lessonId);
    lesson.studentIds = [...(lesson.studentIds || []), ...studentIds];
    return await this.lessonRepository.save(lesson);
  }
}
