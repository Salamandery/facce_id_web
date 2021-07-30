import React, { useCallback, useState } from 'react';
import moment from 'moment-timezone';
import XLSX from 'xlsx';
import MessageHandling from '../../../../../Util/MessageHandling';
import api from '../../../../../Services/api';
import filesize from 'filesize';
import {
  FaAngleRight,
  FaSave,
  FaFileExport,
  FaPen,
  FaFileImport,
  FaCheck,
} from 'react-icons/fa';
import {
  Container,
  Form,
  Wrapper,
  ButtonDefault,
  FieldSet,
  Input,
  MaskInput,
  Select,
} from '../../../../../Style';
import Modal from '../../../../../Components/ModalController';
import { Title, ImportFileContainer, Footer } from './styles';

import { MaskCPF, MaskRG } from '../../../../../Util/FormatMask';
import UploadXLS from '../../../../../Components/UploadXLS';
import FileList from '../../../../../Components/FileList';

export default function Teste() {
  const [json, setJson] = useState({});
  const [filename, setFileName] = useState('');
  const [tp, setTp] = useState('02');
  const [nome, setNome] = useState('');
  const [dt_nascimento, setDtNascimento] = useState('');
  const [sg_orgao_emissor, setSgOrgaoEmissor] = useState('');
  const [matricula, setMatricula] = useState('');
  const [cpf, setCPF] = useState('');
  const [rg, setRG] = useState('');
  const [genero, setGenero] = useState(0);
  const [nr_cartao, setNrCartao] = useState('');
  const [vl_uso_diario, setVlUsoDiario] = useState('');
  const [nr_ddd_tel, setNrDDDTel] = useState('');
  const [nr_tel_contato, setNrTelContato] = useState('');
  const [email, setEmail] = useState('');

  const [ver, setVersion] = useState('04.02');
  const [cnpj, setCNPJ] = useState('24006302000488');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [handlerModalExportaExcel, setHandlerModalExportaExcel] = useState(
    false
  );
  const [handlerModalImportaExcel, setHandlerModalImportaExcel] = useState(
    false
  );

  const convertToJson = useCallback((csv) => {
    var lines = csv.split('\n');

    var result = [];

    var headers = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(',');

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    return JSON.stringify(result);
  }, []);

  const readFile = useCallback(
    (filesUploaded) => {
      var f = filesUploaded[0].file;
      var name = f.name;
      setFileName(name);
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        const json = JSON.parse(convertToJson(data));
        setJson(json);
      };
      reader.readAsBinaryString(f);
    },
    [convertToJson]
  );

  const TextFile = useCallback(
    (dt, hora, json) => {
      let seq = '00000';
      let fileEx = `0000101CADUSU04.0224006302000488\n`;
      let count = 0;
      for (var i = 0; i < json.length; i++) {
        let seq = '00000';
        if (i >= 0 && i < 8) {
          seq = `0000${i + 2}`;
        } else if (i >= 8 && i < 98) {
          seq = `000${i + 2}`;
        } else if (i >= 98 && i < 998) {
          seq = `00${i + 2}`;
        } else {
          seq = `0${i + 2}`;
        }
        if (json[i] && json[i].MATRICULA !== '' && json[i].MATRICULA !== ' ') {
          count++;
          let matricula = '';
          let cpfParsed = '';
          let dataParsed = '';
          let sexo = '';
          let identidade = '';
          let orgao = '';
          let ddd = '';
          let contato = '';
          let email = '';
          let vl_diario = '';
          let cartao = '';
          let nomeParsed = '';

          if (json[i].MATRICULA) {
            matricula = json[i].MATRICULA;
          }

          if (tp === '02') {
            if (json[i].CPF) {
              cpfParsed = json[i].CPF.replace('-', '');
            }
            if (json[i].NOME) {
              nomeParsed = json[i].NOME.substr(0, 39);
            }
            if (json[i].NASCIMENTO) {
              dataParsed = json[i].NASCIMENTO.replace('/', '');
              dataParsed = dataParsed.replace('/', '');
            }
            if (json[i].SEXO) {
              sexo = json[i].SEXO;
            }
            if (json[i].IDENTIDADE) {
              identidade = json[i].IDENTIDADE.replace('.', '');
              identidade = identidade.replace('-', '');
            }
            if (json[i].ORGAO) {
              orgao = json[i].ORGAO;
            }
            if (json[i].EMAIL) {
              email = json[i].EMAIL;
            }
            if (json[i].DDD) {
              ddd = json[i].DDD;
            }
            if (json[i].CONTATO) {
              contato = json[i].CONTATO;
            }
            if (json[i].EMAIL) {
              email = json[i].EMAIL;
            }
            if (json[i].VL_USO_DIARIO) {
              vl_diario = json[i].VL_USO_DIARIO;
            }
            if (json[i].CARTAO) {
              cartao = json[i].CARTAO;
            }
            fileEx += `${seq}${tp}${matricula.padEnd(15)}${nomeParsed.padEnd(
              40
            )}${cpfParsed.padEnd(11)}${vl_diario.padEnd(6)}0201${cartao.padEnd(
              13
            )}02${dataParsed.padEnd(8)}${sexo.padEnd(1)}${identidade.padEnd(
              15
            )}${orgao.padEnd(6)}${ddd.padEnd(3)}${contato.padEnd(
              10
            )}${email.padEnd(60)}\n`;
          } else if (tp === '05') {
            fileEx += `${seq}${tp}${matricula.padEnd(15)}\n`;
          }
        }
      }
      if (count >= 0 && count < 8) {
        seq = `0000${count + 2}`;
      } else if (count >= 8 && count < 98) {
        seq = `000${count + 2}`;
      } else if (count >= 98 && count < 998) {
        seq = `00${count + 2}`;
      } else {
        seq = `0${count + 2}`;
      }
      fileEx += `${seq}99`;
      const element = document.createElement('a');
      let file = new Blob([fileEx], {
        type: 'text/plain',
      });
      element.href = URL.createObjectURL(file);
      element.download = `CADUSU_${ver}_${cnpj}_${dt}_${hora}.txt`;
      document.body.appendChild(element);
      element.click();
    },
    [cnpj, ver, tp]
  );

  const handlerExportFile = useCallback(() => {
    const dt = moment(new Date()).format('YYYYMMDD').toString();
    const hora = moment(new Date()).format('hhmm').toString();
    TextFile(dt, hora, json);
  }, [TextFile, json]);

  const handlerImportFile = useCallback(async () => {
    try {
      const res = await api.post('/importriocardcadusu', {
        cadusu: json,
      });

      MessageHandling(res, true);
    } catch (err) {
      console.log(err);
    }
  }, [TextFile, json]);

  const submitFile = useCallback(
    (files) => {
      const filesUploaded = files.map((file) => ({
        file,
        name: file.name,
        readableSize: filesize(file.size),
      }));

      setUploadedFiles(filesUploaded);
      readFile(filesUploaded);
    },
    [readFile]
  );

  const handlerRequestModalExportaExcel = useCallback(() => {
    setHandlerModalExportaExcel(false);
    setUploadedFiles([]);
  }, []);

  const handlerRequestModalImportaExcel = useCallback(() => {
    setHandlerModalImportaExcel(false);
    setUploadedFiles([]);
  }, []);

  return (
    <Container w="100%" direction="column">
      <Form w="100%" direction="column">
        <Wrapper w="100%">
          <FieldSet w="100%">
            <legend>Dados do Funcionário</legend>
            <Wrapper w="100%" margin="5px">
              <Input
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="MATRICULA"
                w="15%"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              />
              <Input
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="NOME DO COLABORADOR"
                w="30%"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Input
                borderless="true"
                bold="true"
                marginright="true"
                type="date"
                placeholder="DATA DE NASCIMENTO"
                value={dt_nascimento}
                onChange={(e) => setDtNascimento(e.target.value)}
                w="15%"
              />
              <Select
                value={genero}
                onChange={(e) => setGenero(e.target.value.toUpperCase())}
              >
                <option value={0}>GENERO</option>
                <option value="M">MASCULINO</option>
                <option value="F">FEMININO</option>
              </Select>
            </Wrapper>
            <Wrapper w="100%" margin="5px">
              <MaskInput
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="RG"
                mask={MaskRG}
                w="10%"
                value={rg}
                onChange={(e) => setRG(e.target.value)}
              />
              <Input
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="ORGÃO EMISSOR"
                w="20%"
                value={sg_orgao_emissor}
                onChange={(e) => setSgOrgaoEmissor(e.target.value)}
              />
              <MaskInput
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="CPF"
                mask={MaskCPF}
                w="10%"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
              />
            </Wrapper>
            <Wrapper w="100%" pad="5px">
              <Input
                type="number"
                maxlength="2"
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="DDD"
                w="10%"
                value={nr_ddd_tel}
                onChange={(e) => setNrDDDTel(e.target.value)}
              />
              <Input
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="TELEFONE DE CONTATO"
                w="20%"
                value={nr_tel_contato}
                onChange={(e) => setNrTelContato(e.target.value)}
              />
              <Input
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="EMAIL"
                w="40%"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Wrapper>
          </FieldSet>
        </Wrapper>
        <Wrapper w="100%">
          <FieldSet w="100%">
            <legend>Informações do cartão</legend>
            <Wrapper w="100%" pad="5px">
              <Input
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="Número do cartão"
                w="30%"
                value={nr_cartao}
                onChange={(e) => setNrCartao(e.target.value)}
              />
              <Input
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="Valor do uso diário"
                w="20%"
                value={vl_uso_diario}
                onChange={(e) => setVlUsoDiario(e.target.value)}
              />
            </Wrapper>
          </FieldSet>
        </Wrapper>
      </Form>
      <Wrapper>
        <ButtonDefault
          tp="success"
          onClick={(e) => setHandlerModalExportaExcel(true)}
        >
          <FaSave />
          <span>CADASTRAR</span>
        </ButtonDefault>
        <ButtonDefault
          tp="action"
          onClick={(e) => {setHandlerModalExportaExcel(true); setTp('02');}}
        >
          <FaFileExport />
          <span>EXPORTAR CADASTRO</span>
        </ButtonDefault>
        <ButtonDefault
          tp="action"
          onClick={(e) => {setHandlerModalExportaExcel(true); setTp('05');}}
        >
          <FaFileExport />
          <span>EXPORTAR EXCLUSÃO</span>
        </ButtonDefault>
        <ButtonDefault
          tp="action"
          onClick={(e) => setHandlerModalImportaExcel(true)}
        >
          <FaFileImport />
          <span>IMPORTAR</span>
        </ButtonDefault>
      </Wrapper>
      {handlerModalExportaExcel ? (
        <Modal onHandler={handlerRequestModalExportaExcel} size="70%" h="true">
          <Container w="100%" direction="column" h="100%">
            <Wrapper w="100%" content="center">
              <ImportFileContainer>
                <Title>Exportação</Title>
                <UploadXLS onUpload={submitFile} />
                {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
                <Footer>
                  <p>
                    <FaAngleRight />
                    Permitido apenas arquivos xls, xlsx e csv.
                  </p>
                  <ButtonDefault tp="warn" onClick={handlerExportFile}>
                    <FaCheck />
                    <span>GERAR</span>
                  </ButtonDefault>
                </Footer>
              </ImportFileContainer>
            </Wrapper>
          </Container>
        </Modal>
      ) : null}
      {handlerModalImportaExcel ? (
        <Modal onHandler={handlerRequestModalImportaExcel} size="70%" h="true">
          <Container w="100%" direction="column" h="100%">
            <Wrapper w="100%" content="center">
              <ImportFileContainer>
                <Title>Importação de Cadastro</Title>
                <UploadXLS onUpload={submitFile} />
                {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
                <Footer>
                  <p>
                    <FaAngleRight />
                    Permitido apenas arquivos xls, xlsx e csv.
                  </p>
                  <ButtonDefault tp="warn" onClick={handlerImportFile}>
                    <FaCheck />
                    <span>Importar</span>
                  </ButtonDefault>
                </Footer>
              </ImportFileContainer>
            </Wrapper>
          </Container>
        </Modal>
      ) : null}
    </Container>
  );
}
