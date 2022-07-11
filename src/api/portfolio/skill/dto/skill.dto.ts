import { ApiProperty } from "@nestjs/swagger";
import { Skill } from "../entity/skill.entity";
import { SkillType } from "../skill.enum";

export class SkillDto {

    constructor(partial: Partial<Skill>) {
        Object.assign(this, partial);
    }

  @ApiProperty()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public description: string;

  @ApiProperty({enum: SkillType})
  public skillType: SkillType;
 
  @ApiProperty()
  public logoId?: number;

  @ApiProperty()
  public createdAt: Date;

}

