import React from 'react';
import Title from '../components/HomePage/Title';
import NavigateButton from '../components/HomePage/NavigateButton';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <Title />
      <NavigateButton />
    </div>
  );
};

export default HomePage;
