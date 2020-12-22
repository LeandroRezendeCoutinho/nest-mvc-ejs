import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ type: 'date', nullable: true })
  publication: Date;

  @Column({nullable: true})
  price: number;
}