import React from 'react';
import { Switch } from 'react-router-dom';

import {
  FaFileAlt,
  FaUser,
} from 'react-icons/fa';
import Route from './Route';
// Views
import Global from '../../Views/GLOBAL';
import Perfil from '../../Views/GLOBAL/Perfil';
import Escala from '../../Views/GLOBAL/Escala';
import Prestadores from '../../Views/GLOBAL/Prestadores';
import Relatorios from '../../Views/GLOBAL/Relatorios';

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
        path="/Escala"
        exact
        component={Escala}
        isTitleControlled={true}
        title="Escala"
        ico={FaFileAlt}
        buttonBack
      />
      <Route
        path="/Prestadores"
        exact
        component={Prestadores}
        isTitleControlled={true}
        title="Prestadores"
        ico={FaFileAlt}
        buttonBack
      />
      <Route
        path="/Relatorios"
        exact
        component={Relatorios}
        isTitleControlled={true}
        title="Relatorios"
        ico={FaFileAlt}
        buttonBack
      />
    </Switch>
  );
};

export default Routes;
