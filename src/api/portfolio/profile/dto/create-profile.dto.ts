import { ApiProperty } from "@nestjs/swagger";
import { ContactDto } from "./contact.dto";
import { LinkDto } from "../../shared/dto/link.dto";

export class CreateProfileDto{


    @ApiProperty()
    public lastname: string;
  
    @ApiProperty()
    public firstname: string;
  
    @ApiProperty()
    public description: string;
  
    @ApiProperty({
      description: 'birth date profile'
    })
    public birthDate: Date;
  
    @ApiProperty()
    public contact : ContactDto
  
    @ApiProperty({
      isArray: true,
    type: LinkDto})
    public links : LinkDto[]
}