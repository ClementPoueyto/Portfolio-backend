import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { DatabaseFile } from './entity/databaseFile.entity';
 
@Injectable()
class DatabaseFilesService {
  @InjectRepository(DatabaseFile)
    private databaseFilesRepository: Repository<DatabaseFile>

  constructor() {}
 
  async uploadDatabaseFile(dataBuffer: Buffer, filename: string) : Promise<DatabaseFile>{
    const newFile = await this.databaseFilesRepository.create({
      filename,
      data: dataBuffer
    })
    await this.databaseFilesRepository.save(newFile);
    return newFile;
  }

  async deleteDatabaseFile(fileId: number) {
    return await this.databaseFilesRepository.delete({id : fileId});
  }

 
  async getFileById(fileId: number) {
    const file = await this.databaseFilesRepository.findOne({where : {id : fileId}});
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
 
export default DatabaseFilesService;