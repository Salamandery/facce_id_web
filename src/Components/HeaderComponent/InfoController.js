import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import history from '../../Services/history';
import { Container } from './style';
import { Wrapper, ButtonDefault } from '../../Style';

const InfoController = ({ title, Ico, buttonBack }) => {
  return (
    <Container txtColor="#000">
      <Wrapper items="center" pad="5px" style={{ marginLeft: -15 }}>
        <Ico style={{ marginRight: 10 }} size={28} />
        <h1>{title}</h1>
      </Wrapper>
      {buttonBack ? (
        <ButtonDefault tp="action" onClick={(e) => history.goBack()}>
          <MdKeyboardArrowLeft />
          <span>Voltar</span>
        </ButtonDefault>
      ) : null}
    </Container>
  );
};

export default InfoController;
