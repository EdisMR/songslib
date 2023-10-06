import { Controller, Get } from '@nestjs/common';
import { environment } from './environment/environment';

@Controller()
export class AppController {
  @Get()
  findAll() {
    return 'Hello World!'
  }

  @Get("categories")
  getCategories() {
    return environment.categories;
  }
}
