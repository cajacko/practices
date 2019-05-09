import { connect } from "react-redux";
import { IState, Dispatch } from "../../store";
import Checklist, {
  IOwnProps,
  IMapDispatchProps,
  IMapStateProps
} from "./Checklist.render";

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
      items: null,
      checklists: null,
      exists: false
    };
  }

  return {
    exists: true,
    checklists: checklist.checklists,
    items: checklist.items
      ? checklist.items.map(item => {
          return {
            ...item,
            checked: !!checks[item.id]
          };
        })
      : null
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checklist);
