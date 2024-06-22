import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventRegistrationForm from './Component/EventRegistration';
import JobApplicationForm from './Component/JobApplication';
import Level3 from './Component/Level-3';
import HomePage from './Component/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/level-1' element={<EventRegistrationForm />}></Route>
        <Route path='/level-2' element={<JobApplicationForm />}></Route>
        <Route path='/level-3' element={<Level3 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
