import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { SkillType } from "../skill.enum";

export class CreateSkillDto{

  
    @ApiProperty()
    public name: string;
  
    @ApiProperty()
    public description: string;

    @ApiProperty()
    public display : boolean;

    @IsEnum(SkillType, { each: true })
    @ApiProperty({enum: SkillType})
    public skillType: SkillType;
  
}