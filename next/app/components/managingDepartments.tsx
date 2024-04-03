import React, { Component } from "react";
import {
  Accordion,
  ActionIcon,
  AccordionControlProps,
  Center,
  Menu,
  rem,
} from "@mantine/core";
import { IconDots, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import store from "../state/store";
import Link from "next/link";
import {loadApi, deleteDepartment } from "../services/AppService";
import { useRouter } from 'next/router';

function AccordionControl(props: AccordionControlProps) {
  const router = useRouter();// Force refresh the page
  async function handleDelete() { 
   await deleteDepartment(Number(props.id));
   store.dispatch({
    type: "RESET_STATE",
  });
    loadApi();
 }
 
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
              onClick={()=>handleDelete()}
            >
              Delete
            </Menu.Item>
        
        </Menu.Dropdown>
      </Menu>
    </Center>
  );
}

function ManagingDepartments({ id }) {
  
  const notCeo = (value: any) => value.managing_id === id;
  const departments = store.getState().department;
  console.log("nest", id);
  return (
    <div>
      <Accordion chevronPosition="left" maw={400} mx="auto">
        {departments.filter(notCeo).map((dep) => (
          <Accordion.Item key={dep.name} value={dep.name}>
            <AccordionControl id={dep.id}>{dep.name}</AccordionControl>
            <Accordion.Panel>
              <p>{dep.description}</p>
              <ManagingDepartments id={dep.id} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default ManagingDepartments;
