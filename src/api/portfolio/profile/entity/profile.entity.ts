import { DatabaseFile } from 'src/api/databaseFile/entity/databaseFile.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Link } from '../../shared/embedded/link.embedded';
import { Contact } from './embedded/contact.entity.embedded';

@Entity()
export class Profile extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 120})
  public lastname: string;

  @Column({ type: 'varchar', length: 120 })
  public firstname: string;

  @Column()
  public description: string;

  @Column()
  public birthDate: Date;

  @Column(()=> Contact)
  public contact : Contact

  @Column(()=> Link)
  public links : Link[]

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(
    () => DatabaseFile,
    {
      nullable: true
    }
  )
  public avatar?: DatabaseFile;
 
  @Column({ nullable: true })
  public avatarId?: number;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;




}