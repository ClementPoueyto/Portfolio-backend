import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import DatabaseFilesService from "../../databaseFile/databaseFile.service";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { Skill } from "./entity/skill.entity";
import { SkillType } from "./skill.enum";


@Injectable()
export class SkillService {
  @Inject(DatabaseFilesService)
  private readonly databaseFilesService: DatabaseFilesService;

  @InjectRepository(Skill)
  private skillRepository: Repository<Skill>

  async getSkills() {
    const skills = await Skill.find();  
    if(!skills){
      throw new NotFoundException();
    }
    return skills;
  }

  async getSkillsByType(type:SkillType, display : boolean){
    if(!type&&!display) return this.getSkills();
    const skill = await this.skillRepository.find({where:{skillType : type, display : display}});  
    if(!skill){ 
      throw new NotFoundException();
    }
    return skill;
  }


  async getSkill(skillId : number) {
  const skill = await Skill.findOne({where: {id:skillId}});  
  if(!skill){
    throw new NotFoundException();
  }
  return skill;
}

async getSkillByName(name : string){
  const skill = await Skill.findOne({where : { name : name}})
  if(!skill){
    throw new NotFoundException();
  }
  return skill;
}

async getLogoSkill(skillId : number) {
  const skill = await this.getSkill(skillId);
  if(!skill.logoId){
    throw new NotFoundException();
  }
  return (await this.databaseFilesService.getFileById(skill.logoId)).data;
  
}

async addSkill(createSkill : CreateSkillDto) : Promise<Skill>{
  console.log(createSkill)
    const skill = new Skill();
    skill.name = createSkill.name;
    skill.description = createSkill.description;
    skill.skillType = createSkill.skillType;
    skill.createdAt = new Date();

    const skillCreated = Skill.save(skill);
    return skillCreated;
}

async updateSkill(skillId : number,updateSkill : CreateSkillDto) : Promise<Skill>{
  
  const skill = await this.getSkill(skillId);
    skill.name = updateSkill.name;
    skill.description = updateSkill.description;
    skill.skillType = updateSkill.skillType;
    Skill.update(skillId,skill);
    return skill;
}

async addLogo(skillId, imageBuffer: Buffer, filename: string) {
  const skill = await this.getSkill(skillId);
  if(skill.logoId){
    await Skill.update(skillId, {
      logo : null,
      logoId : null
    });
    this.databaseFilesService.deleteDatabaseFile(skill.logoId)
  }
  const logo = await this.databaseFilesService.uploadDatabaseFile(imageBuffer, filename);
  await Skill.update(skillId, {
    logoId: logo.id,
    logo : logo
  });
  return logo.data;
}


}