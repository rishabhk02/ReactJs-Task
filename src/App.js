import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventRegistrationForm from './Component/EventRegistration';
import JobApplicationForm from './Component/JobApplication';
import Level3 from './Component/Level-3';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/level-1' element={<EventRegistrationForm />}></Route>
        <Route path='/level-2' element={<JobApplicationForm />}></Route>
        <Route path='/level-3' element={<Level3 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
