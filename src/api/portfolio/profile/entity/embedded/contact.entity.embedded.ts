import { Column } from "typeorm";

export class Contact{

  @Column({ type: 'varchar', length: 120})
  public email: string;

  @Column({ type: 'varchar', length: 120 })
  public phoneNumber: string;


}