import React, { useState } from 'react';
import {
  Box,
  Flex,
  Icon, 
  Tooltip, 
} from '@chakra-ui/react';
import { useSpring, animated } from 'react-spring';
import { StarIcon } from '@chakra-ui/icons';

function StarRating({ totalStars = 5, onRating, onClear }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);  

  const ratings = ['Ruim', 'Okay', 'Bom', 'Ótimo', 'Excelente!'];

  const springProps = useSpring({
    to: { transform: hoverRating ? 'scale(1.2)' : 'scale(1)' },
    from: { transform: 'scale(1)' },
    config: { tension: 300, friction: 10 },
  });
//   const starColors = {
//     1: '#F15A29', // Cor vibrante laranja-avermelhada
//     2: '#F7931E', // Cor laranja brilhante
//     3: '#FBB03B', // Cor amarela alaranjada
//     4: '#00A99D', // Cor turquesa médio
//     5: '#0071BC', // Cor azul royal
// };


const getColor = (index) => {
    if (hoverRating >= index + 1 || currentRating >= index + 1) {
      return index < 1 ? '#F15A29' :
        index < 2 ? '#F7931E' :
          index < 3 ? '#FBB03B' :
            index < 4 ? '#00A99D' : '#0071BC';
    }
    return 'gray.300';
  }; 

  return (
    <Flex direction="column" align="center" >
      <Flex direction="row">
        {[...Array(totalStars)].map((_, index) => (
          <Tooltip key={index} label={ratings[index]} placement="bottom" isOpen={hoverRating === index + 1}>
            <animated.div
              style={springProps}
              onMouseEnter={() => {
                setHoverRating(index + 1);
                // setRatingDescription(ratings[index]);
              }}
              onMouseLeave={() => {
                setHoverRating(0);
                // setRatingDescription("");
              }}
              onClick={() => {
                setCurrentRating(index + 1);
                onRating(index + 1); 
                // onClear(); 
              }}
            >
              <Icon
                as={StarIcon}
                cursor="pointer"
                color={getColor(index)}
                w={10}
                h={10}
              />
            </animated.div>
          </Tooltip>
        ))}
      </Flex>
      <Box height="22px"> 
      </Box>
    </Flex>
  );
}

export default StarRating;
