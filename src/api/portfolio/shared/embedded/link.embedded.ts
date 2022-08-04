import { Column } from "typeorm";

export class Link{

  @Column({nullable:true, type: 'varchar', length: 120})
  public name: string;

  @Column({ nullable:true,type: 'varchar' })
  public url: string;


}