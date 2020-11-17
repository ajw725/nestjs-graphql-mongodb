import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(lessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = lessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name: name,
      startDate: startDate,
      endDate: endDate,
    });
    return this.lessonRepository.save(lesson);
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  async getLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }
}
