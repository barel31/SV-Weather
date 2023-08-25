import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Favorites from './components/Favorites';
import NavBar from './components/NavBar';
import Weather from './components/Weather';

function App() {
  return (
    <div className="min-h-full p-4">
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/:cityName" element={<Weather />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
