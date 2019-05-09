import React from "react";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import { IState, Dispatch } from "../store";
import ChecklistsItem from "./ChecklistsItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandLess from "@material-ui/icons/ExpandLess";

// TODO: Scroll to open one on mount

interface IMapDispatchProps {
  closeAllChecklists: () => void;
}

interface IMapStateProps {
  checklists: IState["startingChecklists"];
}

interface IProps extends IMapStateProps, IMapDispatchProps {}

const Checklists = ({ checklists, closeAllChecklists }: IProps) => (
  <List>
    {!!checklists.length ? (
      <React.Fragment>
        <ListItem divider selected button onClick={closeAllChecklists}>
          <ListItemIcon>
            <ExpandLess />
          </ListItemIcon>
          <ListItemText primary="Close all checklists" />
        </ListItem>
        {checklists.map(id => (
          <ChecklistsItem key={id} id={id} level={0} />
        ))}
      </React.Fragment>
    ) : (
      <ListItem>
        <ListItemText primary="No checklists to show" />
      </ListItem>
    )}
  </List>
);

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchProps => ({
  closeAllChecklists: () =>
    dispatch({
      type: "CLOSE_ALL_CHECKLISTS",
      payload: {}
    })
});

const mapStateToProps = (state: IState): IMapStateProps => {
  return {
    checklists: state.startingChecklists
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checklists);
