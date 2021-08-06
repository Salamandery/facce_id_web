import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '../../history';
import MessageHandling from '../../../Util/MessageHandling';
import { signSuccess, signFailure } from './action';

import api from '../../api';

export function* signIn({ payload }) {
  try {
    const { login, password } = payload;
    const res = yield call(api.post, 'auth', {
      login,
      password
    });

    const { token } = res.data;

    if (MessageHandling(res, true)) {
      const userConfig = res.data.data;
      api.defaults.headers.authorization = `Bearer ${token}`;

      yield put(
        signSuccess(token, userConfig)
      );

      setTimeout(() => {
        history.push('/Home');
      }, 1000);
    } else {
      yield put(signFailure());
    }
  } catch (err) {
    yield put(signFailure());
    toast.error('Erro ao fazer o login, verifique os dados informados!');
    console.log(err);
  }
}

export function* signUp({ payload }) {
  try {
    const { nome, login, email, password } = payload;

    const res = yield call(api.post, 'usuario', {
      nome,
      login: login.toLowerCase(),
      email: email.toLowerCase(),
      password,
      ativo: false,
    });

    if (MessageHandling(res)) {

      history.push('/');

      toast.success('Cadastro foi realizado... Aguarde o acesso ser liberado!');
    }
  } catch (err) {
    yield put(signFailure());
    toast.error('Erro ao cadastrar, verifique os dados informados');
    console.log(err);
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  api.defaults.headers.authorization = `Bearer ${token}`;
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT_REQUEST', signOut),
]);
