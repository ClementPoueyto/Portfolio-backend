import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Req, Res, StreamableFile, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../user/auth/guards/jwt-auth.guards";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { SkillDto } from "./dto/skill.dto";
import { SkillService } from "./skill.service";
import { Readable } from 'stream';
import { Response } from 'express';
import { SkillType } from "./skill.enum";

@ApiTags('skill')
@Controller()
export class SkillController {
  @Inject(SkillService)
  private readonly skillService: SkillService;

  @Get('skills')
  @ApiQuery({ name: 'display',type : Boolean, required:false})
  @ApiQuery({ name: 'type', enum: SkillType , required: false})
  @ApiOkResponse({description: 'Return skills informations', type : Array<SkillDto>})
  async getSkills(@Query('type') type: SkillType, @Query('display') display : boolean) {
    const skills = await this.skillService.getSkillsByType(type, display)
    return skills.map((s)=> new SkillDto(s));
  }

  @Get('skills/:id')
  @ApiOkResponse({description: 'Return skill informations', type : SkillDto})
  async getSkill( @Param('id', ParseIntPipe) id: number) {
    const skill = await this.skillService.getSkill(id)
    return new SkillDto(skill);
  }

  @Post('skills')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'Add skill informations', type : SkillDto})
  async addSkill(@Body() body: CreateSkillDto) : Promise<SkillDto> {
    console.log(body)
    return new SkillDto(await this.skillService.addSkill(body));
  }

  @Put('skills/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'Update skill informations', type : SkillDto})
  async updateSkill(@Param('id', ParseIntPipe) id: number,@Body() body: CreateSkillDto) : Promise<SkillDto> {
    console.log(body)
    return new SkillDto(await this.skillService.updateSkill(id,body));
  }

  @Get('skills/:id/logo')
  @ApiOkResponse({description: 'get logo skill'})
  async getLogoSkill(@Res() response: Response,@Param('id', ParseIntPipe) id: number)  {
    const stream = Readable.from(await this.skillService.getLogoSkill(id));
    stream.pipe(response);
  }

  @Post('skills/:id/logo')
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
  @ApiOkResponse({description: 'Add logo skill'})
  @ApiUnauthorizedResponse({description: 'Invalid Authorization header'})
  async addLogoSkill(@Res() response: Response,@Param('id', ParseIntPipe) id: number,@UploadedFile('file') file: Express.Multer.File) {
    const stream = Readable.from(await this.skillService.addLogo(id, file.buffer, file.originalname));
    stream.pipe(response);
  }


}