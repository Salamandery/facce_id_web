import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FaBed, FaHospitalAlt, FaClipboardList } from 'react-icons/fa';
import history from '../../../Services/history';
import { Container, CardBlock } from '../../../Style';
import FormButton from '../../../Components/FormButton';

const FormsIco = {
  FRM_TBL_CAD_FORMULARIOS: <FaClipboardList style={{ marginBottom: 10 }} size={32} />,
  FRM_TBL_CAD_MODULOS: <FaBed style={{ marginBottom: 10 }} size={32} />,
  FRM_TBL_CAD_PAPEIS: (
    <FaHospitalAlt style={{ marginBottom: 10 }} size={32} />
  ),
  FRM_TBL_CAD_SETORES: (
    <FaHospitalAlt style={{ marginBottom: 10 }} size={32} />
  ),
  FRM_TBL_CAD_LOCALIDADES: (
    <FaHospitalAlt style={{ marginBottom: 10 }} size={32} />
  ),
  FRM_TBL_CAD_OFICINAS: (
    <FaHospitalAlt style={{ marginBottom: 10 }} size={32} />
  ),
  FRM_TBL_CAD_EMPRESAS: (
    <FaHospitalAlt style={{ marginBottom: 10 }} size={32} />
  ),
  FRM_TBL_CAD_USUARIOS: (
    <FaHospitalAlt style={{ marginBottom: 10 }} size={32} />
  ),
};

export default function Tabelas() {
  const chave = 'FRM_TBL_GLOBAL';

  const forms = useSelector((state) => state.user.forms);

  const tabelas = useMemo(() => {
    const subForms = forms.filter(item => item.form.sub_form === true && item.form.form_pai === chave);

    return subForms;
  }, [forms]);

  function handlerLink(path) {
    history.push(path);
  }

  return (
    <Container w="100%" h="100%" direction="column">
      <CardBlock w="100%" h="90%">
        <Container wrap="true" overflow="auto" h="100%" pad="20px">
          {tabelas?.map((item) => (
            item.form.form_pai === chave ? (
              <FormButton
                key={item.form.id}
                onClick={(e) => handlerLink(`/${item.form.path}`)}
                name={item.form.chave}
                path={item.form.path}
                SPSize="14px"
              >
                {FormsIco[item.form.chave]}
                <span>{item.form.label}</span>
              </FormButton>
            ) : null
          ))}
        </Container>
      </CardBlock>
    </Container>
  );
}
