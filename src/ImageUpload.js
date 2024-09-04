import React from 'react';
import styled from 'styled-components';

const FileInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
`;

function ImageUpload({ onUpload }) {
  const handleFileChange = (e) => {
    onUpload(e.target.files[0]);
  };

  return (
    <FileInput type="file" onChange={handleFileChange} />
  );
}

export default ImageUpload;
