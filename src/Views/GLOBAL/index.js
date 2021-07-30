import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MdDesktopWindows } from 'react-icons/md';
import { FaSlidersH, FaFileAlt, FaAddressBook } from 'react-icons/fa';
import history from '../../Services/history';
import { Container, CardBlock } from '../../Style';
import FormButton from '../../Components/FormButton';

const FormsIco = {
  FRM_REL_GLOBAL: <FaFileAlt style={{ marginBottom: 10 }} size={32} />,
  FRM_GLOBAL_RH: <FaAddressBook style={{ marginBottom: 10 }} size={32} />,
  FRM_TBL_GLOBAL: <FaSlidersH style={{ marginBottom: 10 }} size={32} />,
  FRM_PNL_GLOBAL: <MdDesktopWindows style={{ marginBottom: 10 }} size={32} />,
};

export default function GLOBAL() {
  const chave = 'MDS_GLOBAL';

  const forms = useSelector((state) => state.user.forms);

  const initialForms = useMemo(() => {
    const subForms = forms.filter((item) => !item.form.sub_form);

    return subForms;
  }, [forms]);

  function handlerLink(path) {
    history.push(path);
  }
  return (
    <Container w="100%" direction="column">
      <CardBlock w="100%" h="98%">
        <Container pad="20px">
          {initialForms?.map((item) =>
            item.modulo.chave === chave ? (
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
          )}
        </Container>
      </CardBlock>
    </Container>
  );
}
