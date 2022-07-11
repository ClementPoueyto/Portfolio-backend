import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import DatabaseFilesService from "../../databaseFile/databaseFile.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { Project } from "./entity/project.entity";
import { ProjectType } from "./project.enum";



@Injectable()
export class ProjectService {
  @Inject(DatabaseFilesService)
  private readonly databaseFilesService: DatabaseFilesService;

  async getProjects() {
    const project = await Project.find();  
    if(!project){
      throw new NotFoundException();
    }
    return project;
  }

  async getProjectsByType(type: ProjectType) {
    if(!type) return this.getProjects();
    const project = await Project.find({where:{projectType:type}});  
    return project;
  }

  async getProject(projectId : number) {
  const project = await Project.findOne({where: {id:projectId}});  
  if(!project){
    throw new NotFoundException();
  }
  return project;
}

async getImageProject(projectId : number) {
  const project = await this.getProject(projectId);
  if(!project.imageId){
    throw new NotFoundException();
  }
  return (await this.databaseFilesService.getFileById(project.imageId)).data;
  
}

async addProject(createProject : CreateProjectDto) : Promise<Project>{
  console.log(createProject)
    const project = new Project();
    project.title = createProject.title;
    project.description = createProject.description;
    project.startDate = createProject.startDate;
    project.endDate = createProject.endDate;
    project.projectType = createProject.projectType;
    project.links = createProject.links;
    project.createdAt = new Date();

    const projectCreated = Project.save(project);
    return projectCreated;
}

async updateProject(projectId : number,updateProject : CreateProjectDto) : Promise<Project>{
  
  const project = await this.getProject(projectId);
  project.title = updateProject.title;
  project.description = updateProject.description;
  project.startDate = updateProject.startDate;
  project.endDate = updateProject.endDate;
  project.projectType = updateProject.projectType;
  project.links = updateProject.links;
    Project.update(projectId,project);
    return project;
}

async addImage(projectId, imageBuffer: Buffer, filename: string) {
  const project = await this.getProject(projectId);
  if(project.imageId){
    await Project.update(projectId, {
      image : null,
      imageId : null
    });
    this.databaseFilesService.deleteDatabaseFile(project.imageId)
  }
  const image = await this.databaseFilesService.uploadDatabaseFile(imageBuffer, filename);
  await Project.update(projectId, {
    imageId: image.id,
    image : image
  });
  return image.data;
}


}