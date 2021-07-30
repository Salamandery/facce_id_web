import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import GlobalRoutes from './global.routes';
// Views
import Home from '../../Views/Home';
import Teste from '../../Views/Home';
import SignIn from '../../Views/SignIn';
import SignUp from '../../Views/SignUp';
import NotFound from '../../Views/NotFound';

const Routes = () => {
  return (
    <Switch>
      {
        // Public
      }
      <Route path="/" exact component={SignIn} isPrivate={false} noHeader />
      <Route path="/teste" exact component={Teste} isPrivate={false} />
      <Route
        path="/CadastroDeUsuario"
        exact
        component={SignUp}
        isPrivate={false}
        noHeader
      />
      {
        // Private
      }
      <Route
        path="/Home"
        exact
        component={Home}
        isPrivate
        isPanel
        isTitleControlled={false}
        title=""
      />
      {
        // Modulos
      }
      <Route component={GlobalRoutes}>
        <GlobalRoutes />
      </Route>
      {
        // not found
      }
      <Route path="/" component={NotFound} />
    </Switch>
  );
};

export default Routes;
