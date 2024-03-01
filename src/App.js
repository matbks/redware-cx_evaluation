import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import EvaluationForm from './components/EvaluationForm';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import theme from './theme'; // O caminho pode variar dependendo de onde o arquivo está localizado

function App() {
  return (
    <ChakraProvider theme={theme}>
      <EvaluationForm />
    </ChakraProvider>
  );
}

export default App;
