import React from 'react';
import { createGlobalStyle } from 'styled-components';

import MultipleChoiceQuestion from './components/MultipleChoiceQuestion/MultipleChoiceQuestion';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const QUESTION_DATA = {
  questionPrompt: 'An animal cell has:',
  answers: {
    c1: 'o2',
    c2: 'o1',
    c3: 'o1',
  },
  choices: [
    {
      id: 'c1',
      options: [
        { text: 'A cell wall', id: 'o1' },
        { text: 'Ribosomes', id: 'o2' },
        { text: 'A large vacuole', id: 'o3' },
        { text: 'A sturdy, rectangular shape', id: 'o4' },
      ],
    },
    {
      id: 'c2',
      options: [
        { text: 'Cytoplasm', id: 'o1' },
        { text: 'Chloroplasts', id: 'o2' },
      ],
    },
    {
      id: 'c3',
      options: [
        { text: 'A partially permeable membrane', id: 'o1' },
        { text: 'An impermeable membrane', id: 'o2' },
        { text: 'No membrane', id: 'o3' },
      ],
    },
  ],
};

function App() {
  // Randomizing order of choices and options for each choice
  QUESTION_DATA.choices.sort(() => Math.random() - 0.5).map((choice) => {
    return {
      ...choice,
      options: choice.options.sort(() => Math.random() - 0.5),
    }
  });
  return (
    <>
      <GlobalStyle />
      <MultipleChoiceQuestion
        questionPrompt={QUESTION_DATA.questionPrompt}
        choices={QUESTION_DATA.choices}
        answers={QUESTION_DATA.answers}
      />
    </>
  );
}

export default App;
