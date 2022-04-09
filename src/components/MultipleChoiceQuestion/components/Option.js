import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OptionContainer = styled.div`
  display: flex;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: ${props => props.optionsLength || 2};
  flex-basis: 0;
  padding-left: 16px;
  padding-right: 16px;

  & h4 {
    margin-top: 16px;
    margin-bottom: 16px;
    line-height: 100%;
  }

  &.option {
    color: #FFFFFF;
  }

  &.selectedOption, &.selectedOptionBackground {
    border-radius: 100px;
    background: #F8CAA3;
    color: #9F938B;
  }

  @media only screen and (max-width: 600px) {
    & h4 {
      font-size: 0.9rem;
      margin-top: 6px;
      margin-bottom: 6px;
    }

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
}) => {
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
