import React from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import { Container, Content } from './style';

export default function ModalController({
  children,
  clientY,
  clientX,
  size,
  content,
  items,
  AlignitemsModal,
  h,
  onHandler,
}) {
  return (
    <Container
      AlignitemsModal={AlignitemsModal}
      clientY={clientY}
      clientX={clientX}
    >
      <Content size={size} content={content} items={items} h={h}>
        <button className="closeModal" onClick={(e) => onHandler(e)}>
          <FaRegWindowClose />
        </button>
        {children}
      </Content>
    </Container>
  );
}
