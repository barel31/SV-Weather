import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Favorites from './components/Favorites/FavoritesPage';
import NavBar from './components/NavBar';
import Weather from './components/Weather/WeatherPage';

function App() {
  return (
    <main className="min-h-full p-4 text-center">
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/:cityName" element={<Weather />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
