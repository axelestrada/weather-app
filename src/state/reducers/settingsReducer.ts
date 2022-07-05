import { ISettings, StateActions } from "../interfaces";

import { SETTINGS } from "../ActionTypes";

const settingsReducer = (settings: ISettings, action: StateActions) => {
  switch (action.type) {
    case SETTINGS:
      return { ...settings, ...action.payload };

    default:
      return settings;
  }
};

export default settingsReducer;
