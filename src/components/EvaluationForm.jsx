import React, { useState, useEffect } from 'react';
import { Box, Center, Stack, useToast, Heading, Progress, Flex, Text } from '@chakra-ui/react';
import { animated, useTransition } from 'react-spring';
import StarRating from './StarRating';
import ProgressBar from 'react-bootstrap/ProgressBar';
function EvaluationForm() {
  
  const toast = useToast();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const [progress, setProgress] = useState(0);

  const evaluationItems = [
    'Tempo de resposta',
    'Comunicação',
    'Qualidade do aúdio',
    'Resolução',
    'Agilidade',
    'Resultado Final',
  ];


  const transitions = useTransition(currentItemIndex === evaluationItems.length ? '' : evaluationItems[currentItemIndex], {
    key: currentItemIndex,
    from: { opacity: 0, transform: 'translate3d(0,-100px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  });

  const handleRating = (rating) => {
    // if (currentItemIndex < evaluationItems.length - 1) {
      // goToNextItem();
    // }
  };

  const handleClose = () => {
    window.close();
  };

  useEffect(() => {
    // Calcula o progresso com base no index do item atual. Começa em 0% e vai até 100%.
    const progressValue = (currentItemIndex / evaluationItems.length) * 100;
    setProgress(progressValue);
  }, [currentItemIndex, evaluationItems.length]);

  const goToNextItem = () => {
    if (currentItemIndex < evaluationItems.length) {
      setCurrentItemIndex(prevIndex => prevIndex + 1);
    } else {
      // Aqui você pode adicionar qualquer outra lógica que queira executar quando a avaliação estiver completa
    }
  };

  return (
    <Center w="100%" h="100vh" p={4}>
      <Flex direction="column" align="center" w="full" maxW="md">
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
          borderWidth="1px"
          borderRadius="lg"
          borderStyle={'dashed'}
          overflow="hidden"
          p={6}
          boxShadow="lg"
          bg="white"
          minW="450px"
          minH="190px"
        >
          {currentItemIndex < evaluationItems.length ? (
            transitions((props, item) => (
              <animated.div style={props}>
                <Heading fontSize="25px" textAlign="center">{item}</Heading>
              </animated.div>
            ))
          ) : (
            transitions((props, item) => (
              <div style={props}>
                <Text fontSize="25px" textAlign="center">Obrigado por completar a avaliação!</Text>
              </div>
            ))
          )}
          {currentItemIndex < evaluationItems.length && (
            <StarRating key={currentItemIndex} onRating={handleRating} onClear={goToNextItem} />
          )}
        </Box>

        <Progress
          value={progress}
          size="sm"
          colorScheme="green"
          width="full"
          mt={4}
          transition="width 0.5s ease-out"
        />

      </Flex>
      <ProgressBar>
          <ProgressBar striped variant="success" now={progress * 0.35} key={1} />
          <ProgressBar variant="warning" now={progress * 0.20} key={2} />
          <ProgressBar striped variant="danger" now={progress * 0.10} key={3} />
        </ProgressBar>
    </Center>
    
  );
}

export default EvaluationForm;
