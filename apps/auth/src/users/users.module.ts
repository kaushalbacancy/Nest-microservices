import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, UsersDocument, UsersSchema } from '\'/common';
import { UsersRepository } from './users.repository';



@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{
      name: UsersDocument.name, schema: UsersSchema
    }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]

})



export class UsersModule {

}
