import * as React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

interface IProps {
  children: React.ReactNode;
}

const items = [
  {
    id: "1",
    text: "Hi there",
    checked: true
  },
  {
    id: "2",
    text: "Hi there",
    checked: false
  },
  {
    id: "3",
    text: "Hi there",
    checked: false
  },
  {
    id: "4",
    text: "Hi there",
    checked: false
  }
];

const Checklist = () => (
  <List>
    {items.map(({ id, text, checked }) => (
      <ListItem key={id} dense button>
        <Checkbox checked={checked} tabIndex={-1} disableRipple />
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>
);

export default Checklist;
