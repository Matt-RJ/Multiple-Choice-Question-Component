import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OptionContainer = styled.div`
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 160%;
  /* or 38px */

  display: flex;
  justify-content: center;
  flex-grow: ${props => props.optionsLength || 2};
  flex-basis: 0;

  &.option {
    color: #FFFFFF;
  }

  &.selectedOption {
    border-radius: 100px;
    background: #F8CAA3;
    color: #9F938B;
  }
`

const Option = ({
  option,
  optionsLength,
  selected,
  setSelectedOption,
}) => {
  // console.log(selected);
  return (
    <OptionContainer
      onClick={() => setSelectedOption(option.id)}
      optionsLength={optionsLength}
      className={selected ? 'selectedOption' : 'option'}
    >
      <h4>
        {option.text}
      </h4>
    </OptionContainer>
  );
};

Option.propTypes = {
  option: PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })
}

export default Option;
