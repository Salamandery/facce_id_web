export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}
export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}
export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
export function handlerMenu() {
  return {
    type: '@user/HANDLER_MENU',
  };
}
export function handlerModal() {
  return {
    type: '@user/HANDLER_MODAL',
  };
}
export function setMeRequest(company) {
  return {
    type: '@user/SET_COMPANY',
    payload: { company },
  };
}
export function setFavoritePage(favorite_page) {
  return {
    type: '@user/SET_FAVORITE_PAGE',
    payload: { favorite_page },
  };
}
