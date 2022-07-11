import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { User } from '../entity/user.entity';

export class UserDto{

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'account id',
    type: String,
  })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    description: 'email account'
  })
  public email: string;

  @Exclude()
  public password: string;

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