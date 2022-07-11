import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileModule } from '../../databaseFile/databaseFile.module';
import { Profile } from './entity/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';


@Module({
  imports: [TypeOrmModule.forFeature([Profile]), DatabaseFileModule, 
  PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],

})
export class ProfileModule {}