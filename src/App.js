import React, { useState } from 'react';
import styled from 'styled-components';
import CancerSelect from './CancerSelect';
import ImageUpload from './ImageUpload';
import LoadingScreen from './LoadingScreen';
import logo from './logo.png'; // Import the logo

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
  text-align: center;
`;

const ImagePreview = styled.img`
  max-width: 90%;
  max-height: 280px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

function App() {
  const [cancerType, setCancerType] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCancerTypeChange = (type) => setCancerType(type);
  
  const handleImageUpload = (img) => {
    setImage(img);
    setImagePreviewUrl(URL.createObjectURL(img));
  };

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('cancer_type', cancerType);
    console.log(cancerType);

    fetch('http://192.168.188.32:5000/predict', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setResult(data.prediction);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error);
      });
  };

  return (
    <Container>
      <Logo src={logo} alt="App Logo" />
      <Title>Cancer Detection Application</Title>
      <CancerSelect onChange={handleCancerTypeChange} />
      <ImageUpload onUpload={handleImageUpload} />
      <Button onClick={handleSubmit} disabled={!cancerType || !image}>
        Submit
      </Button>
      {loading && <LoadingScreen />}
      {result && (
        <ResultContainer>
          <ImagePreview src={imagePreviewUrl} alt="Uploaded Image" />
         
        </ResultContainer>
      )}
       The model predicts that the image is: <strong>{result}</strong>
    </Container>
  );
}

export default App;
