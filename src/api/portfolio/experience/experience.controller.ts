import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Req, Res, StreamableFile, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Readable } from 'stream';
import { Response } from 'express';
import { JwtAuthGuard } from "src/api/user/auth/guards/jwt-auth.guards";
import { ExperienceDto } from "./dto/experience.dto";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { ExperienceService } from "./experience.service";
import { ExperienceType } from "./experience.enum";

@ApiTags('experience')
@Controller('api/portfolio')
export class ExperienceController {
  @Inject(ExperienceService)
  private readonly experienceService: ExperienceService;

  @Get('experiences')
  @ApiQuery({ name: 'type', enum: ExperienceType, required:false})
  @ApiOkResponse({description: 'Return experience informations', type : Array<ExperienceDto>})
  async getExperiences(@Query('type') type: ExperienceType) {
    const experience = await this.experienceService.getExperiencesByType(type);
    return experience.map((s)=> new ExperienceDto(s));
  }

  @Get('experiences/:id')
  @ApiOkResponse({description: 'Return experience informations', type : ExperienceDto})
  async getExperience( @Param('id', ParseIntPipe) id: number) {
    const experience = await this.experienceService.getExperience(id)
    return new ExperienceDto(experience);
  }

  @Post('experiences')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'Add experience informations', type : ExperienceDto})
  async addExperience(@Body() body: CreateExperienceDto) : Promise<ExperienceDto> {
    console.log(body)
    return new ExperienceDto(await this.experienceService.addExperience(body));
  }

  @Put('experiences/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'Update experience informations', type : ExperienceDto})
  async updateExperience(@Param('id', ParseIntPipe) id: number,@Body() body: CreateExperienceDto) : Promise<ExperienceDto> {
    console.log(body)
    return new ExperienceDto(await this.experienceService.updateExperience(id,body));
  }

  @Get('experiences/:id/image')
  @ApiOkResponse({description: 'get image experience'})
  async getImageExperience(@Res() response: Response,@Param('id', ParseIntPipe) id: number)  {
    const stream = Readable.from(await this.experienceService.getImageExperience(id));
    stream.pipe(response);
  }

  @Post('experiences/:id/image')
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
  @ApiOkResponse({description: 'Add image experience'})
  @ApiUnauthorizedResponse({description: 'Invalid Authorization header'})
  async addImageExperience(@Res() response: Response,@Param('id', ParseIntPipe) id: number,@UploadedFile('file') file: Express.Multer.File) {
    const stream = Readable.from(await this.experienceService.addImage(id, file.buffer, file.originalname));
    stream.pipe(response);
  }


}