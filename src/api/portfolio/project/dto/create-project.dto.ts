import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { LinkDto } from "../../shared/dto/link.dto";
import { SkillDto } from "../../skill/dto/skill.dto";
import { ProjectType } from "../project.enum";

export class CreateProjectDto {


    @ApiProperty()
    public title: string;
  
    @ApiProperty()
    public description: string;
  
    @IsEnum(ProjectType, { each: true })
    @ApiProperty({enum: ProjectType})
    public projectType: ProjectType;
  
    @ApiProperty()
    public github? : LinkDto
  
    @ApiProperty()
    public link? : LinkDto

    @ApiProperty()
    public startDate: Date;
  
    @ApiProperty()
    public endDate: Date;

    @ApiProperty()
    public tools : string[]
   
}