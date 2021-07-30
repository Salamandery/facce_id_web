import React, { useEffect, useState, useCallback } from 'react';
import { FaCheck, FaCog } from 'react-icons/fa';
import MessageHandling from '../../../../Util/MessageHandling';
import api from '../../../../Services/api';
import Modal from '../../../../Components/ModalController';
import {
  Container,
  Table,
  CardBlock,
  ButtonDefault,
  Wrapper,
  Input,
  Form,
  Select
} from '../../../../Style';

export default function Modulo() {
  const [handlerModal, setHandlerModal] = useState(false);
  const [id, setId] = useState('');
  const [papel_id, setPapelId] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [chave, setChave] = useState('');
  const [path, setPath] = useState('');
  const [ordem, setOrdem] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [modulos, setModulos] = useState([]);
  const [papeis, setPapeis] = useState([]);
  const [papelMods, setPapelMod] = useState([]);
  const [base, setBase] = useState([]);

  const LoadPapelMod = useCallback(async() => {
    try {
      const res = await api.get(`/papelmodulos/${id}`);
      if (MessageHandling(res)) {
        setPapelMod(state => res.data.data);
        setBase(state => res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const LoadPapeis = useCallback(async () => {
    try {
      const res = await api.get(`/papeis`);
      if (MessageHandling(res)) {
        setPapeis(state => res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const LoadMod = useCallback(async() => {
    try {
      const res = await api.get(`/modulos`);
      if (MessageHandling(res)) {
        setModulos(state => res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handlerRequestModal = useCallback(() => {
    setHandlerModal(!handlerModal);
    LoadPapelMod();
    LoadPapeis();
  }, [LoadPapelMod, handlerModal, LoadPapeis]);

  const handlerInsert = useCallback(async() => {
    try {
      const res = await api.post(`/modulos`, {
        id,
        path,
        chave,
        descricao,
        ativo,
      });

      if (MessageHandling(res, true)) {
        setTimeout(() => {
          setModulos([...modulos, {
            id: res.data.data.id,
            path,
            chave,
            descricao,
            ativo,
          }]);

          setId('');
          setDescricao('');
          setPath('');
          setChave('');
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  }, [path, descricao, chave, ativo, modulos]);

  const handlerUpdate = useCallback(async () => {
    try {
      const res = await api.put(`/modulos/${id}`, {
        id,
        path,
        chave,
        descricao,
        ativo,
      });

      if (MessageHandling(res, true)) {
        setTimeout(() => {
          modulos.map(modulo => {
            if (modulo.id === res.data.data.id) {
              modulo.path = path;
              modulo.descricao = descricao;
              modulo.chave = chave;
              modulo.ativo = ativo;
            }
            return true;
          })

          setId('');
          setDescricao('');
          setPath('');
          setChave('');
        }, 1000);
      }

    } catch (err) {
      console.log(err);
    }
  }, [id, descricao, path, chave, modulos, ativo]);

  const typeSearch = useCallback((type, text) => {
    const items = papelMods;
    let filteredName;
    switch (type) {
      default:
        filteredName = items.filter((item) => {
          return item.modulo.descricao.toLowerCase().match(text);
        });
        break;
    }

    if (!text || text === '') {
      setPapelMod(base);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      setPapelMod(filteredName);
    } else if (Array.isArray(filteredName)) {
      setPapelMod(filteredName);
    }
  }, [papelMods, base]);

  const searchText = useCallback((e) => {
    const text = e.toLowerCase();
    typeSearch('', text);
  }, [typeSearch]);

  const handlerSet = useCallback((item) => {
    setId(item.id || '');
    setDescricao(item.descricao || '');
    setPath(item.path || '');
    setChave(item.chave || '');
    setOrdem(item.ordem || '');
    setAtivo(item.ativo || false);
  }, [id, descricao, path, chave, ativo]);

  const handlerInsertPapelMod = useCallback(async () => {
    try {
      const res = await api.post(`/papelmodulos`, {
        modulo_id: id,
        papel_id,
        ordem,
      });

      if (MessageHandling(res, true)) {
        setTimeout(() => {
          LoadPapelMod();
          setOrdem('');
        }, 1000);
      }

      setHandlerModal(false);
    } catch (err) {
      console.log(err);
    }
  }, [papel_id, id, ordem, LoadPapelMod]);


  useEffect(() => {
    LoadMod();
  }, [LoadMod]);

  return (
    <Container direction="column" w="100%" h="100%">
      <CardBlock w="100%" h="100%" overflow="auto">
        <Container direction="column" w="100%" h="100%" pad="15px">
          <Form>
            <Wrapper w="100%">
              <Wrapper w="100%">
                <Input
                  disabled
                  marginright="true"
                  w="10%"
                  placeholder="CÓDIGO"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                <Wrapper margin="0 10px">
                  <Input
                    type="checkbox"
                    checked={ativo}
                    marginright="true"
                    onChange={(e) => setAtivo(e.target.checked)}
                  />
                  <span>Ativo ?</span>
                </Wrapper>
                <Input
                  marginright="true"
                  w="17%"
                  placeholder="CHAVE"
                  value={chave}
                  onChange={(e) => setChave(e.target.value)}
                />
                <Input
                  marginright="true"
                  w="20%"
                  placeholder="PATH"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                />
              </Wrapper>
              <Wrapper w="55%">
                <Input
                  marginright="true"
                  w="100%"
                  placeholder="DESCRIÇÃO"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Wrapper>
              {id ? (
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
              <ButtonDefault tp="action" onClick={handlerRequestModal}>
                <FaCog />
                <span>Configurar</span>
              </ButtonDefault>
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
              {modulos.map((srv) => (
                <tr key={srv.id} onClick={(e) => handlerSet(srv)}>
                  <td width="45px">{srv.id}</td>
                  <td width="1200px">{srv.descricao}</td>
                  <td width="200px">{srv.ativo ? 'SIM' : 'NÃO'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </CardBlock>
      { handlerModal ? (
        <Modal onHandler={handlerRequestModal} size="90%" h="true">
          <Container w="100%" direction="column" h="100%">
            <h1>Configuração do Papel</h1>
            <br />
            <Wrapper w="100%">
              <Select marginright="true" defaultValue={papel_id} onChange={e=> setPapelId(e.target.value)}>
                <option value={0}>Selecione um Papel</option>
                {
                  papeis.map(papel => (
                    <option key={papel.id} value={papel.id}>{papel.descricao}</option>
                  ))
                }
              </Select>
              <Input
                type="number"
                value={ordem}
                onChange={e=>setOrdem(e.target.value)}
                placeholder="ORDEM DO MÓDULO"
              />
              <ButtonDefault size="md" tp="success" onClick={handlerInsertPapelMod}>
                <FaCheck />
                <span>Confirmar</span>
              </ButtonDefault>
            </Wrapper>
            <Input
              placeholder="PESQUISE AQUI PELO NOME DO PAPEL"
              onChange={(e) => searchText(e.target.value, 'leito')}
            />
            <CardBlock w="100%" overflow="auto">
              <Container direction="column" w="100%">
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
                      <th>Cód</th>
                      <th>PAPEL</th>
                      <th>Cód</th>
                      <th>MÓDULO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {papelMods
                      ? papelMods.map((papelMod) => (
                        <tr key={papelMod.id}>
                          <td width="45px">{papelMod.papel.id}</td>
                          <td width="1200px">{papelMod.papel.descricao}</td>
                          <td width="45px">{papelMod.modulo.id}</td>
                          <td width="1200px">{papelMod.modulo.descricao}</td>
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
