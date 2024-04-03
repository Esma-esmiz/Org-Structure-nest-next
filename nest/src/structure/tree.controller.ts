/* eslint-disable prettier/prettier */
import { Department } from './department.entity';
import { TreeService } from './tree.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('api/v1/department')
export class TreeController {
  constructor(private treeService: TreeService) {}
  @Get()
  getTree() {
    return this.treeService.findAll();
  }

  @Get(':id')
  getSubordinate(@Param('id') id: number) {
    return this.treeService.findTree(id);
  }

  @Post()
  create(@Body() department: Department) {
    return this.treeService.create(department);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() deparment: Department, @Res() res:Response) {
    return this.treeService.update(id, deparment, res);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Res() res: Response) {
    return this.treeService.delete(id, res);
  }
}
