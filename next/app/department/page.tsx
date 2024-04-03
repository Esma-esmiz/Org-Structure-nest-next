// "use client";
import React from "react";
import TimeLinee from "../components/TimeLine";
import DepartmentAccordion from "../components/departmentAcordion";
import SideNave from "../components/sideNave";
import store from '../state/store';

const Department = async () => {
  return (
    <div className="flex pt-1">
        <DepartmentAccordion  />
    </div>
  );
};

export default Department;
