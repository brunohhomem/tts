import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMeasure } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/upload')
  async createMeasure(@Body() data: CreateMeasure) {
    return this.appService.createMeasure(data);
  }

  // @Post()
  // async createUser(@Body() data: Prisma.UserCreateInput) {
  //   return this.userService.createUser(data);
  // }

  // @Patch(':id')
  // async updateUser(
  //   @Param('id') id: string,
  //   @Body() data: Prisma.UserUpdateInput,
  // ) {
  //   return this.userService.updateUser(Number(id), data);
  // }
}
