import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileModule } from 'src/api/databaseFile/databaseFile.module';
import { Skill } from './entity/skill.entity';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

@Module({
    imports: [TypeOrmModule.forFeature([Skill]), DatabaseFileModule, 
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
  ],
    controllers: [SkillController],
    providers: [SkillService],
    exports: [SkillService],
})
export class SkillModule {}
