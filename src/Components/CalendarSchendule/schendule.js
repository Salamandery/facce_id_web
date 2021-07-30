import React, { useState, useCallback } from 'react';
import { formatDate } from '../../Util/FormatDate';
import {
  Wrapper,
  SchenduleContainer,
  SearchInput,
  TableContainer,
  SchenduleTable,
} from './style';

export default function Schendule({ tableData = [], toSearch }) {
  const [search, setSearch] = useState('');

  return (
    <SchenduleContainer>
      {toSearch ? (
        <Wrapper>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Wrapper>
      ) : null}
      <TableContainer>
        {tableData.length > 0 ? (
          <SchenduleTable>
            <thead>
              <tr>
                {Object.keys(tableData[0]).map((data) => (
                  <th key={data}>{data.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData
                ? tableData.map((data) => (
                  <tr key={data}>
                      {Object.keys(data).map((key) => (
                        <td key={key}>{key.toUpperCase().includes('DATA') ? formatDate(data[key]) : data[key]}</td>
                      ))}
                  </tr>
                  ))
                : null}
            </tbody>
          </SchenduleTable>
        ) : (
          <span style={{ fontWeight: 'bold' }}>Nada encontrado..</span>
        )}
      </TableContainer>
    </SchenduleContainer>
  );
}
