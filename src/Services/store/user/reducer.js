import producer from 'immer';

const INITIAL_STATE = {
  user: null,
  company: null,
  menu: null,
  forms: null,
  oficinas: null,
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
        draft.company = action.payload.user.Empresa;
        draft.menu = action.payload.menu;
        draft.forms = action.payload.forms;
        draft.oficinas = action.payload.oficinas;
        break;
      }
      case '@auth/SIGN_OUT_REQUEST': {
        draft.user = null;
        draft.menu = null;
        draft.forms = null;
        draft.company = null;
        draft.oficinas = null;
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
      case '@user/SET_COMPANY': {
        draft.company = action.payload.company;
        break;
      }
      case '@user/SET_FAVORITE_PAGE': {
        draft.favorite_page = action.payload.favorite_page;
        break;
      }
      default: {
        // A ser implementado
      }
    }
  });
}
