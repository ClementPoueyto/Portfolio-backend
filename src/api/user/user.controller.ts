import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.services';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get(':id')
  @ApiOkResponse({description: 'Return the corresponding user', type : UserDto})
  @ApiUnauthorizedResponse({description: 'Invalid Authorization header'})
  @ApiNotFoundResponse({description: 'User not found'})
  public async getUser(@Param('id', ParseIntPipe) id: string): Promise<UserDto> {
    const  user = await this.service.showById(id);
    return new UserDto(user);
  }

  @Post()
  @ApiOkResponse({description: 'Create and Return the user', type : UserDto})
  @ApiBadRequestResponse()
  @ApiConflictResponse({ description: 'Login already exist' })
  public async createUser(@Body() body: CreateUserDto): Promise<UserDto> {
    const  user = await this.service.create(body);  
    return new UserDto(user);
}


}