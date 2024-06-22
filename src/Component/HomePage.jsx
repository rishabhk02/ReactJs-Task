import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
  return (
    <div className="home-page">
      <header>
        <h1>Welcome</h1>
        <p>Greetings! We're glad you're here.</p>
      </header>
      <main>
        <div className="button-container">
          <button className="btn btn-primary" onClick={()=> navigate('/level-1')} >Level 1</button>
          <button className="btn btn-primary" onClick={()=> navigate('/level-2')}>Level 2</button>
          <button className="btn btn-primary" onClick={()=> navigate('/level-3')}>Level 3</button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;