import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Clear from "@material-ui/icons/Clear";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Checklist from "./Checklist";
import { connect } from "react-redux";
import { IState, IChecklist, Dispatch } from "../store";

interface IOwnProps {
  id: string;
}

interface IMapStateProps extends IChecklist {
  isExpanded: boolean;
  exists: boolean;
}

interface IMapDispatchProps {
  setIsExpanded: (isExpanded: boolean) => void;
  clearChecks: () => void;
}

interface IProps extends IOwnProps, IMapStateProps, IMapDispatchProps {}

const ChecklistsItem = ({
  title,
  isExpanded,
  setIsExpanded,
  exists,
  id,
  clearChecks
}: IProps) => {
  if (!exists) return null;

  return (
    <React.Fragment>
      <ListItem
        button
        onClick={() => setIsExpanded(!isExpanded)}
        selected={isExpanded}
      >
        <ListItemIcon>
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
        <ListItemText primary={title} />

        {isExpanded && (
          <ListItemSecondaryAction>
            <IconButton aria-label="Clear Checks" onClick={clearChecks}>
              <Clear />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Checklist id={id} />
      </Collapse>

      <Divider />
    </React.Fragment>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: IOwnProps
): IMapDispatchProps => ({
  setIsExpanded: (isExpanded: boolean) =>
    dispatch({
      type: "SET_IS_EXPANDED",
      payload: {
        checklistId: props.id,
        isExpanded
      }
    }),
  clearChecks: () =>
    dispatch({
      type: "CLEAR_CHECKS",
      payload: {
        checklistId: props.id
      }
    })
});

const mapStateToProps = (state: IState, props: IOwnProps): IMapStateProps => {
  const checklist = state.checklistsById[props.id];

  if (!checklist) {
    return {
      exists: false,
      id: "NONE",
      isExpanded: false,
      title: "No Checklist",
      items: []
    };
  }

  return {
    ...checklist,
    isExpanded: !!state.expandedByChecklistId[props.id],
    exists: true
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistsItem);
