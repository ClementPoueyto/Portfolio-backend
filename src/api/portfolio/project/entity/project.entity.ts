import { DatabaseFile } from 'src/api/databaseFile/entity/databaseFile.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Link } from '../../shared/embedded/link.embedded';

@Entity()
export class Project extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public projectType: string;

  @Column(()=> Link)
  public links : Link[]

  @JoinColumn({ name: 'imageId' })
  @OneToOne(
    () => DatabaseFile,
    {
      nullable: true
    }
  )
  public image?: DatabaseFile;

  @Column({ nullable: true })
  public imageId?: number;

  @Column({ type: 'timestamp' })
  public startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  public endDate: Date;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;





}