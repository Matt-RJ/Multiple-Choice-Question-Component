import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Option from './Option';

const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;

  border: 2px solid #F9D29F;
  box-sizing: border-box;
  border-radius: 100px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    border-radius: 22px;
  }
`

const Choice = ({
  options,
  solved,
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0].id);
  return (
    <ChoiceContainer>
      {options.map((option) => (
        <Option
          option={option}
          key={option.id}
          optionsLength={options.length}
          selected={option.id === selectedOption}
          setSelectedOption={setSelectedOption}
          solved={solved}
        />
      ))}
    </ChoiceContainer>
  );
};

Choice.propTypes = {
  options: PropTypes.array.isRequired,
  solved: PropTypes.bool.isRequired,
}

export default Choice;
