import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Favorites from './components/Favorites';
import NavBar from './components/NavBar';
import Weather from './components/Weather';

type FavoritesData = {
  // cityKey:    cityName
  [key: string]: string;
};

function App() {
  const [favorites, setFavorites] = useState<FavoritesData>({});

  const toggleFavorite = (cityKey: string, cityName: string) => {
    if (!Object.keys(favorites).includes(cityKey)) {
      setFavorites((state) => ({ ...state, [cityKey]: cityName }));
    } else {
      setFavorites((state) => {
        const stateCopy = { ...state };
        delete stateCopy[cityKey];
        return stateCopy;
      });
    }
  };

  const isFavorite = (cityKey: string) =>
    Object.keys(favorites).includes(cityKey);

  return (
    <div className="App min-h-full">
      <Router>
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={
              <Weather
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/:cityName"
            element={
              <Weather
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
