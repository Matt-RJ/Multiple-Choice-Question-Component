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
  questionPrompt: 'An animal cell contains:',
  answers: {
    c1: 'o2',
    c2: 'o1',
    c3: 'o1',
    c4: 'o2',
  },
  choices: [
    {
      id: 'c1',
      options: [
        { text: 'Cell wall', id: 'o1' },
        { text: 'Ribosomes', id: 'o2' },
        { text: 'Large vacuole', id: 'o3' },
      ],
    },
    {
      id: 'c2',
      options: [
        { text: 'Cytoplasm', id: 'o1' },
        { text: 'Chloroplast', id: 'o2' },
      ],
    },
    {
      id: 'c3',
      options: [
        { text: 'Partially permeable membrane', id: 'o1' },
        { text: 'Impermeable membrane', id: 'o2' },
      ],
    },
    {
      id: 'c4',
      options: [
        { text: 'Cellulose', id: 'o1' },
        { text: 'Mitochondria', id: 'o2' },
      ],
    },
  ],
};

function App() {
  return (
    <>
      <GlobalStyle />
      <MultipleChoiceQuestion {...QUESTION_DATA} />
    </>
  );
}

export default App;
