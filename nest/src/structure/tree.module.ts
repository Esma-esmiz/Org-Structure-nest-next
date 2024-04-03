/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TreeController } from "./tree.controller";
import { TreeService } from "./tree.service";
import { departmentProviders } from "./department.providers";


@Module({
    imports:[],
    controllers:[TreeController],
    providers:[TreeService, ...departmentProviders],
})
export class TreeModule{}