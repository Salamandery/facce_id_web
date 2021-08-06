import React from 'react';
import { FaUserPlus, FaRegFileAlt, FaRegCalendarAlt } from 'react-icons/fa';
import history from '../../../Services/history';
import { MenuBar, LabelMenu, GroupLabel, ItemMenu, Logo, Wrapper } from './style';

export default function Menu() {
  function handlerItem(path) {
    history.push(`${path}`);
  }

  return (
    <MenuBar>
      <Wrapper w="100%">
        <Logo>
          <img />
        </Logo>
      </Wrapper>
      <GroupLabel>
        <LabelMenu>
          <ItemMenu
            onClick={(e) => handlerItem('/Prestadores')}
          >
            <FaUserPlus />
            <span>Prestadores</span>
          </ItemMenu>
        </LabelMenu>
        <LabelMenu>
          <ItemMenu
            onClick={(e) => handlerItem('/Escala')}
          >
            <FaRegCalendarAlt />
            <span>Escala</span>
          </ItemMenu>
        </LabelMenu>
        <LabelMenu>
          <ItemMenu
            onClick={(e) => handlerItem('/Relatorios')}
          >
            <FaRegFileAlt />
            <span>Relatórios</span>
          </ItemMenu>
        </LabelMenu>
      </GroupLabel>
    </MenuBar>
  );
}
