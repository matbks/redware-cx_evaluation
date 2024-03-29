import React, { useState, useEffect } from 'react';
import { Box, Center, Flex, Heading, useToast, Image, Text } from '@chakra-ui/react';
import { animated, useTransition } from 'react-spring';
import StarRating from './StarRating';
import CustomProgressBar from './ProgressBar';

function EvaluationForm() {
  const toast = useToast();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const evaluationItems = [
    'Tempo de resposta',
    'Comunicação',
    'Qualidade do áudio',
    'Agilidade',
    'Assertividade',
    'Trabalho em equipe',
    'Merece um elogio',
  ];

  const [ratings, setRatings] = useState(new Array(evaluationItems.length).fill(0));

  const [showWelcomeToast, setShowWelcomeToast] = useState(true);
  const transitions = useTransition(currentItemIndex < evaluationItems.length ? evaluationItems[currentItemIndex] : '', {
    key: currentItemIndex,
    from: { opacity: 0, transform: 'translate3d(0,-100px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    // leave: { opacity: 0, transform: 'translate3d(0,-10px,0)' },
  });

  const handleRating = (rating) => {
    const newRatings = [...ratings];
    newRatings[currentItemIndex] = rating;
    setRatings(newRatings);
    goToNextItem();
  };

  useEffect(() => {
    if (showWelcomeToast) {
      toast({
        position: "bottom",
        title: "Avaliação anônima",
        description: <Text>
          <br /> 
          Sua opinião é muito importante para nós. 
          <br /> 
          Nossa pesquisa leva menos de 20s.
        </Text>,
        status: "info", 
        duration: '8000', // Mantém o toast até que seja fechado manualmente
        isClosable: true, 
        onCloseComplete: () => setShowWelcomeToast(false) // Quando o toast é fechado, muda o estado
      });
    }
  }, [showWelcomeToast, toast]);

  const goToNextItem = () => {
    if (currentItemIndex < evaluationItems.length) {
      setCurrentItemIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: "Avaliação completa",
        description: "Obrigado por fornecer seu feedback!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Execute qualquer outra lógica de conclusão aqui, se necessário
    }
  };

  return (
    <Center position="relative" w="100%" h="100vh" p={4} padding="10%">

      <Flex
        direction="column"
        align="center"
        w="full"
        maxW="md"
        justifyContent="center"
        zIndex="docked" // Isso garante que o Flex e seus filhos fiquem acima da Box de fundo
      >

        <Image src='logo.png' maxW="65%" marginBottom="25px" />
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
          borderWidth="1px"
          borderRadius="lg"
          borderStyle="solid"
          overflow="hidden"
          p={6}
          boxShadow="lg"
          bg="white"
          minW="300px"
          minH="400px"
        >
          <Image
            width="150px"
            height="150px"
            marginBottom="6%"
            src={
              currentItemIndex === 0
                ? 'response.png'
                : currentItemIndex === 1
                  ? 'approval.png'
                  : currentItemIndex === 2
                    ? 'headset.png'
                    : currentItemIndex === 3
                      ? 'racing.png'
                      : currentItemIndex === 4
                        ? 'target.png'
                        : currentItemIndex === 5
                          ? 'highfive.png'
                          : currentItemIndex === 6
                            ? 'validation.png'
                            : currentItemIndex === 7
                              ? 'thankyou.png'
                              : ''
            }
          />
          {transitions((props, item) => (
            <animated.div style={props}>
              <Flex direction="row" align="center" justify="center" w="full">
                <Heading fontSize="25px" textAlign="center">
                  {item || 'Avaliação Completa'}
                </Heading>
              </Flex>
            </animated.div>
          ))}
          {currentItemIndex < evaluationItems.length && (
            <StarRating key={`star-rating-${currentItemIndex}`} onRating={handleRating} />
          )}
          <CustomProgressBar ratings={ratings} />
        </Box>
      </Flex>
      {/* </Box> */}
    </Center>
  );
}
export default EvaluationForm;
