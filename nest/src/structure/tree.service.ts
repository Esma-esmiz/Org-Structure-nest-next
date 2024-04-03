import { Response, response } from 'express';
/* eslint-disable prettier/prettier */
import { Inject, Injectable, Res } from '@nestjs/common';
import { Department } from './department.entity';
import sequelize, { QueryTypes } from 'sequelize';
import _ from 'lodash';
import { Json } from 'sequelize/types/utils';

@Injectable()
export class TreeService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly departmentRepository: typeof Department,
  ) {}

  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.findAll();
  }

  async findTree(id: number): Promise<Department[]> {
    const query =
      `WITH RECURSIVE subordinates AS (
      SELECT 
      id,
        name, 
        description,
        managing_id
      FROM 
        public."Departments"
      WHERE 
        id = ` +
      id +
      `
      UNION 
      SELECT 
        d.id,
      d.name,
      d.description,
        d.managing_id 
      FROM 
        "Departments" d 
        INNER JOIN subordinates s ON s.id = d.managing_id
    ) 
    SELECT * FROM subordinates`;
    return await Department.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
  }

  async create(department: Department): Promise<any> {
    const isExistByName = await this.departmentRepository.findOne({
      where: { name: department.name },
    });
    if (isExistByName !== null) {
      return 'Departemnt is already exist!!';
    }

    // if (department.managing_id.toString === null || department.managing_id.toString.length < 0) {
    //   return 'Managing Department can not be empty';
    // }

    const isManagingExist = await this.departmentRepository.findOne({
      where: { id: department.managing_id },
    });
    if (isManagingExist === null) {
      return 'managing department not found';
    }
    department.createdAt= new Date();
    return await this.departmentRepository.create(department);
  }

  async department(id: number) {
    return await this.departmentRepository.findOne({ where: { id } });
  }

  async update(id: number, department: Department, @Res() res:Response) {
    const isExist = await this.departmentRepository.findOne({ where: { id } }); // check is empty return not found
    if (isExist === null) {
      return 'Departemnt is not found';
    }
    const isExistByName = await this.departmentRepository.findOne({
      where: { name: department.name },
    });
    if (isExistByName !== null) {
      return  res.status(400).send({message:'Departemnt name is already exist!!'});
    }

    //  if name is already exit return name is tacken, else continue
    let isManagingExist;
    if (
      department.managing_id.toString !== null ||
      department.managing_id > 0
    ) {
      isManagingExist = await this.departmentRepository.findOne({
        where: { managing_id: department.managing_id },
      });
      if (isManagingExist === null) {
        return 'managing department not found';
      }
    } else {
      return 'managing department should not be empty';
    }

    // if managing department exist continou else breake with non-exist managing departemnt
    // affter all condition is true  update

    const ress = await this.departmentRepository.update(
      { ...department },
      { where: { id } },
    );
    if(ress[0] === 1){
      return res.status(200).send(await this.department(id));
    }
  }

  async delete(id: number, res:Response) {
    const isExist = await this.departmentRepository.findOne({ where: { id } }); // check is empty return not found
    if (isExist === null) {
      return  res.send( 'Departemnt is not found');
    }

    // check for have subordinates departments

    const haveSubordinates = this.findTree(id);
    if ((await haveSubordinates).length > 1) {
      // return "have subordinates";
      return 'have subordinate department, can not delete!!';
    } 
    return   this.departmentRepository.destroy({ where: { id } });
      //  return response.status(202).json({message:"department deleted successfully!!"})
  }
}
