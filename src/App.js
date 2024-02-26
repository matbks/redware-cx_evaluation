import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import EvaluationForm from './components/EvaluationForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ChakraProvider>
      <EvaluationForm />
    </ChakraProvider>
  );
}

export default App;
