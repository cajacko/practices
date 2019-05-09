import { applyMiddleware, createStore, Dispatch as RDispatch } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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

type Actions = ISetExpandedAction | ISetCheckedAction | IClearChecksAction;

export type Dispatch = RDispatch<Actions>;

const initialState: IState = {
  checklists: ["1", "2", "3"],
  checklistsById: {
    "1": {
      id: "1",
      title: "Checklist 1",
      items: [
        {
          id: "1",
          text: "Item 1"
        },
        {
          id: "2",
          text: "Item 2"
        },
        {
          id: "3",
          text: "Item 3"
        }
      ]
    },
    "2": {
      id: "2",
      title: "Checklist 2",
      items: [
        {
          id: "1",
          text: "Item 1"
        },
        {
          id: "2",
          text: "Item 2"
        },
        {
          id: "3",
          text: "Item 3"
        }
      ]
    },
    "3": {
      id: "3",
      title: "Checklist 3",
      items: []
    }
  },
  checksByChecklistId: {},
  expandedByChecklistId: {}
};

const reducer = (state: IState = initialState, action: Actions) => {
  switch (action.type) {
    case "SET_IS_EXPANDED": {
      const expandedByChecklistId = {
        [action.payload.checklistId]: action.payload.isExpanded
      };

      return {
        ...state,
        expandedByChecklistId
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
