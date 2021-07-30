import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import history from '../../Services/history';
import { Container } from '../../Style';

export default function Home() {
  const path = useSelector((state) => state.user.user.favorite_page);

  useEffect(()=>{
    path && history.push(`${path}`);
  },[]);

  return (
    <Container />
  );
}
