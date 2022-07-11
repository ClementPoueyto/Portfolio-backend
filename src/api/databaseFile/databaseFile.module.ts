import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseFilesController from "./databaseFile.controller";
import DatabaseFilesService from "./databaseFile.service";
import { DatabaseFile } from "./entity/databaseFile.entity";

@Module({
    imports: [TypeOrmModule.forFeature([DatabaseFile])],
    controllers: [DatabaseFilesController],
    providers: [DatabaseFilesService],
    exports: [DatabaseFilesService],
  
  })
  export class DatabaseFileModule {}