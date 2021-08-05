export function signInRequest(login, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { login, password },
  };
}

export function signSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signUpRequest(nome, login, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { nome, login, email, password },
  };
}
export function signOutRequest() {
  return {
    type: '@auth/SIGN_OUT_REQUEST',
  };
}
