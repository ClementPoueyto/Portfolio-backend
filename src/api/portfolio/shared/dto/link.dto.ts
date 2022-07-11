import { ApiProperty } from "@nestjs/swagger";
import { Link } from "../embedded/link.embedded";

export class LinkDto{

  constructor(partial: Partial<Link>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public url: string;


}