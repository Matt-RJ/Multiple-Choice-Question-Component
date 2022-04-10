import React, { useState, useRef, useEffect } from 'react';
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
  position: relative;
  border-radius: 100px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    border-radius: 22px;
  }
`

const Slider = styled.div(props => {
  // How much width (if row) a single option takes relative to container as a percentage
  const optionProportion = ( 1 / props.optionsLength) * 100;

  // How far right the slider should be if horizontal
  const sliderOffset = `${optionProportion * props.selectedOptionIdx}%`;

  // Determines whether to round the top, bottom, or neither
  const getVerticalBorderRadius = (props) => {
    if (props.optionsLength === 1) {
      return '20px 20px 20px 20px'; // Only selection
    } else if (props.selectedOptionIdx === 0) {
      return '20px 20px 0px 0px';   // First selection
    } else if (props.selectedOptionIdx === props.optionsLength - 1) {
      return '0px 0px 20px 20px';   // Last selection
    }
    return '0px'; // Middle selection
  };

  return {
    width: `${optionProportion}%`,
    'border-radius': '100px',
    'background': '#F8CAA3',
    left: '0',
    'margin-left': sliderOffset,
    display: 'block',
    position: 'absolute',
    height: '100%',
    transition: 'all .4s ease-in-out',
    'z-index': '5000',
    '@media only screen and (max-width: 600px)': {
      top: '0',
      width: '100%',
      height: `${optionProportion}%`,
      position: 'absolute',
      'margin-left': '0',
      'margin-top': props.sliderHeight * props.selectedOptionIdx,
      'border-radius': getVerticalBorderRadius(props),
    }
  }
});

const Choice = ({
  options,
  solved,
  providedAnswers,
  setProvidedAnswers,
  choiceId,
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0].id);
  const sliderRef = useRef(null);

  const selectedOptionIdx = options.findIndex(option => option.id === selectedOption);
  const sliderHeight = sliderRef?.current?.clientHeight || 0;

  useEffect(() => {
    const newAnswers = { ...providedAnswers };
    newAnswers[choiceId] = selectedOption;
    setProvidedAnswers(newAnswers);
  }, [selectedOption]);

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
      <Slider
        optionsLength={options.length}
        selectedOptionIdx={selectedOptionIdx}
        sliderHeight={sliderHeight}
        ref={sliderRef}
      />
    </ChoiceContainer>
  );
};

Choice.propTypes = {
  options: PropTypes.array.isRequired,
  solved: PropTypes.bool.isRequired,
  providedAnswers: PropTypes.object.isRequired,
  setProvidedAnswers: PropTypes.func.isRequired,
  choiceId: PropTypes.string.isRequired,
}

export default Choice;
