import React from 'react';
import './Home.css';
import ParticleCanvas from './ParticleCanvas';

const Home: React.FC = () => {
  return (
    <>
      <ParticleCanvas />
      <div id="about-wrapper-pink" className="wrapper-slideup-1">
        <div id="about-wrapper-white" className="wrapper-slideup-2">
          <div id="wrapper" className="wrapper-slideup-3">
            <h1 className="glitch" data-text="guilherme vescovi nicchio">
              guilherme vescovi nicchio
            </h1>
            <span className="sub typewriter">doing cool stuff</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
