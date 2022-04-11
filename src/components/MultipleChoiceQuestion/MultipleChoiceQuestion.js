import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Choice from './components/Choice';

const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => `linear-gradient(180deg, ${
    props.proportionalThemes[props.themeIdx].backgroundGradientStartColor
  } 0%, ${
    props.proportionalThemes[props.themeIdx].backgroundGradientEndColor} 100%)`
  };
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  margin: auto;
  transition: all 3s;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 2px white;
  /* justify-content: space-evenly; */
  gap: 20px;
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
  proportionalThemes,
}) => {
  const [solved, setSolved] = useState(false);
  const [providedAnswers, setProvidedAnswers] = useState({});

  // Used to determine which color scheme to use, depending on how close to the answer one is
  const [themeIdx, setThemeIdx] = useState(0);

  useMemo(() => {
    const startingAnswers = {};
    choices.forEach((choice) => {
      startingAnswers[choice.id] = choice.options[0].id;
    });
    setProvidedAnswers(startingAnswers);
  }, [choices]);
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

    const correctAnswerProportion = getCorrectAnswerProportion(answers, providedAnswers);

    // Setting theme based on how close the answer is

    // Maps a number 'num' with a value range fromMin-fromMax to the equivalent were it toMin-toMax
    const mapRange = (num, fromMin, fromMax, toMin, toMax) => {
      return (num - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
    }
    const themeIdx = Math.round(mapRange(correctAnswerProportion, 0, 1, 1, proportionalThemes.length)) -1;
    setThemeIdx(themeIdx);

    if (correctAnswerProportion === 1) {
      setSolved(true);
    }
  }, [answers, proportionalThemes.length, providedAnswers]);

  return (
    <BackgroundWrapper
      proportionalThemes={proportionalThemes}
      themeIdx={themeIdx}
    >
      <QuestionContainer>
        <Text>
          <h1 className="questionText">{questionPrompt}</h1>
        </Text>
        {choices.map(choice => {
          return (
          <ChoicesContainer>
            <Choice
              options={choice.options}
              solved={solved}
              providedAnswers={providedAnswers}
              setProvidedAnswers={setProvidedAnswers}
              key={choice.id}
              choiceId={choice.id}
              proportionalThemes={proportionalThemes}
              themeIdx={themeIdx || 0}
            />
          </ChoicesContainer>
        )})}
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
  proportionalThemes: PropTypes.arrayOf(PropTypes.shape({
    backgroundGradientStartColor: PropTypes.string.isRequired,
    backgroundGradientEndColor: PropTypes.string.isRequired,
    sliderBackgroundColor: PropTypes.string.isRequired,
    selectedTextColor: PropTypes.string.isRequired,
  })).isRequired,
}

export default MultipleChoiceQuestion;
