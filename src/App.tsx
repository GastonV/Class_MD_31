import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Houses from './Pages/Houses';
import House from './Pages/House';

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/houses" />} />
    <Route path="/houses" element={<Houses />} />
    <Route path="/characters" element={<House />}>
      <Route path=":slug" element={<House />} />
    </Route>
  </Routes>
);
export default App;
