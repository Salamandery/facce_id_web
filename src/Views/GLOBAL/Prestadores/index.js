import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FaIdCard } from 'react-icons/fa';
import history from '../../../Services/history';
import { Container, CardBlock } from '../../../Style';
import FormButton from '../../../Components/FormButton';

export default function Tabelas() {

  function handlerLink(path) {
    history.push(path);
  }

  return (
    <Container w="100%" h="100%" pad="20px" direction="column">
      <CardBlock w="100%" h="100%">
        <Container wrap="true" overflow="auto" h="100%">
          {}
        </Container>
      </CardBlock>
    </Container>
  );
}
