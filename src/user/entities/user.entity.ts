import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum Department {
  CSE = 'Computer Science and Engineering',
}

export enum Faculty {
  FOE = 'Faculty of Engineering',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  staff_id: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  scopus_id: string;
  @Column()
  google_scholar_id: string;
  @Column()
  clarivate_id: string;
  @Column({ default: true })
  active: true;
  @Column({ type: 'enum', enum: Department })
  department: Department;
}
