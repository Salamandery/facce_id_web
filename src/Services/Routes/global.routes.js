import React from 'react';
import { Switch } from 'react-router-dom';

import {
  FaSlidersH,
  FaFileAlt,
  FaUser,
  FaFileSignature,
  FaAddressBook,
  FaIdCard,
  FaDonate,
} from 'react-icons/fa';
import Route from './Route';
// Views
import Global from '../../Views/GLOBAL';
import Perfil from '../../Views/GLOBAL/Perfil';
import Localidades from '../../Views/GLOBAL/Tabelas/Localidades';
import Tabelas from '../../Views/GLOBAL/Tabelas';
import GenForm from '../../Views/GLOBAL/Tabelas/Form';
import GenPapel from '../../Views/GLOBAL/Tabelas/Papel';
import GenModulo from '../../Views/GLOBAL/Tabelas/Modulo';
import GenUsuario from '../../Views/GLOBAL/Tabelas/Usuario';
import RH from '../../Views/GLOBAL/RH';
import RioCard from '../../Views/GLOBAL/RH/RioCard';
import RioCardCadastro from '../../Views/GLOBAL/RH/RioCard/Cadastro';
import RioCardPedidos from '../../Views/GLOBAL/RH/RioCard/Pedido';
import PresencaMedica from '../../Views/GLOBAL/RH/PresencaMedica';

const Routes = () => {
  return (
    <Switch>
      {
        // Public
      }
      {
        // Private
      }
      <Route
        path="/Global"
        exact
        component={Global}
        isPrivate
        isTitleControlled={true}
        title="Global"
        ico={FaFileAlt}
      />
      <Route
        path="/Perfil"
        exact
        component={Perfil}
        isPrivate
        isTitleControlled={true}
        title="Meu perfil"
        ico={FaUser}
      />
      <Route
        path="/Global/RecursosHumanos"
        exact
        component={RH}
        isPrivate
        isTitleControlled={true}
        title="Recursos Humanos"
        ico={FaAddressBook}
        buttonBack
      />
      <Route
        path="/Global/RecursosHumanos/RioCard"
        exact
        component={RioCard}
        isPrivate
        isTitleControlled={true}
        title="RioCard"
        ico={FaIdCard}
        buttonBack
      />
      <Route
        path="/Global/RecursosHumanos/RioCard/Cadastro"
        exact
        component={RioCardCadastro}
        isPrivate
        isTitleControlled={true}
        title="Cadastro"
        ico={FaFileSignature}
        buttonBack
      />
      <Route
        path="/Global/RecursosHumanos/RioCard/Pedido"
        exact
        component={RioCardPedidos}
        isPrivate
        isTitleControlled={true}
        title="Pedidos"
        ico={FaDonate}
        buttonBack
      />
      <Route
        path="/Global/Tabelas"
        exact
        component={Tabelas}
        isPrivate
        isTitleControlled={true}
        title="Tabelas"
        ico={FaSlidersH}
        buttonBack
      />
      <Route
        path="/Global/Tabela/Formularios"
        exact
        component={GenForm}
        isPrivate
        isTitleControlled={true}
        title="Cadastro de Formulários"
        ico={FaFileAlt}
        buttonBack
      />
      <Route
        path="/Global/Tabela/Papeis"
        exact
        component={GenPapel}
        isPrivate
        isTitleControlled={true}
        title="Cadastro de Papéis"
        ico={FaFileAlt}
        buttonBack
      />
      <Route
        path="/Global/Tabela/Modulos"
        exact
        component={GenModulo}
        isPrivate
        isTitleControlled={true}
        title="Cadastro de Módulos"
        ico={FaFileAlt}
        buttonBack
      />
      <Route
        path="/Global/Tabela/Usuarios"
        exact
        component={GenUsuario}
        isPrivate
        isTitleControlled={true}
        title="Cadastro de Usuários"
        ico={FaFileAlt}
        buttonBack
      />
      <Route
        path="/Global/Tabela/Localidades"
        exact
        component={Localidades}
        isPrivate
        isTitleControlled={true}
        title="Cadastro de Localidades"
        ico={FaFileAlt}
        buttonBack
      />
      <Route
        path="/Global/PresencaMedica"
        exact
        component={PresencaMedica}
        isTitleControlled={true}
        title="Cadastro de Localidades"
        ico={FaFileAlt}
        buttonBack
      />
    </Switch>
  );
};

export default Routes;
