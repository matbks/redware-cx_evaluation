import React, { useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Text,
  Tooltip,
  useStyleConfig,
} from '@chakra-ui/react';
import { useSpring, animated } from 'react-spring';
import { StarIcon } from '@chakra-ui/icons';

function StarRating({ totalStars = 5, onRating, onClear }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);
  const [ratingDescription, setRatingDescription] = useState("");
  
  // O useStyleConfig pode ser removido se não estiver sendo usado para personalização adicional
  const styles = useStyleConfig("StarRating");

  const ratings = ['Ruim', 'Okay', 'Bom', 'Ótimo', 'Excelente!'];

  const springProps = useSpring({
    to: { transform: hoverRating ? 'scale(1.2)' : 'scale(1)' },
    from: { transform: 'scale(1)' },
    config: { tension: 300, friction: 10 },
  });

const getColor = (index) => {
    if (hoverRating >= index + 1 || currentRating >= index + 1) {
      return index < 1 ? 'red.500' :
        index < 2 ? 'orange.400' :
          index < 3 ? 'yellow.400' :
            index < 4 ? 'green.400' : 'blue.500';
    }
    return 'gray.300';
  };
// const getColor = (index) => {
//     if (currentRating >= index + 1) {
//       return index < 1 ? 'red.500' :
//         index < 2 ? 'orange.400' :
//           index < 3 ? 'yellow.400' :
//             index < 4 ? 'green.400' : 'blue.500';
//     }
//     if (hoverRating >= index + 1) {
//       return index < 1 ? 'red.500' :
//         index < 2 ? 'orange.400' :
//           index < 3 ? 'yellow.400' :
//             index < 4 ? 'green.400' : 'blue.500';
//     }
//     return 'gray.300';
//   };

  return (
    <Flex direction="column" align="center" >
      <Flex direction="row">
        {[...Array(totalStars)].map((_, index) => (
          <Tooltip key={index} label={ratings[index]} placement="bottom" isOpen={hoverRating === index + 1}>
            <animated.div
              style={springProps}
              onMouseEnter={() => {
                setHoverRating(index + 1);
                setRatingDescription(ratings[index]);
              }}
              onMouseLeave={() => {
                setHoverRating(0);
                setRatingDescription("");
              }}
              onClick={() => {
                setCurrentRating(index + 1);
                onRating(index + 1); 
                onClear();  
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
        {/* <Text fontSize="md" mt={2}>{ratingDescription}</Text> */}
      </Box>
    </Flex>
  );
}

export default StarRating;
