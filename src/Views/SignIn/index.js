import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import { Container, Login, LoginForm, FormWrapper, Logo } from './style';
import { Wrapper } from '../../Style'
import Input from '../../Components/Input';
import { signInRequest } from '../../Services/store/auth/action';

import GetValidationError from '../../Util/getValidationErrors';

const SignIn = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const loading = useSelector((state) => state.auth.loading);

  const handlerLogin = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        login: Yup.string().required('Login é obrigatório'),
        password: Yup.string().required('Senha é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(signInRequest(data.login, data.password));
    } catch (err) {
      const errors = GetValidationError(err);

      formRef.current.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <LoginForm>
        <Logo>
          <img />
        </Logo>
        <span id="title">FACCE_ID</span>
        <span id="subtitle">SISTEMA DE RECONHECIMENTO FACIAL</span>
        <Form ref={formRef} onSubmit={handlerLogin}>
          <FormWrapper w="100%">
            <span>Usuário:</span>
            <Input
              name="login"
              placeholder="Login"
            />
          </FormWrapper>
          <FormWrapper>
            <span>Senha:</span>
            <Input
              name="password"
              type="password"
              placeholder="Senha"
            />
          </FormWrapper>
          <Wrapper 
            w="100%"
            direction="column"
            content="space-between"
            items="center"
          >
            <Link to={'/CadastroDeUsuario'}>Esqueceu a senha?</Link>
            <Login onClick={handlerLogin}>
              {loading === true ? 'Carregando..' : 'ENTRAR'}
            </Login>
          </Wrapper>
        </Form>
      </LoginForm>
    </Container>
  );
};

export default SignIn;
