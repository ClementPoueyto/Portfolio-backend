import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileModule } from 'src/api/databaseFile/databaseFile.module';
import { Project } from './entity/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
    imports: [TypeOrmModule.forFeature([Project]), DatabaseFileModule, 
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
  ],
    controllers: [ProjectController],
    providers: [ProjectService],
    exports: [ProjectService],
})
export class ProjectModule {}
