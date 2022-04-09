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
  width: 60%;
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
  }

  & > .answerText {
    /* H2 / Bold / 32px */

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 140%;
    /* identical to box height, or 45px */

    display: flex;
    align-items: center;

    /* White */

    color: white;
  }
`

const MultipleChoiceQuestion = ({
  questionPrompt,
  choices,
}) => {
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

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
            <Choice options={choice.options} key={choice.id} />
          </div>
        ))}
        <Text>
          <h2 className="answerText">{`The answer is ${answeredCorrectly ? 'correct!' : 'incorrect'}`}</h2>
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
