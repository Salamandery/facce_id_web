import React, { useEffect, useState, useCallback } from 'react';
import { FaCheck } from 'react-icons/fa';
import api from '../../../../Services/api';
import {
  Container,
  Table,
  CardBlock,
  ButtonDefault,
  Input,
  Wrapper,
  Form,
} from '../../../../Style';
import MessageHandling from '../../../../Util/MessageHandling';

export default function Papel() {
  const [Id, setCdPapel] = useState('');
  const [Descricao, setDescricao] = useState('');
  const [Ativo, setAtivo] = useState(true);
  const [papel, setPapel] = useState([]);

  const loadPapel = useCallback(async() => {
    try {
      const res = await api.get(`/papeis`);
      if (MessageHandling(res)) {
        setPapel(state => res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handlerInsert = useCallback(async() => {
    try {
      const res = await api.post(`/papeis`, {
        descricao: Descricao,
        ativo: Ativo,
      });

      if (MessageHandling(res, true)) {
        setTimeout(() => {
          loadPapel();
          setAtivo(true);
          setCdPapel('');
          setDescricao('');
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  }, [Ativo, Descricao, loadPapel]);

  const handlerUpdate = useCallback(async() => {
    try {
      const res = await api.put(`/papeis/${Id}`, {
        descricao: Descricao,
        ativo: Ativo,
      });

      if (MessageHandling(res, true)) {
        setTimeout(() => {
          loadPapel();
          setAtivo(true);
          setCdPapel('');
          setDescricao('');
        }, 1000);
      }

    } catch (err) {
      console.log(err);
    }
  }, [Descricao, Ativo, Id, loadPapel]);

  const handleSet = useCallback((item) => {
    setAtivo(item.ativo || true);
    setCdPapel(item.id || '');
    setDescricao(item.descricao || '');
  }, []);

  useEffect(() => {
    loadPapel();
  }, [loadPapel]);

  return (
    <Container direction="column" w="100%" h="100%">
      <CardBlock w="100%" h="100%" overflow="auto">
        <Container direction="column" w="100%" h="100%" pad="15px">
          <Form>
            <Wrapper w="100%">
              <Input
                disabled
                marginright="true"
                borderless="true"
                w="10%"
                placeholder="CÓDIGO"
                value={Id}
                onChange={(e) => setCdPapel(e.target.value)}
              />
              <Input
                marginright="true"
                borderless="true"
                w="40%"
                placeholder="DESCRIÇÃO"
                value={Descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <Wrapper>
                <Input
                  type="checkbox"
                  marginright="true"
                  checked={Ativo}
                  onChange={(e) => setAtivo(e.target.checked)}
                />
                <span>Ativo ?</span>
              </Wrapper>
              {Id ? (
                <ButtonDefault tp="action" onClick={handlerUpdate}>
                  <FaCheck />
                  <span>Atualizar</span>
                </ButtonDefault>
              ) : (
                <ButtonDefault tp="action" onClick={handlerInsert}>
                  <FaCheck />
                  <span>Cadastrar</span>
                </ButtonDefault>
              )}
            </Wrapper>
          </Form>
          <Table
            childGroup="true"
            upper="uppercase"
            titleAlign="left"
            textAlign="left"
            fontSize="16px"
            lastRowAlign="left"
          >
            <thead>
              <tr>
                <th>Cód.</th>
                <th>DESCRIÇÃO</th>
                <th>S/N ATIVO</th>
              </tr>
            </thead>
            <tbody>
              {papel.map((srv) => (
                <tr key={srv.id} onClick={(e) => handleSet(srv)}>
                  <td width="45px">{srv.id}</td>
                  <td width="1200px">{srv.descricao}</td>
                  <td width="200px">{srv.ativo ? 'SIM' : 'NÂO'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </CardBlock>
    </Container>
  );
}
