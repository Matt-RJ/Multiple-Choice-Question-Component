import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Choice from './components/Choice';

const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #F6B868 0%, #EE6B2D 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  border: 2px white;
  justify-content: space-evenly;
`
const Text = styled.div`
  display: flex;
  justify-content: center;
  color: white;

  & > .questionText  {
    /* H1 / Bold / 40px */
    font-family: Mulish, sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 160%;
    color: white;
    text-align: center;

    @media only screen and (max-width: 600px) {
      font-size: 32px;
    }
  }

  & > .answerText {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 140%;
    text-align: center;
    display: flex;
    align-items: center;
    color: white;

    @media only screen and (max-width: 600px) {
      font-size: 26px;
    }
  }
`

const MultipleChoiceQuestion = ({
  questionPrompt,
  choices,
}) => {
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    // TODO: Map choices, get how many are correct
  });

  return (
    <BackgroundWrapper>
      <QuestionContainer>
        <Text>
          <h1 className="questionText">{questionPrompt}</h1>
        </Text>
        {choices.map(choice => (
          <div>
            <Choice options={choice.options} solved={solved} key={choice.id} />
          </div>
        ))}
        <Text>
          <h2 className="answerText">{`The answer is ${solved ? 'correct!' : 'incorrect'}`}</h2>
        </Text>
      </QuestionContainer>
    </BackgroundWrapper>
  )
};

MultipleChoiceQuestion.propTypes = {
  questionPrompt: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MultipleChoiceQuestion;
