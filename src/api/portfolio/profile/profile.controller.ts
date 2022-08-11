import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Req, Res, StreamableFile, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../user/auth/guards/jwt-auth.guards";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { ProfileDto } from "./dto/profile.dto";
import { ProfileService } from "./profile.service";
import { Readable } from 'stream';
import { Response } from 'express';

@ApiTags('profile')
@Controller()
export class ProfileController {
  @Inject(ProfileService)
  private readonly profileService: ProfileService;

  @Get('profiles/:id')
  @ApiOkResponse({description: 'Return my profile informations', type : ProfileDto})
  async getProfile( @Param('id', ParseIntPipe) id: number) {
    const profile = await this.profileService.getProfile(id)
    return new ProfileDto(profile);
  }

  @Post('profiles')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'Add my profile informations', type : ProfileDto})
  async addProfile(@Body() body: CreateProfileDto) : Promise<ProfileDto> {
    console.log(body)
    return new ProfileDto(await this.profileService.addProfile(body));
  }

  @Put('profiles/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'Update my profile informations', type : ProfileDto})
  async updateProfile(@Param('id', ParseIntPipe) id: number,@Body() body: CreateProfileDto) : Promise<ProfileDto> {
    console.log(body)
    return new ProfileDto(await this.profileService.updateProfile(id,body));
  }

  @Get('profiles/:id/avatar')
  @ApiOkResponse({description: 'get avatar profile'})
  async getAvatarProfile(@Res() response: Response,@Param('id', ParseIntPipe) id: number)  {
    const stream = Readable.from(await this.profileService.getAvatarProfile(id));
    stream.pipe(response);
  }

  @Post('profiles/:id/avatar')
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
  @ApiOkResponse({description: 'Add avatar profile'})
  @ApiUnauthorizedResponse({description: 'Invalid Authorization header'})
  async addAvatarProfile(@Res() response: Response,@Param('id', ParseIntPipe) id: number,@UploadedFile('file') file: Express.Multer.File) {
    const stream = Readable.from(await this.profileService.addAvatar(id, file.buffer, file.originalname));
    stream.pipe(response);
  }


}