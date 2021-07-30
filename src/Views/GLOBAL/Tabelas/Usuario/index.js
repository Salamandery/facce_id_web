import React, { useState, useCallback, useEffect } from 'react';
import {
  FaCheck,
  FaPen,
  FaSyncAlt,
  FaSearch,
  FaCog,
  FaRedoAlt,
  FaTrash,
} from 'react-icons/fa';
import MessageHandling from '../../../../Util/MessageHandling';
import { MaskRG, MaskCPF } from '../../../../Util/FormatMask';
import Modal from '../../../../Components/ModalController';
import axios from '../../../../Services/api';
import {
  CardBlock,
  Container,
  Form,
  Input,
  Table,
  Select,
  MaskInput,
  Wrapper,
  ButtonDefault,
  FieldSet,
} from '../../../../Style';
export default function Usuarios() {
  const [handlerModalUsuario, setHandlerModalUsuario] = useState(false);
  const [handlerModalUsuarioPapel, setHandlerModalUsuarioPapel] = useState(
    false
  );
  const [handlerModalUsuarioEmpresa, setHandlerModalUsuarioEmpresa] = useState(
    false
  );
  const [id, setId] = useState('');
  const [login, setLogin] = useState('');
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const [tp_documento, setTpDocumento] = useState('');
  const [tp_usuario, setTpUsuario] = useState(0);
  const [documentoMask, setDocumentoMask] = useState(MaskCPF);
  const [ativo, setAtivo] = useState(true);
  const [provedor, setProvedor] = useState(true);
  const [papel_id, setPapelId] = useState(0);
  const [empresa_id, setEmpresaId] = useState(0);
  const [ordem, setOrdem] = useState('');
  const [papeis, setPapeis] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioempresas, setUsuarioEmpresas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [UsuarioPapel, setUsuarioPapel] = useState([]);
  const [Usuariobase, setUsuarioBase] = useState([]);
  const [base, setBase] = useState([]);

  const handlerUsuarioEmpresa = useCallback(async () => {
    try {
      const res = await axios.post('/usuarioempresas', {
        usuario_id: id,
        empresa_id: empresa_id,
      });

      if (MessageHandling(res, true)) {
        setHandlerModalUsuarioEmpresa(false);
      }
    } catch (err) {
      console.tron.log(err);
    }
  }, [id, empresa_id]);

  const handlerPapelUsuario = useCallback(async () => {
    try {
      const res = await axios.post('/usuariopapeis', {
        papel_id,
        usuario_id: id,
      });

      if (MessageHandling(res, true)) {
        setHandlerModalUsuarioPapel(false);
      }
    } catch (err) {
      console.tron.log(err);
    }
  }, [id, papel_id]);

  const handlerSubmit = useCallback(async () => {
    try {
      const res = await axios.post('/usuario', {
        nome,
        tp_documento,
        genero,
        documento,
        login: login.toLowerCase(),
        email: email.toLowerCase(),
        password: '123456',
        ativo,
        provedor,
      });

      if (MessageHandling(res, true)) {
        setId(res.data.data.id);
      }
    } catch (err) {
      console.tron.log(err);
    }
  }, [nome, tp_documento, genero, documento, login, email, ativo, provedor]);

  const handlerResetPassword = useCallback(async () => {
    try {
      const res = await axios.put(`/usuario/${id}/resetpassword`, {
        password: '123456',
        confirmPassword: '123456',
      });

      MessageHandling(res, true);
    } catch (err) {
      console.tron.log(err);
    }
  }, [id]);

  const handlerUpdate = useCallback(async () => {
    try {
      const res = await axios.put(`/usuario/${id}`, {
        nome,
        tp_documento,
        genero,
        documento,
        login: login.toLowerCase(),
        email: email.toLowerCase(),
        ativo,
        provedor,
      });

      MessageHandling(res, true);
    } catch (err) {
      console.tron.log(err);
    }
  }, [
    id,
    nome,
    tp_documento,
    genero,
    documento,
    login,
    email,
    ativo,
    provedor,
  ]);

  const typeSearch = useCallback(
    (type, text) => {
      let filteredName, items;
      switch (type) {
        case 'usuario':
          items = usuarios;
          filteredName = items.filter((item) => {
            return item.nome.toLowerCase().match(text);
          });

          if (!text || text === '') {
            setUsuarios(Usuariobase);
          } else if (!Array.isArray(filteredName) && !filteredName.length) {
            setUsuarios(filteredName);
          } else if (Array.isArray(filteredName)) {
            setUsuarios(filteredName);
          }
          break;
        default:
          items = UsuarioPapel;
          filteredName = items.filter((item) => {
            return item.papel.descricao.toLowerCase().match(text);
          });

          if (!text || text === '') {
            setUsuarioPapel(base);
          } else if (!Array.isArray(filteredName) && !filteredName.length) {
            setUsuarioPapel(filteredName);
          } else if (Array.isArray(filteredName)) {
            setUsuarioPapel(filteredName);
          }
          break;
      }
    },
    [usuarios, Usuariobase, UsuarioPapel, base]
  );

  const searchText = useCallback(
    (e, type) => {
      const text = e.toLowerCase();
      typeSearch(type, text);
    },
    [typeSearch]
  );

  const LoadPapeis = useCallback(async () => {
    try {
      const res = await axios.get('/papeis');

      if (MessageHandling(res)) {
        setPapeis(res.data.data);
      }
    } catch (err) {
      console.tron.log(err);
    }
  }, []);

  const LoadCompany = useCallback(async () => {
    try {
      const res = await axios.get('/companies');

      if (MessageHandling(res)) {
        setEmpresas(res.data.data);
      }
    } catch (err) {
      console.tron.log(err);
    }
  }, []);

  const LoadUsuarios = useCallback(async () => {
    try {
      const res = await axios.get('/usuario');

      if (MessageHandling(res)) {
        setUsuarios(res.data.data);
        setUsuarioBase(res.data.data);
      }
    } catch (err) {
      console.tron.log(err);
    }
  }, []);

  const handlerSet = useCallback((data) => {
    setId(data.id);
    setAtivo(data.ativo || false);
    setProvedor(data.provedor || false);
    setNome(data.nome);
    setLogin(data.login);
    setGenero(data.genero);
    setTpUsuario(data.tp_usuario || 0);
    setTpDocumento(data.tp_documento || 'CPF');
    setDocumento(data.documento || '');
    setEmail(data.email);

    setHandlerModalUsuario(false);
  }, []);

  const handlerRequestModalUsuarioPapel = useCallback(() => {
    setHandlerModalUsuarioPapel(!handlerModalUsuarioPapel);
  }, [handlerModalUsuarioPapel]);

  const handlerRequestModalUsuario = useCallback(() => {
    setHandlerModalUsuario(!handlerModalUsuario);
  }, [handlerModalUsuario]);

  const handlerRequestModalUsuarioEmpresa = useCallback(() => {
    setHandlerModalUsuarioEmpresa(!handlerModalUsuarioEmpresa);
  }, [handlerModalUsuarioEmpresa]);

  useEffect(() => {
    LoadPapeis();
    LoadUsuarios();
    LoadCompany();
  }, [LoadCompany, LoadUsuarios, LoadPapeis]);

  useEffect(() => {
    async function LoadPapelUsuario() {
      try {
        const res = await axios.get(`/usuariopapeis/${id}`);

        if (MessageHandling(res)) {
          setUsuarioPapel(res.data.data);
          setBase(res.data.data);
        }
      } catch (err) {
        console.tron.log(err);
      }
    }
    LoadPapelUsuario();
  }, [id]);

  useEffect(() => {
    async function LoadEmpresaUsuario() {
      try {
        const res = await axios.get(`/usuarioempresas/${login}`);

        if (MessageHandling(res)) {
          setUsuarioEmpresas(res.data.data);
        }
      } catch (err) {
        console.tron.log(err);
      }
    }
    LoadEmpresaUsuario();
  }, [id]);

  return (
    <Container w="100%" direction="column">
      <Form w="100%" direction="column">
        <FieldSet>
          <legend>Dados Gerais</legend>
          <Wrapper w="100%" margin="5px">
            <Input
              placeholder="LOGIN"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <ButtonDefault
              tp="action"
              size="md"
              onClick={handlerRequestModalUsuario}
            >
              <FaSearch />
            </ButtonDefault>
            <Select
              marginright
              value={genero}
              onChange={(e) => setGenero(e.target.value.toUpperCase())}
            >
              <option value={0}>GENERO</option>
              <option value="M">MASCULINO</option>
              <option value="F">FEMININO</option>
            </Select>
            <Select
              value={tp_usuario}
              onChange={(e) => setTpUsuario(e.target.value.toUpperCase())}
            >
              <option value={0}>TIPO</option>
              <option value="U">USUÁRIO COMUM</option>
              <option value="A">ADMINISTRADOR</option>
            </Select>
            <Wrapper pad="0px 15px">
              <Input
                marginright
                type="checkbox"
                checked={ativo}
                onChange={(e) => setAtivo(e.target.checked)}
              />
              <span>Ativo ?</span>
            </Wrapper>
            <Wrapper>
              <Input
                marginright
                type="checkbox"
                checked={provedor}
                onChange={(e) => setProvedor(e.target.checked)}
              />
              <span>É provedor ?</span>
            </Wrapper>
          </Wrapper>
          <Wrapper w="100%" margin="5px">
            <Input
              w="45%"
              marginright
              placeholder="NOME COMPLETO"
              value={nome}
              onChange={(e) => setNome(e.target.value.toUpperCase())}
            />
            <Select
              marginright
              value={tp_documento}
              onChange={(e) => {
                setDocumento('');
                if (e.target.value === 'CPF') {
                  setDocumentoMask(MaskCPF);
                } else {
                  setDocumentoMask(MaskRG);
                }
                setTpDocumento(e.target.value);
              }}
            >
              <option value="CPF">CPF</option>
              <option value="RG">RG</option>
            </Select>
            <MaskInput
              marginright="true"
              placeholder="DOCUMENTO"
              value={documento}
              onChange={(e) => {
                setDocumento(e.target.value.toUpperCase());
              }}
              mask={documentoMask}
            />
          </Wrapper>
          <Wrapper w="100%" margin="5px">
            <Input
              w="45%"
              placeholder="E-MAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value.toUpperCase())}
            />
            {id ? (
              <ButtonDefault tp="action" onClick={handlerUpdate}>
                <FaSyncAlt />
                <span>ATUALIZAR</span>
              </ButtonDefault>
            ) : (
              <ButtonDefault tp="success" onClick={handlerSubmit}>
                <FaCheck />
                <span>CADASTRAR</span>
              </ButtonDefault>
            )}
            <ButtonDefault
              tp={id ? 'action' : 'default'}
              onClick={id ? handlerResetPassword : () => {}}
            >
              <FaRedoAlt />
              <span>RESETAR SENHA</span>
            </ButtonDefault>
            {id ? (
              <ButtonDefault
                tp="action"
                onClick={handlerRequestModalUsuarioPapel}
              >
                <FaCog />
                <span>PERMISSÕES</span>
              </ButtonDefault>
            ) : (
              <ButtonDefault tp="default">
                <FaCog />
                <span>PERMISSÕES</span>
              </ButtonDefault>
            )}
            {id ? (
              <ButtonDefault
                tp="action"
                onClick={handlerRequestModalUsuarioEmpresa}
              >
                <FaCog />
                <span>ACESSOS</span>
              </ButtonDefault>
            ) : (
              <ButtonDefault tp="default">
                <FaCog />
                <span>ACESSOS</span>
              </ButtonDefault>
            )}
          </Wrapper>
        </FieldSet>
      </Form>
      {handlerModalUsuarioPapel ? (
        <Modal onHandler={handlerRequestModalUsuarioPapel} size="90%" h="true">
          <Container w="100%" direction="column" h="100%">
            <h1>Permissões do usuário</h1>
            <br />
            <Wrapper w="100%">
              <Select
                marginright="true"
                defaultValue={papel_id}
                onChange={(e) => setPapelId(e.target.value)}
              >
                <option value={0}>Selecione um papel</option>
                {papeis.map((papel) => (
                  <option key={papel.id} value={papel.id}>
                    {papel.descricao}
                  </option>
                ))}
              </Select>
              <Input
                type="number"
                value={ordem}
                onChange={(e) => setOrdem(e.target.value)}
                placeholder="ORDEM DO PAPEL"
              />
              <ButtonDefault
                size="md"
                tp="success"
                onClick={handlerPapelUsuario}
              >
                <FaCheck />
                <span>Confirmar</span>
              </ButtonDefault>
            </Wrapper>
            <Input
              placeholder="PESQUISE AQUI PELO NOME DO PAPEL"
              onChange={(e) => searchText(e.target.value, 'papel')}
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
                      <th>Usuário</th>
                      <th>Cód</th>
                      <th>Papel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {UsuarioPapel
                      ? UsuarioPapel.map((usuarioPapel) => (
                          <tr key={usuarioPapel.id}>
                            <td width="45px">{usuarioPapel.usuario.id}</td>
                            <td width="1200px">{usuarioPapel.usuario.login}</td>
                            <td width="45px">{usuarioPapel.papel.id}</td>
                            <td width="1200px">
                              {usuarioPapel.papel.descricao}
                            </td>
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
      {handlerModalUsuario ? (
        <Modal onHandler={handlerRequestModalUsuario} size="90%" h="true">
          <Container w="100%" direction="column" h="100%">
            <h1>Lista de usuários</h1>
            <br />
            <Input
              placeholder="PESQUISE AQUI PELO NOME DO USUÁRIO"
              onChange={(e) => searchText(e.target.value, 'usuario')}
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
                      <th></th>
                      <th>Cód</th>
                      <th>Login</th>
                      <th>Nome</th>
                      <th>Ativo ?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios
                      ? usuarios.map((usuario) => (
                          <tr key={usuario.id}>
                            <td width="40px">
                              <ButtonDefault
                                tp="success"
                                size="small"
                                margin="0px 5px"
                                onClick={(e) => handlerSet(usuario)}
                              >
                                <FaPen />
                              </ButtonDefault>
                            </td>
                            <td width="45px">{usuario.id}</td>
                            <td width="500px">{usuario.login}</td>
                            <td width="1200px">{usuario.nome}</td>
                            <td width="45px">
                              {usuario.ativo ? 'SIM' : 'NÃO'}
                            </td>
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
      {handlerModalUsuarioEmpresa ? (
        <Modal
          onHandler={handlerRequestModalUsuarioEmpresa}
          size="90%"
          h="true"
        >
          <Container w="100%" direction="column" h="100%">
            <h1>Acessos Liberados</h1>
            <br />
            <Wrapper w="100%">
              <Select
                marginright="true"
                defaultValue={empresa_id}
                onChange={(e) => setEmpresaId(e.target.value)}
              >
                <option value={0}>Selecione a empresa</option>
                {empresas.map((empresa) => (
                  <option key={empresa.id} value={empresa.id}>
                    {empresa.descricao}
                  </option>
                ))}
              </Select>
              <ButtonDefault
                size="md"
                tp="success"
                onClick={handlerUsuarioEmpresa}
              >
                <FaCheck />
                <span>Confirmar</span>
              </ButtonDefault>
            </Wrapper>
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
                      <th></th>
                      <th>Cód</th>
                      <th>Empresa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarioempresas
                      ? usuarioempresas.map((usuarioempresa) => (
                          <tr key={usuarioempresa.id}>
                            <td width="40px">
                              <ButtonDefault
                                tp="warn"
                                size="small"
                                margin="0px 5px"
                              >
                                <FaTrash />
                              </ButtonDefault>
                            </td>
                            <td width="45px">{usuarioempresa.empresa.id}</td>
                            <td width="500px">
                              {usuarioempresa.empresa.descricao}
                            </td>
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
