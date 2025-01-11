import React, { useState } from 'react';

// Button-komponentti, joka vastaa yksittäisestä napista
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

// StatisticLine-komponentti, joka näyttää yhden tilastorivin
const StatisticLine = ({ text, value }) => (
  <p>
    {text}: {value}
  </p>
);

// Statistics-komponentti, joka näyttää tilastot
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

  if (total === 0) {
    return <p>Ei yhtään palautetta annettu</p>;
  }

  return (
    <div>
      <StatisticLine text="Hyvä" value={good} />
      <StatisticLine text="Neutraali" value={neutral} />
      <StatisticLine text="Huono" value={bad} />
      <StatisticLine text="Yhteensä" value={total} />
      <StatisticLine text="Keskiarvo" value={average.toFixed(1)} />
      <StatisticLine text="Positiivisia" value={`${positivePercentage.toFixed(1)} %`} />
    </div>
  );
};

const App = () => {
  // Tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Käsittelijäfunktiot palautteen antamiseen
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={handleGoodClick} text="Hyvä" />
      <Button handleClick={handleNeutralClick} text="Neutraali" />
      <Button handleClick={handleBadClick} text="Huono" />

      <h2>Statistiikka</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;