import { useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Favorites from './components/Favorites';
import NavBar from './components/NavBar';
import Weather from './components/Weather';
import reducer from './lib/reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, { favorites: {} });

  return (
    <div className="min-h-full p-4">
      <Router>
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={<Weather state={state} dispatch={dispatch} />}
          />
          <Route
            path="/:cityName"
            element={<Weather state={state} dispatch={dispatch} />}
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={state.favorites} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
