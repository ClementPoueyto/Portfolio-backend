import {
    Controller,
    Get,
    Param,
    UseInterceptors,
    ClassSerializerInterceptor,
    ParseIntPipe,
    StreamableFile,
  } from '@nestjs/common';
  import { Readable } from 'stream';
import DatabaseFilesService from './databaseFile.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('database-files')
@ApiTags('database-file')
@UseInterceptors(ClassSerializerInterceptor)
export default class DatabaseFilesController {
  constructor(
    private readonly databaseFilesService: DatabaseFilesService
  ) {}
 
  @ApiOkResponse({description: 'retrieve file', type : StreamableFile})
  @Get(':id')
  async getDatabaseFileById(@Param('id', ParseIntPipe) id: number) : Promise<StreamableFile> {
    const file = await this.databaseFilesService.getFileById(id);
    const stream = Readable.from(file.data);
 
    return new StreamableFile(stream);
  }
}