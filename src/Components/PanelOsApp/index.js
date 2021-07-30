import React, { useEffect, useState, useCallback } from 'react';
import api from '../../Services/api';
import { connect, atualizaOS, novaOS } from '../../Services/websocket';
import { Container, Table } from './styles';
import { formatDate } from '../../Util/FormatDate';
import novoChamado from '../../Assets/novo_chamado.mp3';

const PanelOsApp = ({ userConfig }) => {
  const [services, setServices] = useState([]);

  const PlaySound = useCallback(() => {
    const audio = new Audio(novoChamado);
    audio.play();
  }, [novoChamado]);

  const getOS = useCallback(async () => {
    try {
      const res = await api.get('/schedules/2');

      if (res) {
        setServices(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    connect();
    getOS();
  }, [getOS, connect]);

  useEffect(() => {
    atualizaOS((e) => {
      const exists = userConfig.oficinaConfig.map(oficina => oficina.id === e.oficina_id);

      if (exists) {
        getOS();
      }
    });
  }, [getOS]);

  useEffect(() => {
    novaOS((e) => {
      const exists = userConfig.oficinaConfig.map(oficina => oficina.id === e.oficina_id);

      if (exists) {
        PlaySound();
        getOS();
      }
    });
  }, [getOS, PlaySound]);

  return (
    <Container>
      <Table fontSize="14px">
        <thead>
          <tr>
            <th>Cod.</th>
            <th>Data</th>
            <th>Titulo</th>
            <th>Localidade</th>
            <th>Responsável</th>
          </tr>
        </thead>
        <tbody>
          {services
            ? services.map((service) => (
                <tr key={service.id}>
                  <td width="75px">{service.id}</td>
                  <td width="175px">{formatDate(service.data)}</td>
                  <td width="1000px">{service.titulo}</td>
                  <td width="500px">{service.localidade.descricao}</td>
                  <td width="300px">{service.provedor?.login}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </Container>
  );
};

export default PanelOsApp;
