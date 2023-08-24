import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="top-0 border-slate-500 flex gap-3 px-3 py-4">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
    </nav>
  );
}

export default NavBar;
