import * as React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import { IState, Dispatch, IChecklistItem } from "../store";

interface IOwnProps {
  id: string;
}

interface IExpandedChecklistItem extends IChecklistItem {
  checked: boolean;
}

interface IMapStateProps {
  items: IExpandedChecklistItem[];
  exists: boolean;
}

interface IMapDispatchProps {
  setChecked: (checklistItemId: string, checked: boolean) => void;
}

interface IProps extends IOwnProps, IMapStateProps, IMapDispatchProps {}

interface IProps {
  id: string;
}

const Checklist = (props: IProps) => {
  if (!props.exists) return null;

  return (
    <List>
      {!!props.items.length ? (
        props.items.map(({ id, text, checked }) => (
          <ListItem
            key={id}
            dense
            button
            onClick={() => props.setChecked(id, !checked)}
          >
            <Checkbox checked={checked} tabIndex={-1} disableRipple />
            <ListItemText primary={text} />
          </ListItem>
        ))
      ) : (
        <ListItem dense>
          <ListItemText primary="No checklist items" />
        </ListItem>
      )}
    </List>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: IOwnProps
): IMapDispatchProps => ({
  setChecked: (checklistItemId: string, checked: boolean) =>
    dispatch({
      type: "SET_CHECKED",
      payload: {
        checklistId: props.id,
        checklistItemId,
        checked
      }
    })
});

const mapStateToProps = (state: IState, props: IOwnProps): IMapStateProps => {
  const checklist = state.checklistsById[props.id];
  const checks = state.checksByChecklistId[props.id] || {};

  if (!checklist) {
    return {
      items: [],
      exists: false
    };
  }

  return {
    exists: true,
    items: checklist.items.map(item => {
      return {
        ...item,
        checked: !!checks[item.id]
      };
    })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checklist);
