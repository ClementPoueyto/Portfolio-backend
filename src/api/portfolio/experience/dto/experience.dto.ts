import { ApiProperty } from "@nestjs/swagger";
import { LinkDto } from "../../shared/dto/link.dto";
import { Experience } from "../entity/experience.entity";
import { ExperienceType } from "../experience.enum";

export class ExperienceDto{

    constructor(partial: Partial<Experience>) {
        Object.assign(this, partial);
      }

  @ApiProperty()
  public id: number;

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
  public imageId?: number;

  @ApiProperty()
  public startDate: Date;

  @ApiProperty()
  public endDate: Date;
  /*
   * Create and Update Date Columns
   */
  @ApiProperty()
  public createdAt: Date;
}
  