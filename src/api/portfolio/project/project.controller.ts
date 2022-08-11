import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Req, Res, StreamableFile, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Readable } from 'stream';
import { Response } from 'express';
import { JwtAuthGuard } from "src/api/user/auth/guards/jwt-auth.guards";
import { ProjectService } from "./project.service";
import { ProjectDto } from "./dto/project.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ProjectType } from "./project.enum";

@ApiTags('project')
@Controller()
export class ProjectController {
  @Inject(ProjectService)
  private readonly projectService: ProjectService;

  @Get('projects')
  @ApiQuery({ name: 'type', enum: ProjectType, required:false})
  @ApiOkResponse({description: 'Return project informations', type : Array<ProjectDto>})
  async getProjects(@Query('type') type: ProjectType) {
    const project = await this.projectService.getProjectsByType(type)
    return project.map((s)=> new ProjectDto(s));
  }

  @Get('projects/:id')
  @ApiOkResponse({description: 'Return project informations', type : ProjectDto})
  async getProject( @Param('id', ParseIntPipe) id: number) {
    const project = await this.projectService.getProject(id)
    return new ProjectDto(project);
  }

  @Post('projects')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'Add project informations', type : ProjectDto})
  async addProject(@Body() body: CreateProjectDto) : Promise<ProjectDto> {
    console.log(body)
    return new ProjectDto(await this.projectService.addProject(body));
  }

  @Put('projects/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'Update project informations', type : CreateProjectDto})
  async updateProject(@Param('id', ParseIntPipe) id: number,@Body() body: CreateProjectDto) : Promise<ProjectDto> {
    console.log(body)
    return new ProjectDto(await this.projectService.updateProject(id,body));
  }

  @Get('projects/:id/image')
  @ApiOkResponse({description: 'get image project'})
  async getImageProject(@Res() response: Response,@Param('id', ParseIntPipe) id: number)  {
    const stream = Readable.from(await this.projectService.getImageProject(id));
    stream.pipe(response);
  }

  @Post('projects/:id/image')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  @ApiOkResponse({description: 'Add image project'})
  @ApiUnauthorizedResponse({description: 'Invalid Authorization header'})
  async addImageProject(@Res() response: Response,@Param('id', ParseIntPipe) id: number,@UploadedFile('file') file: Express.Multer.File) {
    const stream = Readable.from(await this.projectService.addImage(id, file.buffer, file.originalname));
    stream.pipe(response);
  }


}