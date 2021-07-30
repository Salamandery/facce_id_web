import React from 'react';
import { Doughnut, defaults } from 'react-chartjs-2';
import { Container } from '../../Style';

export default function GraphDoughnut({ data, title }) {
  return (
    <Container
      w="100%"
      h="100%"
      pad="20px"
      direction="column"
      items="center"
      style={{ position: 'relative' }}
      <h1>{title}</h1>
      <Doughnut 
          options={data.options}
          width={100}
          height={40}
          data={data}
        />
    </Container>
  );
}
