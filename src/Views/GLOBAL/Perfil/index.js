import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegSave } from 'react-icons/fa';
import { updateProfileRequest } from '../../../Services/store/user/action';
import { Save, ChangePassword, FormInput } from './style';
import { Form, Container } from '../../../Style';

const Perfil = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user);

  const [login, setLogin] = useState(profile.CNPJ ? profile.CNPJ : '');
  const [assinatura, setAssinatura] = useState(
    profile.assinatura !== 'null' ? profile.assinatura : ''
  );
  const [name, setName] = useState(profile.nome ? profile.nome : '');
  const [email, setEmail] = useState(profile.email ? profile.email : '');
  const [password, setPass] = useState('');
  const [oldPassword, setOldPass] = useState('');
  const [confirmPassword, setConfirmPass] = useState('');

  const handlerSave = useCallback(
    (e) => {
      dispatch(
        updateProfileRequest({
          login,
          name,
          email,
          assinatura,
          password,
          oldPassword,
          confirmPassword,
          provedor: profile.provedor,
        })
      );
    },
    [
      login,
      name,
      email,
      assinatura,
      password,
      oldPassword,
      confirmPassword,
      dispatch,
      updateProfileRequest,
    ]
  );

  return (
    <Container
      w="100%"
      h="100%"
      items="center"
      content="center"
      direction="column"
    >
      <Form direction="column" w="70%" h="100%" self="center" pad="10px">
        <FormInput
          placeholder="USUÁRIO"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <FormInput
          placeholder="NOME COMPLETO"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          placeholder="E-MAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {profile.provedor ? (
          <>
            <FormInput
              placeholder="ASSINATURA"
              value={assinatura}
              onChange={(e) => setAssinatura(e.target.value)}
            />
          </>
        ) : null}
        <ChangePassword>
          <FormInput
            placeholder="SENHA ATUAL"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPass(e.target.value)}
          />
          <FormInput
            placeholder="NOVA SENHA"
            type="password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
          <FormInput
            placeholder="CONFIRMAÇÃO DE SENHA"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </ChangePassword>
        <Save onClick={handlerSave}>
          <FaRegSave />
          <span>Salvar perfil</span>
        </Save>
      </Form>
    </Container>
  );
};

export default Perfil;
