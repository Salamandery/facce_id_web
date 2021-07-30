import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FaThermometer, FaStethoscope } from 'react-icons/fa';
import { MdAddBox, MdBuild, MdSettings } from 'react-icons/md';
import history from '../../../Services/history';
import { MenuBar, LabelMenu, GroupLabel, ItemMenu } from './style';

export default function Menu() {
  const items = useSelector((state) => state.user.menu);

  const menu = useMemo(() => {
    const unique = [];

    for (var i = 0; i < items.length; i++) {
      if (i > 0) {
        const item = unique.filter(
          (it) => it.modulo.chave === items[i].modulo.chave
        );
        if (item.length === 0) unique.push(items[i]);
      } else {
        unique.push(items[i]);
      }
    }

    return unique;
  }, [items]);

  function handlerItem(path) {
    history.push(`${path}`);
  }

  return (
    <MenuBar>
      <GroupLabel>
        {menu?.map((i) => {
          switch (i.modulo.chave.toUpperCase()) {
            case 'MDS_PEP':
              return (
                <LabelMenu key={i.modulo.id}>
                  <ItemMenu
                    onClick={(e) => handlerItem('/ProntuarioEletronico')}
                  >
                    <FaStethoscope />
                    {
                      // fActive? <FaCaretRight className="icon" /> : null
                    }
                  </ItemMenu>
                </LabelMenu>
              );
            case 'MDS_ATENDIMENTO':
              return (
                <LabelMenu key={i.modulo.id}>
                  <ItemMenu onClick={(e) => handlerItem('/Atendimento')}>
                    <MdAddBox />
                    {
                      // fActive? <FaCaretRight className="icon" /> : null
                    }
                  </ItemMenu>
                </LabelMenu>
              );
            case 'MDS_SERVICO_APOIO':
              return (
                <LabelMenu key={i.modulo.id}>
                  <ItemMenu onClick={(e) => handlerItem('/Manutencao')}>
                    <MdBuild />
                    {
                      // fActive? <FaCaretRight className="icon" /> : null
                    }
                  </ItemMenu>
                </LabelMenu>
              );
            case 'MDS_GLOBAL':
              return (
                <LabelMenu key={i.modulo.id}>
                  <ItemMenu onClick={(e) => handlerItem('/Global')}>
                    <MdSettings />
                    {
                      // fActive? <FaCaretRight className="icon" /> : null
                    }
                  </ItemMenu>
                </LabelMenu>
              );
            case 'MDS_SACR':
              return (
                <LabelMenu key={i.modulo.id}>
                  <ItemMenu onClick={(e) => handlerItem('/SACR')}>
                    <FaThermometer />
                    {
                      // fActive? <FaCaretRight className="icon" /> : null
                    }
                  </ItemMenu>
                </LabelMenu>
              );
            default:
              break;
          }
        })}
      </GroupLabel>
    </MenuBar>
  );
}
