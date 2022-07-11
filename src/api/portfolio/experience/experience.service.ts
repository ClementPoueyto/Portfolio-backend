import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import DatabaseFilesService from "../../databaseFile/databaseFile.service";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { Experience } from "./entity/experience.entity";
import { ExperienceType } from "./experience.enum";



@Injectable()
export class ExperienceService {
  @Inject(DatabaseFilesService)
  private readonly databaseFilesService: DatabaseFilesService;

  async getExperiences() {
    const experience = await Experience.find();  
    if(!experience){
      throw new NotFoundException();
    }
    return experience;
  }

  async getExperiencesByType(type: ExperienceType){
    if(!type) return this.getExperiences();
    const experience = await Experience.find({where: {experienceType: type}});  
    return experience;
  }


  async getExperience(experienceId : number) {
  const experience = await Experience.findOne({where: {id:experienceId}});  
  if(!experience){
    throw new NotFoundException();
  }
  return experience;
}

async getImageExperience(experienceId : number) {
  const experience = await this.getExperience(experienceId);
  if(!experience.imageId){
    throw new NotFoundException();
  }
  return (await this.databaseFilesService.getFileById(experience.imageId)).data;
  
}

async addExperience(createExperience : CreateExperienceDto) : Promise<Experience>{
  console.log(createExperience)
    const experience = new Experience();
    experience.title = createExperience.title;
    experience.description = createExperience.description;
    experience.startDate = createExperience.startDate;
    experience.endDate = createExperience.endDate;
    experience.experienceType = createExperience.experienceType;
    experience.link = createExperience.link;
    experience.place = createExperience.place;
    experience.createdAt = new Date();

    const experienceCreated = Experience.save(experience);
    return experienceCreated;
}

async updateExperience(experienceId : number,updateExperience : CreateExperienceDto) : Promise<Experience>{
  
  const experience = await this.getExperience(experienceId);
  experience.title = updateExperience.title;
  experience.description = updateExperience.description;
  experience.startDate = updateExperience.startDate;
  experience.endDate = updateExperience.endDate;
  experience.experienceType = updateExperience.experienceType;
  experience.link = updateExperience.link;
  experience.place = updateExperience.place;
    Experience.update(experienceId,experience);
    return experience;
}

async addImage(experienceId, imageBuffer: Buffer, filename: string) {
  const experience = await this.getExperience(experienceId);
  if(experience.imageId){
    await Experience.update(experienceId, {
      image : null,
      imageId : null
    });
    this.databaseFilesService.deleteDatabaseFile(experience.imageId)
  }
  const image = await this.databaseFilesService.uploadDatabaseFile(imageBuffer, filename);
  await Experience.update(experienceId, {
    imageId: image.id,
    image : image
  });
  return image.data;
}


}