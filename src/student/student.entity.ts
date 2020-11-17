import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'students' })
export class Student {
  @ObjectIdColumn({ select: false })
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
