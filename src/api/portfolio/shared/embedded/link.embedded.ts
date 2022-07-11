import { Column } from "typeorm";

export class Link{

  @Column({ type: 'varchar', length: 120})
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public url: string;


}