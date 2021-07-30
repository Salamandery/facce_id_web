import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLock, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import { Container, Login, LoginForm } from './style';
import Input from '../../Components/Input';
import { signUpRequest } from '../../Services/store/auth/action';

import GetValidationError from '../../Util/getValidationErrors';

const SignUp = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const handlerSignUp = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email(),
          login: Yup.string().required('Login é obrigatório'),
          nome: Yup.string().required('Nome é obrigatório'),
          password: Yup.string().required('Senha é obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(
          signUpRequest(data.nome, data.login, data.email, data.password, 1)
        );
      } catch (err) {
        const errors = GetValidationError(err);

        formRef.current.setErrors(errors);
      }
    },
    [dispatch]
  );

  return (
    <Container>
      <LoginForm>
        <span>CADASTRAR</span>
        <Form ref={formRef} onSubmit={handlerSignUp}>
          <Input icon={FiUser} name="login" placeholder="Login" />
          <Input icon={FiUser} name="nome" placeholder="Nome Completo" />
          <Input icon={FiMail} name="email" placeholder="E-mail corporativo" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />
          {/* <Select
            w="100%"
            defaultValue={1}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value={1}>EMPRESA 1</option>
          </Select> */}
          <Login onClick={handlerSignUp}>Cadastrar</Login>
          <Link to="/">Voltar</Link>
        </Form>
      </LoginForm>
    </Container>
  );
};

export default SignUp;
