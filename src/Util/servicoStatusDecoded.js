module.exports = function servicoStatusDecoded(status) {
  switch (status) {
    case 'A':
      return 'ABERTO';
    case 'S':
      return 'SOLICITAÇÃO';
    case 'F':
      return 'FINALIZADO';
    case 'E':
      return 'EM ESPERA';
    case 'C':
      return 'CANCELADO';
    case 'P':
      return 'PARADO';
    default:
      return 'INDEFINIDO';
  }
};
