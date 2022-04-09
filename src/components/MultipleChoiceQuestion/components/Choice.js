import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Option from './Option';

const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  align-items: stretch;
  border: 2px solid #F9D29F;
  box-sizing: border-box;
  border-radius: 100px;

  /* filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); */
`

const Slider = styled.div`
  // TODO
`

const Choice = ({
  options,
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0].id);
  console.log(selectedOption);
  return (
    <ChoiceContainer>
      {options.map((option) => (
        <Option
          option={option}
          key={option.id}
          optionsLength={options.length}
          selected={option.id === selectedOption}
          setSelectedOption={setSelectedOption}
        />
      ))}
    </ChoiceContainer>
  );
};

Choice.propTypes = {
  options: PropTypes.array.isRequired,
}

export default Choice;