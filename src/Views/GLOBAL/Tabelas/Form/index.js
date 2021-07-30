import React, { useEffect, useState, useCallback } from 'react';
import { FaCheck, FaCog } from 'react-icons/fa';
import api from '../../../../Services/api';
import MessageHandling from '../../../../Util/MessageHandling';
import Modal from '../../../../Components/ModalController';
import {
  Container,
  Table,
  CardBlock,
  ButtonDefault,
  Form,
  Wrapper,
  Input,
  Select,
} from '../../../../Style';

export default function Formulario() {
  const [handlerModal, setHandlerModal] = useState(false);
  const [cd_form, setCdForm] = useState('');
  const [ds_form, setDs] = useState('');
  const [modulo_id, setModuloId] = useState(0);
  const [label, setLabel] = useState('');
  const [form_pai, setFormPai] = useState('');
  const [sn_ativo, setSN] = useState(true);
  const [sub_form, setSubForm] = useState(false);
  const [ordem, setOrdem] = useState('');
  const [chave, setChave] = useState('');
  const [path, setPath] = useState('');
  const [forms, setForms] = useState([]);
  const [modForms, setModForms] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [base, setBase] = useState([]);

  const LoadForm = useCallback(async() => {
    try {
      const res = await api.get(`/forms`);
      if (MessageHandling(res)) {
        setForms(state => res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const LoadModForm = useCallback(async() => {
    try {
      const res = await api.get(`/modulosform/${cd_form}`);
      if (MessageHandling(res)) {
        setModForms(state => res.data.data);
        setBase(state => res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [cd_form]);

  const LoadModulos = useCallback(async() => {
    try {
      const res = await api.get(`/modulos`);
      if (MessageHandling(res)) {
        setModulos(state => res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSet = useCallback((item) => {
    setSN(item.ativo || true);
    setCdForm(item.id || '');
    setDs(item.descricao || '');
    setOrdem(item.ordem || '');
    setChave(item.chave || '');
    setPath(item.path || '');
    setLabel(item.label || '');
    setSubForm(item.sub_form || false);
    setFormPai(item.form_pai || '');
  }, []);

  const handlerInsert = useCallback(async () => {
    try {
      const res = await api.post(`/forms`, {
        descricao: ds_form.toUpperCase(),
        path,
        chave: chave.toUpperCase(),
        label,
        ativo: sn_ativo,
        sub_form,
        form_pai,
      });

      if (MessageHandling(res, true)) {
        setTimeout(() => {
          setForms([...forms, {
            id: res.data.data.id,
            path,
            chave,
            descricao: ds_form,
            label,
            ativo: sn_ativo,
            sub_form,
            form_pai,
          }]);

          setCdForm('');
          setDs('');
          setPath('');
          setChave('');
          setLabel('');
          setFormPai('');
          setSubForm(false);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  }, [forms, ds_form, path, sn_ativo, ordem, label, chave, form_pai, sub_form]);

  const handlerInsertModForm = useCallback(async () => {
    try {
      const res = await api.post(`/modulosform`, {
        modulo_id,
        form_id: cd_form,
        ordem,
      });

      if (MessageHandling(res, true)) {
        setTimeout(() => {
          LoadModForm();
          setOrdem('');
        }, 1000);
      }

      setHandlerModal(false);
    } catch (err) {
      console.log(err);
    }
  }, [modulo_id, cd_form, ordem, LoadModForm]);

  const handlerUpdate = useCallback(async() => {
    try {
      const res = await api.put(`/forms/${cd_form}`, {
        descricao: ds_form.toUpperCase(),
        path,
        chave: chave.toUpperCase(),
        label,
        ativo: sn_ativo,
        sub_form,
        form_pai,
      });

      if (MessageHandling(res, true)) {
        setTimeout(() => {
          forms.map(form => {
            if (form.id === cd_form) {
              form.path = path;
              form.descricao = ds_form.toUpperCase();
              form.chave = chave.toUpperCase();
              form.ativo = sn_ativo;
              form.label = label.toUpperCase();
              form.sub_form = sub_form;
              form.form_pai = form_pai;
            }
          });
          setCdForm('');
          setDs('');
          setPath('');
          setChave('');
          setLabel('');
          setFormPai('');
          setSubForm(false);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  }, [forms, cd_form, ds_form, path, chave, label, sn_ativo, form_pai, sub_form]);

  const typeSearch = useCallback((type, text) => {
    const items = modForms;
    let filteredName;
    switch (type) {
      default:
        filteredName = items.filter((item) => {
          return item.form.descricao.toLowerCase().match(text);
        });
        break;
    }

    if (!text || text === '') {
      setModForms(base);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      setModForms(filteredName);
    } else if (Array.isArray(filteredName)) {
      setModForms(filteredName);
    }
  }, [modForms, base]);

  const searchText = useCallback((e) => {
    const text = e.toLowerCase();
    typeSearch('', text);
  }, [typeSearch]);

  const handlerRequestModal = useCallback(() => {
    setHandlerModal(!handlerModal);
    LoadModForm();
    LoadModulos();
  }, [LoadModForm, handlerModal, LoadModulos]);

  useEffect(() => {
    LoadForm();
  }, [LoadForm]);

  return (
      <Container direction="column" w="100%" h="100%">
        <Form w="100%" direction="column">
          <Wrapper w="100%" margin="5px">
            <Wrapper w="100%">
              <Input
                disabled
                marginright="true"
                w="10%"
                placeholder="CÓDIGO"
                value={cd_form}
                onChange={(e) => setCdForm(e.target.value)}
              />
              <Wrapper>
                <Input
                  type="checkbox"
                  marginright="true"
                  checked={sn_ativo}
                  onChange={(e) => setSN(e.target.checked)}
                />
                <span>Ativo ?</span>
              </Wrapper>
              <Wrapper margin="0 5px">
                <Input
                  type="checkbox"
                  marginright="true"
                  checked={sub_form}
                  onChange={e=>setSubForm(e.target.checked)}
                />
                <span>É um formulário filho ?</span>
              </Wrapper>
            </Wrapper>
            <Wrapper w="100%">
              <Input
                marginright="true"
                w="10%"
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
              <Input
                marginright="true"
                w="11%"
                placeholder="LABEL"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </Wrapper>
            <Wrapper w="55%">
              <Input
                marginright="true"
                w="53%"
                placeholder="DESCRIÇÃO"
                value={ds_form}
                onChange={(e) => setDs(e.target.value)}
              />
              <Input
                disabled={sub_form ? false : true}
                w="45%"
                placeholder="CHAVE DO FORMULÁRIO PAI"
                value={form_pai}
                onChange={(e) => setFormPai(e.target.value)}
              />
            </Wrapper>
            {cd_form ? (
              <ButtonDefault tp="action" onClick={handlerUpdate}>
                <FaCheck />
                <span>Atualizar</span>
              </ButtonDefault>
            ) : (
              <ButtonDefault tp="success" onClick={handlerInsert}>
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
        <CardBlock w="100%" h="65%" overflow="auto">
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
                <th>CHAVE</th>
                <th>DESCRIÇÃO</th>
                <th>S/N ATIVO</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((srv) => (
                <tr key={srv.id} onClick={(e) => handleSet(srv)}>
                  <td width="45px">{srv.id}</td>
                  <td width="400px">{srv.chave}</td>
                  <td width="1000px">{srv.descricao}</td>
                  <td width="200px">{srv.ativo ? 'SIM' : 'NÃO'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBlock>
        { handlerModal ? (
        <Modal onHandler={handlerRequestModal} size="90%" h="true">
          <Container w="100%" direction="column" h="100%">
            <h1>Configuração do Módulo</h1>
            <br />
            <Wrapper w="100%">
              <Select marginright="true" defaultValue={modulo_id} onChange={e=> setModuloId(e.target.value)}>
                <option value={0}>Selecione um módulo</option>
                {
                  modulos.map(modulo => (
                    <option key={modulo.id} value={modulo.id}>{modulo.descricao}</option>
                  ))
                }
              </Select>
              <Input
                type="number"
                value={ordem}
                onChange={e=>setOrdem(e.target.value)}
                placeholder="ORDEM DO FORMULÁRIO"
              />
              <ButtonDefault size="md" tp="success" onClick={handlerInsertModForm}>
                <FaCheck />
                <span>Confirmar</span>
              </ButtonDefault>
            </Wrapper>
            <Input
              placeholder="PESQUISE AQUI PELO NOME DO FORMULÁRIO"
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
                      <th>FORMULÁRIO</th>
                      <th>Cód</th>
                      <th>MÓDULO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modForms
                      ? modForms.map((modform) => (
                        <tr key={modform.id}>
                          <td width="45px">{modform.form.id}</td>
                          <td width="1200px">{modform.form.descricao}</td>
                          <td width="45px">{modform.modulo.id}</td>
                          <td width="1200px">{modform.modulo.descricao}</td>
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
