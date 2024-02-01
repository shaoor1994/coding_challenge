// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Listing from './components/Listing/Listing';
import UserProfile from './components/UserProfile/UserProfile';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
