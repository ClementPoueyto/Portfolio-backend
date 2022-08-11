import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';


@Injectable()
export class UserService {

  @Inject(ConfigService)
  private readonly config: ConfigService;

  async create(createUserDto: CreateUserDto) {
    const pwdServer = this.config.get<string>('DATABASE_PASSWORD');
    if(createUserDto.serverPassword!=pwdServer) throw new UnauthorizedException();
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    const userCreated = User.save(user).catch(_=>{throw new ConflictException('Login already exists')});
    return userCreated;
    
  }

  async showById(id: string): Promise<User> {
    const user = await this.findById(id);
    if(!user) throw new NotFoundException();
    return user;
  }

  async findById(id: string) {
    return await User.findOne({where: {id: id}});
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

}