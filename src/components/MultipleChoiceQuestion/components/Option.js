import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OptionContainer = styled.button`
  display: flex;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  justify-content: center;
  align-items: stretch;
  text-align: center;
  flex-grow: ${props => props.optionsLength || 2};
  flex-basis: 0;
  padding: 16px;
  background-color: transparent;
  border: 0;
  line-height: 100%;
  align-items: center;
  z-index: 5001;

  &.option {
    color: #FFFFFF;
  }

  &.selectedOption, &.selectedOptionBackground {
    border-radius: 100px;
    /* background: #F8CAA3; */
    align-self: stretch;
    color: #9F938B;
  }

  @media only screen and (max-width: 600px) {
    font-size: 0.9rem;
    /* margin-top: 6px; */
    /* margin-bottom: 6px; */

    border-radius: 0;

    &.selectedOption:first-child {
      border-radius: 20px 20px 0px 0px;
    }

    &.selectedOption:not(:first-child):not(:last-child) {
      border-radius: 0px;
    }

    &.selectedOption:last-child {
      border-radius: 0px 0px 20px 20px;
    }
  }
`

const Option = ({
  option,
  optionsLength,
  selected,
  setSelectedOption,
  solved,
}) => {
  const select = () => {
    if (!solved) {
      setSelectedOption(option.id);
    }
  }
  return (
    <OptionContainer
      onClick={select}
      optionsLength={optionsLength}
      className={selected ? 'selectedOption' : 'option'}
    >
      {option.text}
    </OptionContainer>
  );
};

Option.propTypes = {
  solved: PropTypes.bool.isRequired,
  option: PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default Option;
