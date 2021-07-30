import React, { useEffect } from 'react';
import api from '../../Services/api';
import { render } from 'react-dom';
import { Container, Image, Text } from './styles';

import logo from '../../Assets/reactjs-icon.svg';
import Panel from '../PanelOsApp';

const PanelIntro = () => {

  useEffect(() => {
    async function setSession() {
      try {
        const res = await api.post('/session', {
          login: 'tipainel',
          password: '123456',
          company: 1,
        });

        const { token, user } = res.data;
        api.defaults.headers.authorization = `Bearer ${token}`;

        setTimeout(() => {
          const panelElement = document.getElementById('root');
          render(<Panel userConfig={user} />, panelElement);
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    }

    setSession();
  }, []);

  return (
    <Container>
      <Image src={logo} alt="ReactJS logo" />
      <Text>Bem - Vindo!</Text>
    </Container>
  );
};

export default PanelIntro;
