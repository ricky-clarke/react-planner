export const INITIAL_STATE = {
  taskID : ' ',
  modalOpen: false,
  newProfileModal : false,
  newUserModal : false,
  settingsModal : false,
  secondaryColor : ''
  // contrastButton : 'dark',
  // displayButton : 'grid',
  // menuOpen : false,
  // searchOpen : false
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
                case "SECONDARYCOLOR":
                    return {
                      ...state,
                      secondaryColor: action.payload
                    };
          // case "CONTRAST":
          //   return {
          //     ...state,
          //     contrastButton: action.payload
          //   };
          //   case "DISPLAY":
          //     return {
          //       ...state,
          //       displayButton: action.payload
          //     };
          //   case "MENU":
          //       return {
          //         ...state,
          //         menuOpen: action.payload
          //       };
          //   case "SEARCH":
          //       return {
          //          ...state,
          //          searchOpen: action.payload
          //       };
        default:
          return state;
      }

}