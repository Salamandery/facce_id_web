import React, { useState, useCallback } from 'react';
import { FaCheck, FaEraser, FaSearch } from 'react-icons/fa';
import api from '../../../../Services/api';
import MessageHandling from '../../../../Util/MessageHandling';
import Modal from '../../../../Components/ModalController';
import {
  Container,
  CardBlock,
  Form,
  Input,
  Wrapper,
  FieldSet,
  ButtonDefault,
  Table,
} from '../../../../Style';

export default function Localidades() {
  const [handlerModal, setHandlerModal] = useState(true);
  const [id, setId] = useState('');
  const [setor_id, setSetorId] = useState(0);
  const [setor, setSetor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [localidades, setLocalidades] = useState([]);
  const [setores, setSetores] = useState([]);
  const [localidadesBase, setLocalidadesBase] = useState([]);
  const [setoresBase, setSetoresBase] = useState([]);

  const LoadLocalidades = useCallback((id)=>{
    try {
      const res = api.get(`/locations/${id}`);

      if (MessageHandling(res)) {
        setLocalidades(res.data.data);
        setLocalidadesBase(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  },[]);

  const getSetores = useCallback(()=>{
    try {
      const res = api.get('/sectors');

      if (MessageHandling(res)) {
        setSetores(res.data.data);
        setSetoresBase(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  },[]);

  const handlerSubmit = useCallback(()=>{
    try {
      const res = api.post('/locations', {
        ativo,
        descricao,
        setor_id,
      });

      if (MessageHandling(res)) {
        setSetorId('');
        setSetor('');
        setDescricao('');
        setId('');
        setAtivo(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  },[ativo, descricao, setor_id]);

  const handlerAtualiza = useCallback(()=>{
    try {
      const res = api.put('/locations', {
        ativo,
        descricao,
        setor_id,
      });

      if (MessageHandling(res)) {
        setSetorId('');
        setSetor('');
        setDescricao('');
        setId('');
        setAtivo(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [ativo, descricao, setor_id]);

  const handlerSet = useCallback((unidade) => {
    LoadLocalidades(unidade.id);
    setSetorId(unidade.id);
    setSetor(unidade.descricao);
    // Fechar modal
    setHandlerModal(false);
  }, []);

  const handlerSetLocalidade = useCallback((localidade) => {
    setId(localidade.id);
    setAtivo(localidade.extra);
    setDescricao(localidade.descricao);
    setSetorId(localidade.setor.id);
    setSetor(localidade.setor.descricao);
  }, []);

  const handlerRequestModal = useCallback(() => {
    setHandlerModal(!handlerModal);
    getSetores();
  }, [handlerModal, getSetores]);

  const typeSearch = useCallback((type, text, arr) => {
    const items = arr;
    let filteredName;
    switch (type) {
      case 1:
        filteredName = items.filter((item) => {
          return item.descricao.toLowerCase().match(text);
        });

        if (!text || text === '') {
          setSetores(setoresBase);
        } else if (!Array.isArray(filteredName) && !filteredName.length) {
          setSetores(filteredName);
        } else if (Array.isArray(filteredName)) {
          setSetores(filteredName);
        }
        break;
      case 2:
        filteredName = items.filter((item) => {
          return item.descricao.toLowerCase().match(text);
        });

        if (!text || text === '') {
          setLocalidades(localidadesBase);
        } else if (!Array.isArray(filteredName) && !filteredName.length) {
          setLocalidades(filteredName);
        } else if (Array.isArray(filteredName)) {
          setLocalidades(filteredName);
        }
        break;
      default:
        break;
    }
  }, [setoresBase, localidadesBase]);

  const searchText = useCallback((e, when) => {
    const text = e.toLowerCase();

    switch (when) {
      case 'setor':
        typeSearch(1, text, setoresBase);
        break;
      case 'localidade':
        typeSearch(2, text, localidadesBase);
        break;
    }
  }, [setoresBase, localidadesBase]);

  return (
    <Container w="100%" h="100%" direction="column">
      <Form w="100%" direction="column">
        <Wrapper w="100%" margin="5px">
          <Input
            marginright
            placeholder="CÓDIGO"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled
          />
          <Wrapper>
            <Input
              marginright
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
            />
            <span>Ativo ?</span>
          </Wrapper>
        </Wrapper>
        <FieldSet border w="100%">
          <legend>Setor</legend>
          <Wrapper>
            <Input
              disabled
              placeholder="CÓDIGO"
              marginright
              value={setor_id}
              onChange={(e) => {
                setSetorId(e.target.value);
              }}
            />
            <Input
              w="50%"
              disabled
              placeholder="UNIDADE DE ATENDIMENTO"
              value={setor}
              onChange={(e) => {
                setSetor(e.target.value);
              }}
            />
            <ButtonDefault tp="action" onClick={handlerRequestModal}>
              <FaSearch />
            </ButtonDefault>
          </Wrapper>
        </FieldSet>
        <Wrapper w="100%" margin="5px">
          <Input
            w="50%"
            marginright
            placeholder="DESCRIÇÃO DA LOCALIDADE"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value.toUpperCase())}
          />
          {id ? (
            <Wrapper>
              <ButtonDefault tp="action" onClick={handlerAtualiza}>
                <FaCheck />
                <span>Atualizar</span>
              </ButtonDefault>
              <ButtonDefault
                tp="warn"
                onClick={() => {
                  setDescricao('');
                  setId('');
                  setSetorId('');
                  setSetor('');
                }}
              >
                <FaEraser />
                <span>Limpar</span>
              </ButtonDefault>
            </Wrapper>
          ) : (
            <ButtonDefault tp="success" onClick={handlerSubmit}>
              <FaCheck />
              <span>Cadastrar</span>
            </ButtonDefault>
          )}
        </Wrapper>
      </Form>
      <CardBlock w="100%" h={localidades.length > 0 ? '47%' : '5%'} overflow="auto">
        {localidades.length > 0 ? (
          <Container direction="column" pad="10px">
            <Input
              placeholder="PESQUISE AQUI PELA LOCALIDADE"
              bgless="true"
              bg="#f2f2f2"
              bgHover="#fff"
              borderless="true"
              onChange={(e) => searchText(e.target.value, 'localidade')}
            />
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
                  <th />
                  <th>CÓDIGO</th>
                  <th>DESCRIÇÃO</th>
                  <th>SETOR</th>
                  <th>S/N ATIVO</th>
                </tr>
              </thead>
              <tbody>
                {localidades
                  ? localidades.map((localidade) => (
                      <tr key={localidade.id} onClick={e => handlerSetLocalidade(localidade)}>
                        <td width="45px">{localidade.id}</td>
                        <td width="1200px">{localidade.descricao}</td>
                        <td width="1200px">
                            {localidade.setor.descricao}
                          </td>
                        <td width="45px">{localidade.ativo ? 'SIM' : 'NÃO'}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </Container>
        ) : null}
      </CardBlock>
      {handlerModal ? (
        <Modal onHandler={handlerRequestModal} size="90%" h="true">
          <Container w="100%" direction="column" h="100%">
            <h1>SETORES</h1>
            <br />
            <Input
              placeholder="PESQUISE AQUI PELO SETOR"
              bgless="true"
              bg="#f2f2f2"
              bgHover="#fff"
              borderless="true"
              onChange={(e) => searchText(e.target.value, 'unidade')}
            />
            <CardBlock w="100%" overflow="auto">
              <Container direction="column" w="100%">
                <Table
                  upper="uppercase"
                  titleAlign="left"
                  textAlign="left"
                  fontSize="16px"
                  lastRowAlign="left"
                >
                  <thead>
                    <tr>
                      <th />
                      <th>CÓDIGO</th>
                      <th>SETOR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {setores
                      ? setores.map((setor) => (
                          <tr key={setor.id}>
                          <td>
                            <ButtonDefault
                              tp="success"
                              size="small"
                              margin="0px"
                              onClick={(e) => handlerSet(setor)}
                            >
                              <FaCheck />
                            </ButtonDefault>
                            </td>
                          <td>{setor.id}</td>
                          <td>{setor.descricao}</td>
                        </tr>
                        ))
                      : null}
                  </tbody>
                </Table>
              </Container>
            </CardBlock>
          </Container>
        </Modal>
      ) : null}
    </Container>
  );
}
