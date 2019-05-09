import React from "react";
import List from "@material-ui/core/List";
import ChecklistsItem from "./ChecklistsItem";

const checklists = [
  {
    id: "1",
    title: "Checklist 1"
  },
  {
    id: "2",
    title: "Checklist 2"
  },
  {
    id: "3",
    title: "Checklist 3"
  },
  {
    id: "4",
    title: "Checklist 4"
  },
  {
    id: "5",
    title: "Checklist 5"
  }
];

const Checklists = () => (
  <List>
    {checklists.map(({ id, title }) => (
      <ChecklistsItem key={id} title={title} />
    ))}
  </List>
);

export default Checklists;
