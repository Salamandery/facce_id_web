import React from 'react';
import leitoStatus from '../../Util/leitoStatusDecoded';

function LeitoItem({ atend, leito }) {
  let leitoColor = '';

  if (leito) {
    switch (leitoStatus(leito.status)) {
      case 'RESERVADO':
        leitoColor = 'green';
        break;
      case 'OCUPADO':
        leitoColor = 'red';
        break;
      case 'VAGO':
        leito.extra ? (leitoColor = 'orange') : (leitoColor = '#fff');
        break;
      default:
        leitoColor = '#fff';
        break;
    }
  }
  const divStyle = {
    backgroundColor: leitoColor,
  };
  const titleStyle = {
    color: leito ? (leito.status !== 'V' ? '#fff' : '#000') : null,
  };
  return (
    <>
      {leito ? (
        <li className="dev-item" style={divStyle}>
          <p style={titleStyle}>{leito.resumo || leito.descricao}</p>
        </li>
      ) : null}
    </>
  );
}

export default LeitoItem;
