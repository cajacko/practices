import { applyMiddleware, createStore, Dispatch as RDispatch } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { IHeadingContent } from "../utils/fetchChecklists";

export interface IChecklistItem {
  id: string;
  text: string;
}
export interface IChecklist {
  id: string;
  title: string;
  items: IChecklistItem[];
}

export interface IState {
  checklists: string[];
  checklistsById: {
    [key: string]: undefined | IChecklist;
  };
  checksByChecklistId: {
    [key: string]:
      | undefined
      | {
          [key: string]: undefined | boolean;
        };
  };
  expandedByChecklistId: {
    [key: string]: undefined | boolean;
  };
}

interface ISetExpandedAction {
  type: "SET_IS_EXPANDED";
  payload: {
    checklistId: string;
    isExpanded: boolean;
  };
}

interface ISetCheckedAction {
  type: "SET_CHECKED";
  payload: {
    checklistId: string;
    checklistItemId: string;
    checked: boolean;
  };
}

interface IClearChecksAction {
  type: "CLEAR_CHECKS";
  payload: {
    checklistId: string;
  };
}

interface ICloseAllChecklists {
  type: "CLOSE_ALL_CHECKLISTS";
  payload: {};
}

interface ISetChecklists {
  type: "SET_CHECKLISTS";
  payload: {
    checklists: IHeadingContent[];
  };
}

type Actions =
  | ISetExpandedAction
  | ISetCheckedAction
  | IClearChecksAction
  | ISetChecklists
  | ICloseAllChecklists;

export type Dispatch = RDispatch<Actions>;

const initialState: IState = {
  checklists: [],
  checklistsById: {},
  checksByChecklistId: {},
  expandedByChecklistId: {}
};

const reducer = (state: IState = initialState, action: Actions) => {
  switch (action.type) {
    case "SET_IS_EXPANDED": {
      return {
        ...state,
        expandedByChecklistId: {
          ...state.expandedByChecklistId,
          [action.payload.checklistId]: action.payload.isExpanded
        }
      };
    }

    case "SET_CHECKED": {
      const checklistChecks =
        state.checksByChecklistId[action.payload.checklistId] || {};

      return {
        ...state,
        checksByChecklistId: {
          ...state.checksByChecklistId,
          [action.payload.checklistId]: {
            ...checklistChecks,
            [action.payload.checklistItemId]: action.payload.checked
          }
        }
      };
    }

    case "CLEAR_CHECKS": {
      return {
        ...state,
        checksByChecklistId: {
          ...state.checksByChecklistId,
          [action.payload.checklistId]: undefined
        }
      };
    }

    case "SET_CHECKLISTS": {
      const checklists: IState["checklists"] = [];
      const checklistsById: IState["checklistsById"] = {};

      action.payload.checklists.forEach(({ heading, checklist }) => {
        const checklistId = heading;
        checklists.push(checklistId);

        checklistsById[checklistId] = {
          id: checklistId,
          title: heading,
          items: checklist.map(item => {
            return {
              id: item,
              text: item
            };
          })
        };
      });

      return {
        ...state,
        checklists,
        checklistsById
      };
    }

    case "CLOSE_ALL_CHECKLISTS": {
      return {
        ...state,
        expandedByChecklistId: {}
      };
    }

    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, applyMiddleware(logger));

export const persistor = persistStore(store);
