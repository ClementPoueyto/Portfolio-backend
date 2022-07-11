import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { SkillType } from "../skill.enum";

export class CreateSkillDto{

  
    @ApiProperty()
    public name: string;
  
    @ApiProperty()
    public description: string;

    @IsEnum(SkillType, { each: true })
    @ApiProperty({enum: SkillType})
    public skillType: SkillType;
  
}