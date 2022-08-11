import { DatabaseFile } from 'src/api/databaseFile/entity/databaseFile.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, JoinColumn, OneToOne, ManyToMany } from 'typeorm';
import { Project } from '../../project/entity/project.entity';
import { SkillType } from '../skill.enum';

@Entity()
export class Skill extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public skillType: SkillType;

  @Column({default: true})
  public display : boolean;


  @JoinColumn({ name: 'logoId' })
  @OneToOne(
    () => DatabaseFile,
    {
      nullable: true
    }
  )
  public logo?: DatabaseFile;
 
  @Column({ nullable: true })
  public logoId?: number;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;


  @ManyToMany(() => Project, project => project.tools, { eager: false })
  projects: Project[];




}