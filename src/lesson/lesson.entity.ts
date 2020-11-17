import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Lesson {
  @ObjectIdColumn({ select: false })
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  studentIds: string[];
}
