import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileModule } from 'src/api/databaseFile/databaseFile.module';
import { Experience } from './entity/experience.entity';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';

@Module({
    imports: [TypeOrmModule.forFeature([Experience]), DatabaseFileModule, 
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
  ],
    controllers: [ExperienceController],
    providers: [ExperienceService],
    exports: [ExperienceService],
})
export class ExperienceModule {}
