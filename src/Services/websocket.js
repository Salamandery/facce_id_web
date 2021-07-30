import socketio from 'socket.io-client';

//const baseURL = `https://projetoleito.herokuapp.com/`;
//const baseURL = `http://localhost:3333/`;
const baseURL = `http://localhost:3333/`;

const socket = socketio(baseURL, {
  autoConnect: false,
});

function novaOS(servico) {
  socket.on('nova-os', servico);
}
function atualizaOS(servico) {
  socket.on('atualiza-os', servico);
}
function novoLeito(leito) {
  socket.on('novo-leito', leito);
}
function atualizaAtendimento(atendimento) {
  socket.on('novo-atendimento', atendimento);
}
function atualizaLeito(leito) {
  socket.on('atualiza-leito', leito);
}
function atualizaUnidade(unidade) {
  socket.on('atualiza-unidade', unidade);
}

function connect() {
  disconnect();
  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export {
  connect,
  novaOS,
  novoLeito,
  atualizaOS,
  atualizaAtendimento,
  atualizaLeito,
  atualizaUnidade,
};
