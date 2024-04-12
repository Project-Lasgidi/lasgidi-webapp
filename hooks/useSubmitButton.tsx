import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

export const useSubmitButton = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const delayedSetHoverTrue = useCallback(
    debounce(() => setIsHovered(true), 250),
    []
  );
  const handleSubmitMouseEnter = () => {
    delayedSetHoverTrue();
  };
  const handleSubmitMouseLeave = () => {
    delayedSetHoverTrue.cancel();
    setIsHovered(false);
  };

  const submitStroke = isHovered ? 'black' : 'white';

  return {
    submitStroke,
    handleSubmitMouseEnter,
    handleSubmitMouseLeave,
  };
};
