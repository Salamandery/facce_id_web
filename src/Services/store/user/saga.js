import { takeLatest, call, put, all } from 'redux-saga/effects';
import MessageHandling from '../../../Util/MessageHandling';
import api from '../../api';
import { updateProfileSuccess, updateProfileFailure } from './action';

export function* updateProfile({ payload }) {
  try {
    const {
      name,
      login,
      email,
      wd = 0,
      company,
      provedor,
      ...rest
    } = payload.data;

    const profile = {
      nome: name,
      login: login.toLowerCase(),
      email: email.toLowerCase(),
      oficina_default: wd,
      provedor,
      ...(rest.oldPassword ? rest : {}),
    };

    const res = yield call(api.put, 'usuario', profile);

    if (MessageHandling(res, true)) {
      yield put(updateProfileSuccess({ profile: res.data.data, company }));
    }
  } catch (err) {
    yield put(updateProfileFailure());
    console.log(err);
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
