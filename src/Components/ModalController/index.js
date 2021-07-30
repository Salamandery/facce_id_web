import React, {
  useEffect,
  useState,
} from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import { Container, Content } from './style';

export default function ModalController({
  children,
  size,
  closable = true,
  isTimer = false,
  timer = 5,
  played,
  content,
  items,
  AlignitemsModal,
  onHandler,
  h
}) {
  const [time, setTime] = useState(timer);

  useEffect(()=>{
    setTime(timer);
  }, [timer]);

  useEffect(() => {
    if (time > 0) {
      setTimeout(()=>{
        const t = time -1;
        setTime(t);
      }, 1000);
    }
  },[time]);

  return (
    <Container AlignitemsModal={AlignitemsModal}>
      <Content size={size} content={content} items={items} h={h}>
          { closable ? (
            <button className="closeModal" onClick={e=>onHandler(e)}>
              <FaRegWindowClose /> FECHAR
            </button>
          ) : (
            played ? (
              isTimer ? (
                time === 0 ? (
                  <button className="closeModal" onClick={e=>onHandler(e)}>
                    <FaRegWindowClose /> FECHAR
                  </button>
                ) : <span style={{color: 'red', fontWeight: 'bold'}}>{time} segundos</span>
              ) : (
                <button className="closeModal" onClick={e=>onHandler(e)}>
                  <FaRegWindowClose /> FECHAR
                </button>
              )
            ) : <span style={{color: 'red', fontWeight: 'bold'}}>Assista o vídeo até o fim!</span>
          ) }
          {children}
      </Content>
    </Container>
  );
}
