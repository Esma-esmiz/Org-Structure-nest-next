"use client";
import React, { useEffect } from "react";
import { Button, Menu, rem } from "@mantine/core";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import useSWR from "swr";
import {
  Accordion,
  ActionIcon,
  AccordionControlProps,
  Center,
} from "@mantine/core";
import {
  IconDots,
  IconPlus,
  IconSettings,
  IconTrash,
  IconEdit,
} from "@tabler/icons-react";
import Link from "next/link";
import store from "../state/store";
import { error } from "console";
import { useSelector } from "react-redux";
import ManagingDepartments from "./managingDepartments";
import { deleteDepartment } from "../services/AppService";
 async function handleDelete() {
    //  console.log(props.id);
   const res= deleteDepartment(Number(150))
  }

function AccordionControl(props: AccordionControlProps) {
 
  return (
    <Center>
      <Menu shadow="md" width={200}>
        <Accordion.Control {...props} />
        <Menu.Target>
          <ActionIcon size="lg" variant="subtle" color="gray">
            <IconDots size="1rem" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown style={{ width: rem(150) }}>
          {/* <Menu.Label>Application</Menu.Label> */}
          <Link href={`/department/${props.id}`}>
            <Menu.Item
              leftSection={
                <IconEdit style={{ width: rem(14), height: rem(14) }} />
              }
              className="hover:bg-blue-400"
            >
              Edit
            </Menu.Item>
          </Link>

          <Menu.Item
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
            className="hover:bg-red-400"
            onClick={() => handleDelete()}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Center>
  );
}

function DepartmentAccordion() {
  const departments = store.getState().department;
  const isCeo = (value: any) => value.managing_id === null;
  const ceo = departments.filter(isCeo);

  return (
    <div className="w-1/4 ">
      {/* <Button variant="filled" className="rounded-full"><IconPlus size="1rem"  /></Button> */}
      <Link href="/department/create">
        <button className="rounded-full bg-[#1c7ed6] text-white">
          {" "}
          <IconPlus size="2rem" />
        </button>
      </Link>

      <Accordion chevronPosition="left" maw={400} mx="auto">
        {ceo.map((value) => (
          <Accordion.Item value="item-1">
            <AccordionControl id={value.id}>{value.name}</AccordionControl>

            <Accordion.Panel>
              <p>{value.description}</p>

              <div className="nested-accord">
                <ManagingDepartments id={value.id} />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      <div>{/* {JSON.stringify(data)} */}</div>
    </div>
  );
}
export default DepartmentAccordion;
