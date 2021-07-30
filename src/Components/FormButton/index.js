import React, { useEffect, useState } from 'react';
import api from '../../Services/api';
import { useSelector, useDispatch } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import MessageHandling from '../../Util/MessageHandling';

import { setFavoritePage } from '../../Services/store/user/action';

import {
  CardButton,
  Container
} from './styles';

function FormButton({ children, name = '', path = '', SPSize, ...rest }) {
  const dispatch = useDispatch();
  const favorite_page = useSelector((state) => state.user.favorite_page);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (favorite_page === path) {
      setFavorited(true);
    }
  }, [favorite_page, path]);

  async function handleFavorite() {
    if (favorited) {
      const res = await api.put('/usuario', {
        favorite_page: '',
      });

      if (MessageHandling(res)) {
        setFavorited(false);
        dispatch(setFavoritePage(undefined));
      }
    } else {
      const res = await api.put('/usuario', {
        favorite_page: path,
      });

      if (MessageHandling(res)) {
        setFavorited(true);
        dispatch(setFavoritePage(path));
      }
    }

    window.location.reload(false);
  }

  return (
    <Container
      favorited={favorited}
      border="0"
      fColor="#f2f2f2"
      bgColor="#0059b3"
      hColor="#003380"
      size="md"
    >
      <button onClick={handleFavorite} type="button">
        <FaStar size={18} />
      </button>

      <CardButton
        {...rest}
        size="md"
        fColor="#f2f2f2"
        SPSize={SPSize}
      >
        {children}
      </CardButton>
    </Container>
  );
}

export default FormButton;
