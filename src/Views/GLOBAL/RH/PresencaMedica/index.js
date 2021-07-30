import React, { useCallback, useEffect, useState } from 'react';
import MessageHandling from '../../../../Util/MessageHandling';
import { useSelector } from "react-redux";
import axios from '../../../../Services/api';
import { FaCalendar, FaCheck, FaPen, FaSearch, FaUserClock, FaUserPlus } from 'react-icons/fa';
import { ButtonDefault, CardBlock, Container, Wrapper, FieldSet, Input, MaskInput, Table } from '../../../../Style';
import Modal from '../../../../Components/ModalController';
import { MaskCPF, MaskRG, MaskCNS } from '../../../../Util/FormatMask';
import CalendarSchendule from '../../../../Components/CalendarSchendule';

const PresencaMedica = () => {
  const selectedDay = useSelector((state) => state.calendar.day);
  const selectedMonth = useSelector((state) => state.calendar.month);
  const selectedYear = useSelector((state) => state.calendar.year);
  const [handlerModo, setHandlerModo] = useState(false);
  const [handlerModalSearchMV, setHandlerModalSearchMV] = useState(false);
  const [handlerModalPrestadorDia, setHandlerModalPrestadorDia] = useState(false);
  const [nm, setNm] = useState('');
  const [emp, setEmp] = useState('4');
  const [tip, setTip] = useState('8');
  const [nome, setNome] = useState('');
  const [prestador, setPrestador] = useState('');
  const [rg, setRG] = useState('');
  const [cpf, setCPF] = useState('');
  const [cns, setCNS] = useState('');
  const [conselho, setConselho] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [cd_prestador, setCdPrestador] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [data, setData] = useState([]);
  const [prestadoresMv, setPrestadoresMv] = useState([]);

  const handlerInsertPresta = useCallback(async () => {
    try {
      const res = await axios.post('/post_prestadores', {
        nome: nome.toUpperCase(),
        cpf,
        rg,
        especialidade: especialidade.toUpperCase(),
        cd_prestador: cd_prestador === '' ? null : cd_prestador,
        conselho,
        nascimento: nascimento === '' ? null : nascimento
      });

      MessageHandling(res, true);
    } catch (err) {
      console.log(err);
    }
  }, [nome, rg, cpf, especialidade, conselho, cd_prestador, nascimento]);

  const getEscalaPresta = useCallback(async () => {
    try {
      const res = await axios.get(`/select_escala_prestadores/${selectedDay}/${selectedMonth}/${selectedYear}`);
      if (res.data.data !== undefined) {
        setData(res.data.data.rows);
      } else {
        setData([])
      }
    } catch (err) {
      console.log(err);
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  const handlerInsertEscalaPresta = useCallback(async () => {
    try {
      const res = await axios.post(`/post_escala_prestadores/`, {
        dia: selectedDay,
        mes: selectedMonth,
        ano: selectedYear,
        cd_prestador,
        nome,
        conselho: conselho === '' ? null : conselho,
        cns: cns === '' ? null : cns,
        cpf: cpf === '' ? null : cpf
      });

      if (MessageHandling(res, true)) {
        getEscalaPresta();
        setHandlerModalPrestadorDia(!handlerModalPrestadorDia);
      }
    } catch (err) {
      console.log(err);
    }
  }, [selectedYear, selectedMonth, selectedDay, nome, cd_prestador, conselho, cpf, cns]);

  const getPrestadoresMv = useCallback(async () => {
    const rest = await axios.get(`/select_presta/${nm.toUpperCase()}/${emp}/${tip}`);

    if (!rest.data.msg) {
      setPrestadoresMv(rest.data.data.rows);
    } else {
      setPrestadoresMv([]);
    }
  }, [nm, tip, emp]);

  const handlerRequestModalSearchMV = useCallback(() => {
    setCdPrestador('');
    setNome('');
    setPrestador('');
    setHandlerModalSearchMV(!handlerModalSearchMV);
  }, [handlerModalSearchMV]);

  const handlerSetPrestadorMv = useCallback((item) => {
    setCdPrestador(item.COD);
    setNome(item.NOME);
    setPrestador(`${item.COD} - ${item.NOME}`);
    setConselho(item.CONSELHO);
    setCPF(item.CPF);
    setCNS(item.CNS);
    setHandlerModalSearchMV(false);
  }, [handlerModalSearchMV]);

  useEffect(() => {
    getEscalaPresta();
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <Container w="100%" direction="column">
      {handlerModo ? (
        <Wrapper w="100%">
          <Container w="100%" pad="10px" content="space-between">
            <h1>CADASTRO - PRESTADOR</h1>
            <ButtonDefault
              tp="action"
              onClick={() => setHandlerModo(!handlerModo)}
            >
              <FaCalendar />
              <span>CONSULTAR AGENDA</span>
            </ButtonDefault>
          </Container>
          <CardBlock w="100%">
            <FieldSet border w="100%">
              <legend>INFORMAÇÕES DO PRESTADOR</legend>
              <Wrapper>
                <Input
                  placeholder="CÓD DO PRESTADOR"
                  marginright="true"
                  w="10.7%"
                  value={cd_prestador}
                  onChange={(e) => setCdPrestador(e.target.value)}
                  disabled={true}
                />
                <Input
                  placeholder="NOME DO PRESTADOR"
                  w="68%"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <ButtonDefault
                  tp="action"
                  onClick={() => setHandlerModalSearchMV(!handlerModalSearchMV)}
                >
                  <FaSearch />
                </ButtonDefault>
              </Wrapper>
              <Wrapper>
                <MaskInput
                  marginright="true"
                  placeholder="CPF"
                  w="15%"
                  mask={MaskCPF}
                  value={cpf}
                  onChange={(e) => setCPF(e.target.value)}
                />
                <MaskInput
                  marginright="true"
                  placeholder="RG"
                  w="15%"
                  mask={MaskRG}
                  value={rg}
                  onChange={(e) => setRG(e.target.value)}
                />
                <MaskInput
                  marginright="true"
                  placeholder="CNS"
                  w="15%"
                  mask={MaskCNS}
                  value={cns}
                  onChange={(e) => setCNS(e.target.value)}
                />
                <Input
                  marginright="true"
                  placeholder="CONSELHO"
                  w="15%"
                  value={conselho}
                  onChange={(e) => setConselho(e.target.value)}
                />
                <Input
                  marginright="true"
                  placeholder="ESPECIALIDADE"
                  w="20%"
                  value={especialidade}
                  onChange={(e) => setEspecialidade(e.target.value)}
                />
              </Wrapper>
              <ButtonDefault
                tp="success"
                onClick={handlerInsertPresta}
              >
                <FaCheck />
                <span>Confirmar</span>
              </ButtonDefault>
            </FieldSet>
          </CardBlock>
          {handlerModalSearchMV ? (
            <Modal onHandler={handlerRequestModalSearchMV} size="90%" h="true">
              <Container w="100%" direction="column" h="100%">
                <h1>Prestadores Integrados</h1>
                <br />
                <Wrapper>
                  <Input
                    placeholder="PESQUISE PELO NOME DO PRESTADOR"
                    bgless="true"
                    bg="#f2f2f2"
                    bgHover="#fff"
                    borderless="true"
                    value={nm}
                    onChange={(e) => setNm(e.target.value)}
                  />
                  <ButtonDefault
                    tp="success"
                    onClick={getPrestadoresMv}
                  >
                    <FaSearch />
                    <span>PESQUISAR</span>
                  </ButtonDefault>
                </Wrapper>
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
                          <th>NOME</th>
                          <th>CONSELHO</th>
                          <th>CPF</th>
                          <th>CNS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prestadoresMv
                          ? prestadoresMv.map((item) => (
                              <tr key={item.COD}>
                                <td>
                                  <ButtonDefault
                                    tp="success"
                                    size="small"
                                    onClick={(e) => handlerSetPrestadorMv(item)}
                                  >
                                    <FaCheck />
                                  </ButtonDefault>
                                </td>
                                <td>{item.NOME}</td>
                                <td>{item.CONSELHO}</td>
                                <td>{item.CPF}</td>
                                <td>{item.CNS}</td>
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
        </Wrapper>
      ): (
        <Wrapper w="100%">
          <Container w="100%" pad="10px" content="space-between">
            <h1>AGENDA - PRESTADOR</h1>
            <Wrapper>
              <ButtonDefault
                tp="warn"
                onClick={() => setHandlerModalPrestadorDia(!handlerModalPrestadorDia)}
              >
                <FaUserClock />
                <span>PRESTADOR X DIA</span>
              </ButtonDefault>
              <ButtonDefault
                tp="action"
                onClick={() => setHandlerModo(!handlerModo)}
              >
                <FaUserPlus />
                <span>CADASTRAR PRESTADOR</span>
              </ButtonDefault>
            </Wrapper>
          </Container>
          <CalendarSchendule data={data} noSchendule={true} />
          {
            handlerModalPrestadorDia ? (
              <Modal onHandler={() => setHandlerModalPrestadorDia(false)} size="90%" h="true">
                <Container w="100%" direction="column" h="100%">
                  <h1>Marcação de prestador x Dia</h1>
                  <br />
                  <FieldSet>
                    <legend>PRESTADOR</legend>
                    <Wrapper w="100%">
                      <Input
                        placeholder="PRESTADOR"
                        w="80%"
                        value={prestador}
                        onChange={(e) => setPrestador(e.target.value)}
                        disabled={true}
                      />
                      <ButtonDefault
                        tp="action"
                        onClick={() => {setHandlerModalSearchMV(!handlerModalSearchMV)}}
                      >
                        <FaSearch />
                      </ButtonDefault>
                    </Wrapper>
                  </FieldSet>
                  <FieldSet>
                    <legend>INFORMAÇÃO</legend>
                    <Wrapper w="100%">
                      <Container direction="column">
                        <span>DIA:</span>
                        <Input
                          marginright="true"
                          placeholder="DIA"
                          value={selectedDay}
                        />
                      </Container>
                      <Container direction="column">
                        <span>MÊS:</span>
                        <Input
                          marginright="true"
                          placeholder="MÊS"
                          value={selectedMonth}
                        />
                      </Container>
                      <Container direction="column">
                        <span>ANO:</span>
                        <Input
                          marginright="true"
                          placeholder="MÊS"
                          value={selectedYear}
                        />
                      </Container>
                    </Wrapper>
                  </FieldSet>
                  <Wrapper>
                    <ButtonDefault
                      tp="success"
                      onClick={handlerInsertEscalaPresta}
                    >
                      <FaCheck />
                      <span>CONFIRMAR</span>
                    </ButtonDefault>
                  </Wrapper>
                </Container>
              </Modal>
            ) : null
          }
        </Wrapper>
      )}
    </Container>
  );
}

export default PresencaMedica;
