import { ApiProperty } from '@nestjs/swagger';
import { DatabaseFile } from '../entity/databaseFile.entity';
 
export class DatabaseFileDto {
  constructor(partial: Partial<DatabaseFile>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  public id: number;

  @ApiProperty()
  filename: string;
 
  @ApiProperty()
  data: Uint8Array;
}
