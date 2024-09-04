import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
`;

function CancerSelect({ onChange }) {
  return (
    <Select onChange={(e) => onChange(e.target.value)}>
      <option value="">Select Cancer Type</option>
      <option value="colorectal">Colorectal</option>
      <option value="breast">Breast</option>
      <option value="gastrointestinal">GastroIntestinal</option>
      <option value="oral">Oral</option>
    </Select>
  );
}

export default CancerSelect;
