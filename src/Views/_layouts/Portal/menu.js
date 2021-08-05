import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FaThermometer, FaStethoscope } from 'react-icons/fa';
import { MdAddBox, MdBuild, MdSettings } from 'react-icons/md';
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
            onClick={(e) => handlerItem('/ProntuarioEletronico')}
          >
            <FaStethoscope />
            <span>Teste</span>
          </ItemMenu>
        </LabelMenu>
        <LabelMenu>
          <ItemMenu
            onClick={(e) => handlerItem('/ProntuarioEletronico')}
          >
            <FaStethoscope />
            {
              // fActive? <FaCaretRight className="icon" /> : null
            }
          </ItemMenu>
        </LabelMenu>
      </GroupLabel>
    </MenuBar>
  );
}
