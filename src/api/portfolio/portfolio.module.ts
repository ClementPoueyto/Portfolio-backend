import { Module } from "@nestjs/common";
import { ProfileModule } from "./profile/profile.module";
import { SkillModule } from './skill/skill.module';
import { ExperienceModule } from './experience/experience.module';
import { ProjectModule } from './project/project.module';

@Module({
    imports: [ProfileModule, SkillModule, ExperienceModule, ProjectModule
  ],
  
  })
  export class PortfolioModule {}