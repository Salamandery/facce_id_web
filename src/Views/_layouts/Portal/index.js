import React from 'react';
import ProtoTypes from 'prop-types';
import history from '../../../Services/history';
import { Container, Content, Wrapper, ButtomMenu } from './style';
import Header from '../../../Components/HeaderComponent';
//import InfoController from '../../../Components/HeaderComponent/InfoController';
import MenuBar from './menu';

const Portal = ({
  children,
  noHeader,
  isPanel,
  title,
  Ico,
  buttonBack,
  isTitleControlled,
}) => {
  function handlerHome() {
    history.push('/Home');
  }

  return (
    <Container w="100%">
      <Wrapper w="100%" h="100%" margin="0" pad="0" bgColor="#222">
        {noHeader === false ? (
          <>
            <MenuBar />
            <Content w="100%" pad={isPanel}>
              {isTitleControlled ? (
                //<InfoController title={title} Ico={Ico} buttonBack={buttonBack} />
                <></>
              ) : null}
              {noHeader === false ? (
                <Wrapper w="100%">
                  <Header title={title} Ico={Ico} buttonBack={buttonBack} />
                </Wrapper>
              ) : null}
              {children}
            </Content>
          </>
        ) : (
          children
        )}
      </Wrapper>
    </Container>
  );
};

Portal.propTypes = {
  children: ProtoTypes.element.isRequired,
  noHeader: ProtoTypes.bool,
  isPanel: ProtoTypes.bool,
  buttonBack: ProtoTypes.bool,
  isTitleControlled: ProtoTypes.bool,
  title: ProtoTypes.string,
  Ico: ProtoTypes.oneOfType([ProtoTypes.element, ProtoTypes.func]),
};

Portal.defaultProps = {
  title: 'Titulo do Aplicação',
  Ico: null,
  noHeader: false,
  isPanel: false,
  isTitleControlled: true,
  buttonBack: false,
};

export default Portal;
