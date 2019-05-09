import React from "react";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import { IState } from "../store";
import ChecklistsItem from "./ChecklistsItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// TODO: Scroll to open one on mount

interface IProps {
  checklists: IState["checklists"];
}

const Checklists = ({ checklists }: IProps) => (
  <List>
    {checklists.length < 1 && (
      <ListItem>
        <ListItemText primary="No checklists to show" />
      </ListItem>
    )}
    {!!checklists.length &&
      checklists.map(id => <ChecklistsItem key={id} id={id} />)}
  </List>
);

const mapStateToProps = (state: IState): IProps => {
  return {
    checklists: state.checklists
  };
};

export default connect(mapStateToProps)(Checklists);
