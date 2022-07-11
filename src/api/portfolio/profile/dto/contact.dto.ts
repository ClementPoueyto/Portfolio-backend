import { ApiProperty } from "@nestjs/swagger";
import { Contact } from "../entity/embedded/contact.entity.embedded";

export class ContactDto{

  constructor(partial: Partial<Contact>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public phoneNumber: string;


}