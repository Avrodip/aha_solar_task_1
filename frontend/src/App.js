import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './Registration';
import Datasheet from './Datasheet';
import UpdateEmployee from './UpdateEmployee';
import Gmap from './Gmap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/datasheet" element={<Datasheet />} />
        <Route path="/setaddress" element={<Gmap />} />
        <Route path="/update-employee/:eid" element={<UpdateEmployee />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
