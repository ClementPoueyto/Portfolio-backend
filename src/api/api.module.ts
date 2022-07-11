import { Module } from '@nestjs/common';
import { DatabaseFileModule } from './databaseFile/databaseFile.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ UserModule, PortfolioModule, DatabaseFileModule],
})
export class ApiModule {}