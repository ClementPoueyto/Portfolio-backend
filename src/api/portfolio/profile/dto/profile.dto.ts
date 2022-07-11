import { ApiProperty } from '@nestjs/swagger';
import { LinkDto } from '../../shared/dto/link.dto';
import { Profile } from '../entity/profile.entity';
import { ContactDto } from './contact.dto';

export class ProfileDto{

  constructor(partial: Partial<Profile>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  public id: number;

  @ApiProperty()
  public lastname: string;

  @ApiProperty()
  public firstname: string;

  @ApiProperty()
  public description: string;

  @ApiProperty({
    description: 'birth date profile'
  })
  public birthDate: Date;

  
  @ApiProperty()
  public contact : ContactDto

  @ApiProperty({
    isArray: true,
  type: LinkDto}
  )
  public links : LinkDto[]

  /*
   * Create and Update Date Columns
   */

  @ApiProperty({
    description: 'creation date account'
  })
  public createdAt: Date;
  
  @ApiProperty({
    description: 'last update date account'
  })
  public updatedAt: Date;


}