export const INITIAL_STATE = {
  taskID : ' ',
  modalOpen: false,
  newProfileModal : false,
  newUserModal : false,
  settingsModal : false,
};

// update state return new version of state
export const GlobalReducer = (state, action) => {
    // state (current state) /  action ()

    switch (action.type) {
            case "TASKID":
              return {
                ...state,
                taskID: action.payload
              };
              case "MODALOPEN":
                return {
                  ...state,
                  modalOpen: action.payload
                };
            case "NEWPROFILEOPEN":
              return {
                ...state,
                newProfileModal: action.payload
              };
            case "NEWUSEROPEN":
                return {
                  ...state,
                  newUserModal: action.payload
                };
            case "SETTINGSOPEN":
              return {
                ...state,
                settingsModal: action.payload
              };
        default:
          return state;
      }

}