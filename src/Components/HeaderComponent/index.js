import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from 'react-icons/io';
import history from '../../Services/history';
import MessageHandling from '../../Util/MessageHandling';
import api from '../../Services/api';
import {
  Container,
  User,
  UserInfo,
  Username,
  ButtonPerfil,
  SystemInfo,
  VersionNumber,
  Sair,
  Intranet,
} from './style';
import { ButtonDefault } from '../../Style';

import { signOutRequest } from '../../Services/store/auth/action';

const Header = ({ title, Ico, buttonBack }) => {
  const dispatch = useDispatch();
  const version = process.env.REACT_APP_VERSION;
  const user = useSelector((state) => console.log(state.user));

  const checkToken = useCallback(async () => {
    try {
      const res = await api.get('/providers');
      if (MessageHandling(res) === 'logout') {
        handlerLogout();
      }
    } catch (err) {
      console.log(err);
    }
  }, [handlerLogout]);

  const handlerNavigate = useCallback(
    (path) => {
      history.push(`${path}`);
    },
    [history]
  );

  function handlerLogout() {
    dispatch(signOutRequest());
  }

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <Container bgColor="#333" txtColor="#fff">
      <Intranet>
        <Ico style={{ marginRight: 10 }} />
        {title}
        {buttonBack ? (
          <ButtonDefault
            size="small"
            tp="warn"
            onClick={(e) => history.goBack()}
          >
            <IoMdArrowRoundBack />
            <span>Voltar</span>
          </ButtonDefault>
        ) : //<></>
        null}
      </Intranet>
      <User>
        <SystemInfo>
          <span>FACCE_ID</span>
          <VersionNumber>
            Ver. {version} <i>Beta</i>
          </VersionNumber>
        </SystemInfo>
        <UserInfo>
          <Username>{}</Username>
          <ButtonPerfil onClick={(e) => handlerNavigate('/Perfil')}>
            Editar Perfil
          </ButtonPerfil>
        </UserInfo>
        <Sair onClick={handlerLogout}>Sair</Sair>
      </User>
    </Container>
  );
};

export default Header;
