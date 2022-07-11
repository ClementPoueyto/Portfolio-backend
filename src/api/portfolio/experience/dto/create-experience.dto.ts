import { ApiProperty } from "@nestjs/swagger";
import { LinkDto } from "../../shared/dto/link.dto";
import { ExperienceType } from "../experience.enum";

export class CreateExperienceDto{


  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public place: string;

  @ApiProperty({enum: ExperienceType})
  public experienceType: ExperienceType;

  @ApiProperty()
  public link : LinkDto


  @ApiProperty()
  public startDate: Date;

  @ApiProperty()
  public endDate: Date;

}
  