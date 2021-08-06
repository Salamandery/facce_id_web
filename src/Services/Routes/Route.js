import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropType from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { MdReceipt } from 'react-icons/md';
import Portal from '../../Views/_layouts/Portal';
import Default from '../../Views/_layouts/Default';

import { store } from '../store';

function Router({
  component: Component,
  ico = MdReceipt,
  isPrivate = false,
  noHeader = false,
  isPanel = false,
  buttonBack = false,
  isTitleControlled = true,
  title = 'Título da página',
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && rest.path === '/') {
    return <Redirect to="/Home" />;
  }

  const Layout = signed ? Portal : Default;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout
          noHeader={noHeader}
          isPanel={isPanel}
          title={title}
          Ico={ico}
          buttonBack={buttonBack}
          isTitleControlled={isTitleControlled}
        >
          {
            isPrivate ? (
              signed ? (
                <Component {...props} />
              ) : (
                <Redirect to="/" />
              )
            ) : <Component {...props} />
          }
        </Layout>
      )}
    />
  );
}

Router.propTypes = {
  title: PropType.string,
  noHeader: PropType.bool,
  isPanel: PropType.bool,
  isPrivate: PropType.bool,
  buttonBack: PropType.bool,
  isTitleControlled: PropType.bool,
  component: PropType.oneOfType([PropType.element, PropType.func]).isRequired,
  ico: PropType.oneOfType([PropType.element, PropType.func]),
};

Router.defaultProps = {
  title: 'Título da página',
  noHeader: false,
  isPanel: false,
  buttonBack: false,
  isTitleControlled: true,
};

export default Router;
