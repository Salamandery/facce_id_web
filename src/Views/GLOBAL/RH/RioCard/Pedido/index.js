import React, { useCallback, useState } from 'react';
import moment from 'moment-timezone';
import XLSX from 'xlsx';
import filesize from 'filesize';
import {
  FaAngleRight,
  FaFileExport,
  FaPen,
  FaCheck,
  FaSearch,
} from 'react-icons/fa';
import {
  Container,
  Form,
  Wrapper,
  ButtonDefault,
  FieldSet,
  Input,
  MaskInput,
} from '../../../../../Style';
import Modal from '../../../../../Components/ModalController';
import { Title, ImportFileContainer, Footer } from './styles';

import { MaskCPF, MaskRG } from '../../../../../Util/FormatMask';
import UploadXLS from '../../../../../Components/UploadXLS';
import FileList from '../../../../../Components/FileList';

export default function Index() {
  const [tp, setTp] = useState('02');
  const [nome, setNome] = useState('');
  const [dt_nascimento, setDtNascimento] = useState('');
  const [sg_orgao_emissor, setSgOrgaoEmissor] = useState('');
  const [matricula, setMatricula] = useState('');
  const [cpf, setCPF] = useState('');
  const [rg, setRG] = useState('');
  const [nr_cartao, setNrCartao] = useState('');
  const [vl_uso_diario_ida, setVlUsoDiarioIda] = useState('');
  const [vl_uso_diario_volta, setVlUsoDiarioVolta] = useState('');
  const [vl_carga, setVlCarga] = useState('');

  const [ver, setVersion] = useState('0100');
  const [cnpj, setCNPJ] = useState('24006302000488');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [handlerModalExportaExcel, setHandlerModalExportaExcel] = useState(
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

  const TextFile = useCallback(
    (data, hora, json) => {
      let seq = '00000';
      let vl_carga = 0;
      let vl_pedido = 0;
      let fileEx = `0000101PEDIDO01.00`;
      let count = 0;
      fileEx += `${cnpj}\n`;
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
          if (json[i].MATRICULA) {
            matricula = json[i].MATRICULA;
          }
          if (json[i].TOTAL) {
            vl_carga = json[i].TOTAL;
            vl_pedido = parseFloat(vl_pedido) + parseFloat(vl_carga);
            vl_carga = vl_carga.replace('.', '');
            vl_carga = PadwithZeroes(vl_carga, 8);
          }

          fileEx += `${seq}${tp}${matricula.padEnd(15)}${vl_carga}\n`;
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

      vl_pedido = vl_pedido.toFixed(2).toString().replace('.', '');
      vl_pedido = PadwithZeroes(vl_pedido, 10);

      fileEx += `${seq}99${vl_pedido}`;
      const element = document.createElement('a');
      let file = new Blob([fileEx], {
        type: 'text/plain',
      });
      element.href = URL.createObjectURL(file);
      element.download = `PEDIDO_${ver}_${cnpj}_${data}_${hora}.txt`;
      document.body.appendChild(element);
      element.click();
    },
    [cnpj, ver, tp]
  );

  const readFile = useCallback(() => {
    var f = uploadedFiles[0].file;
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      const json = JSON.parse(convertToJson(data));
      const dt = moment(new Date()).format('YYYYMMDD').toString();
      const hora = moment(new Date()).format('hhmm').toString();
      TextFile(dt, hora, json, name.split(".")[0]);
    };
    reader.readAsBinaryString(f);
  }, [uploadedFiles, convertToJson]);

  const PadwithZeroes = useCallback((number, length) => {
    var my_string = '' + number;
    while (my_string.length < length) {
      my_string = '0' + my_string;
    }

    return my_string;
  }, []);

  const handlerFile = useCallback(() => {
    readFile();
  }, [readFile]);

  const submitFile = useCallback((files) => {
    const filesUploaded = files.map((file) => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));

    setUploadedFiles(filesUploaded);
  }, []);

  const handlerRequestModalExportaExcel = useCallback(() => {
    setHandlerModalExportaExcel(false);
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
                disabled={true}
              />
              <ButtonDefault
                tp="action"
                onClick={(e) => setHandlerModalExportaExcel(true)}
              >
                <FaSearch />
              </ButtonDefault>
              <Input
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="NOME DO COLABORADOR"
                w="30%"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={true}
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
                disabled={true}
              />
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
                disabled={true}
              />
              <Input
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="ORGÃO EMISSOR"
                w="20%"
                value={sg_orgao_emissor}
                onChange={(e) => setSgOrgaoEmissor(e.target.value)}
                disabled={true}
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
                disabled={true}
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
                disabled={true}
              />
              <Input
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="Valor de ida"
                w="10%"
                value={vl_uso_diario_ida}
                onChange={(e) => setVlUsoDiarioIda(e.target.value)}
              />
              <Input
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="Valor de volta"
                w="10%"
                value={vl_uso_diario_volta}
                onChange={(e) => setVlUsoDiarioVolta(e.target.value)}
              />
              <Input
                marginright="true"
                borderless="true"
                bold="true"
                placeholder="Valor total"
                w="10%"
                value={vl_carga}
                onChange={(e) => setVlCarga(e.target.value)}
                disabled={true}
              />
            </Wrapper>
          </FieldSet>
        </Wrapper>
      </Form>
      <Wrapper>
        <ButtonDefault
          tp="action"
          onClick={(e) => setHandlerModalExportaExcel(true)}
        >
          <FaPen />
          <span>ATUALIZAR</span>
        </ButtonDefault>
        <ButtonDefault
          tp="action"
          onClick={(e) => setHandlerModalExportaExcel(true)}
        >
          <FaFileExport />
          <span>EXPORTAR</span>
        </ButtonDefault>
      </Wrapper>
      {handlerModalExportaExcel ? (
        <Modal onHandler={handlerRequestModalExportaExcel} size="70%" h="true">
          <Container w="100%" direction="column" h="100%">
            <Wrapper w="100%" content="center">
              <ImportFileContainer>
                <Title>Exportação de Pedido</Title>
                <Wrapper w="100%">
                  <Input w="100%" value={cnpj} onChange={(e) => setCNPJ(e.target.value)} />
                </Wrapper>
                <UploadXLS onUpload={submitFile} />
                {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
                <Footer>
                  <p>
                    <FaAngleRight />
                    Permitido apenas arquivos xls, xlsx e csv.
                  </p>
                  <ButtonDefault tp="warn" onClick={handlerFile}>
                    <FaCheck />
                    <span>GERAR</span>
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
