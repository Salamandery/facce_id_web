module.exports = function leitoStatusDecoded(leito) {
  switch (leito) {
    case 'R':
      return 'RESERVADO';
    case 'V':
      return 'VAGO';
    case 'O':
      return 'OCUPADO';
    case 'M':
      return 'MANUTENÇÃO';
    case 'L':
      return 'LIMPEZA';
    case 'D':
      return 'DESATIVADO';
    case 'I':
      return 'INFECTADO';
    default:
      return 'INDEFINIDO';
  }
};
