import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import DatabaseFilesService from "../../databaseFile/databaseFile.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { Profile } from "./entity/profile.entity";

@Injectable()
export class ProfileService {
  @Inject(DatabaseFilesService)
  private readonly databaseFilesService: DatabaseFilesService;


  async getProfile(profileId : number) {
  const profile = await Profile.findOne({where: {id:profileId}});  
  if(!profile){
    throw new NotFoundException();
  }
  return profile;
}

async getAvatarProfile(profileId : number) {
  const profile = await this.getProfile(profileId);
  if(!profile.avatarId){
    throw new NotFoundException();
  }
  return (await this.databaseFilesService.getFileById(profile.avatarId)).data;
  
}

async addProfile(createProfile : CreateProfileDto) : Promise<Profile>{
  console.log(createProfile)
    const profile = new Profile();
    profile.firstname = createProfile.firstname;
    profile.lastname = createProfile.lastname;
    profile.description = createProfile.description;
    profile.birthDate = createProfile.birthDate;
    profile.createdAt = new Date();
    profile.updatedAt = new Date();
    profile.links = createProfile.links;
    profile.contact = createProfile.contact;

    const userCreated = Profile.save(profile);
    return userCreated;
}

async updateProfile(profileId : number,updateProfile : CreateProfileDto) : Promise<Profile>{
  
  const profile = await this.getProfile(profileId);
    profile.firstname = updateProfile.firstname;
    profile.lastname = updateProfile.lastname;
    profile.description = updateProfile.description;
    profile.birthDate = updateProfile.birthDate;
    profile.updatedAt = new Date();
    profile.links = updateProfile.links;
    profile.contact = updateProfile.contact;

    Profile.update(profileId,profile);
    return profile;
}

async addAvatar(profileId, imageBuffer: Buffer, filename: string) {
  const profile = await this.getProfile(profileId);
  if(profile.avatarId){
    await Profile.update(profileId, {
      avatar : null,
      avatarId : null
    });
    this.databaseFilesService.deleteDatabaseFile(profile.avatarId)
  }
  const avatar = await this.databaseFilesService.uploadDatabaseFile(imageBuffer, filename);
  await Profile.update(profileId, {
    avatarId: avatar.id,
    avatar : avatar
  });
  return avatar.data;
}


}