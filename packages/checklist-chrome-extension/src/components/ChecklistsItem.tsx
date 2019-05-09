import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Checklist from "./Checklist";

interface IProps {
  title: string;
  // isExpanded?: boolean;
}

const Checklists = ({ title }: IProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <React.Fragment>
      <ListItem
        button
        onClick={() => setIsExpanded(!isExpanded)}
        selected={isExpanded}
      >
        <ListItemText primary={title} />
        <ListItemIcon>
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
      </ListItem>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Checklist />
      </Collapse>

      <Divider />
    </React.Fragment>
  );
};

export default Checklists;
