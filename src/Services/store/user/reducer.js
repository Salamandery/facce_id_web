import producer from 'immer';

const INITIAL_STATE = {
  user: null,
  handlerMenu: false,
  handlerModal: false,
};

export default function user(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.user = action.payload.profile.profile;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.user = action.payload.user.user;
        break;
      }
      case '@auth/SIGN_OUT_REQUEST': {
        draft.user = null;
        break;
      }
      case '@user/HANDLER_MENU': {
        draft.handlerMenu = !draft.handlerMenu;
        break;
      }
      case '@user/HANDLER_MODAL': {
        draft.handlerModal = !draft.handlerModal;
        break;
      }
      default: {
        // A ser implementado
      }
    }
  });
}
