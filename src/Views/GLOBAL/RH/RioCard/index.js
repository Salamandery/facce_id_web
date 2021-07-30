import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FaFileSignature, FaDonate } from 'react-icons/fa';
import history from '../../../../Services/history';
import { Container, CardBlock } from '../../../../Style';
import FormButton from '../../../../Components/FormButton';

const FormsIco = {
  FRM_RH_RIOCARD_CADASTRO: (
    <FaFileSignature style={{ marginBottom: 10 }} size={32} />
  ),
  FRM_RH_RIOCARD_PEDIDO: <FaDonate style={{ marginBottom: 10 }} size={32} />,
};

export default function Tabelas() {
  const chave = 'FRM_RH_RIOCARD';

  const forms = useSelector((state) => state.user.forms);

  const tabelas = useMemo(() => {
    const subForms = forms.filter(
      (item) => item.form.sub_form === true && item.form.form_pai === chave
    );

    return subForms;
  }, [forms]);

  function handlerLink(path) {
    history.push(path);
  }

  return (
    <Container w="100%" h="100%" direction="column">
      <CardBlock w="100%" h="90%">
        <Container wrap="true" overflow="auto" h="100%" pad="20px">
          {tabelas?.map((item) =>
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
          )}
        </Container>
      </CardBlock>
    </Container>
  );
}
