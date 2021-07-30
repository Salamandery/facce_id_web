import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Container } from '../../Style';

export default function GraphPie({ data, title }) {
  return (
    <Container
      w="100%"
      h="100%"
      direction="column"
      items="center"
      style={{ position: 'relative' }}
      <h3>{title}</h3>
      <Pie 
          options={data.options}
          width={100}
          height={38}
          data={data}
        />
    </Container>
  );
}
