import { ApiProperty } from "@nestjs/swagger";
import { Project } from "../entity/project.entity";
import { LinkDto } from "../../shared/dto/link.dto";
import { ProjectType } from "../project.enum";

export class ProjectDto {

    constructor(partial: Partial<Project>) {
        Object.assign(this, partial);
      }

    @ApiProperty()
    public id: number;

    @ApiProperty()
    public title: string;
  
    @ApiProperty()
    public description: string;
  
    @ApiProperty({enum: ProjectType})
    public projectType: ProjectType;
  
    @ApiProperty()
    public links : LinkDto[]
  
    @ApiProperty()
    public startDate: Date;
  
    @ApiProperty()
    public endDate: Date;
   
    @ApiProperty()
    public imageId?: number;
  
    /*
     * Create and Update Date Columns
     */
  
    @ApiProperty()
    public createdAt: Date;
}
  