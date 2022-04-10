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
  overflow: auto;
  margin: auto;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 2px white;
  justify-content: space-evenly;
  @media only screen and (max-width: 600px) {
    gap: 10px;
  }
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

const ChoicesContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  @media only screen and (max-width: 600px) {
    gap: 10px;
  }
`

const MultipleChoiceQuestion = ({
  questionPrompt,
  choices,
  answers,
}) => {
  const [solved, setSolved] = useState(false);
  const [providedAnswers, setProvidedAnswers] = useState({});

  useEffect(() => {
    // Proportion of correct answers, ranging from 0 to 1, rounded to 2 decimal places
    const getCorrectAnswerProportion = (realAnswers, givenAnswers) => {
      const totalRealAnswers = Object.keys(realAnswers).length;
      let totalCorrectAnswers = 0;
      Object.keys(realAnswers).forEach((answerKey) => {
        if (answers[answerKey] === givenAnswers[answerKey]) {
          totalCorrectAnswers++;
        }
      });
      return Math.round((totalCorrectAnswers / totalRealAnswers) * 100) / 100;
    }

    if (getCorrectAnswerProportion(answers, providedAnswers) === 1) {
      setSolved(true);
    }
  }, [answers, providedAnswers]);

  return (
    <BackgroundWrapper>
      <QuestionContainer>
        <Text>
          <h1 className="questionText">{questionPrompt}</h1>
        </Text>
        {choices.map(choice => (
          <ChoicesContainer>
            <Choice
              options={choice.options}
              solved={solved}
              providedAnswers={providedAnswers}
              setProvidedAnswers={setProvidedAnswers}
              key={choice.id}
              choiceId={choice.id}
            />
          </ChoicesContainer>
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
  answers: PropTypes.object.isRequired,
}

export default MultipleChoiceQuestion;
