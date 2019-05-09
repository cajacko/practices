import React from "react";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import { IState } from "../store";
import ChecklistsItem from "./ChecklistsItem";

interface IProps {
  checklists: IState["checklists"];
}

const Checklists = ({ checklists }: IProps) => (
  <List>
    {checklists.map(id => (
      <ChecklistsItem key={id} id={id} />
    ))}
  </List>
);

const mapStateToProps = (state: IState): IProps => {
  return {
    checklists: state.checklists
  };
};

export default connect(mapStateToProps)(Checklists);
