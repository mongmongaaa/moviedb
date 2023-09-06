import "./App.scss";
import {HashRouter, Route,Link, Routes} from "react-router-dom";
import Home from "./page/Home";
import MovieList from "./page/MovieList";
import Tvlist from "./page/Tvlist";
import Context from "./Context";
import Detail from "./page/Detail";

function App() {
  return (
    <Context>
    <HashRouter>
      <div>
        <header>
          <nav>
            <span><h2>YFLIX</h2></span>
            <ul>
              <li>
                <Link to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/MovieList">Movies</Link>
              </li>
              <li>
                <Link to="/Tvlist">TV Series</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/MovieList" element={<MovieList/>} />
              <Route path="/Tvlist" element={<Tvlist/>} />
              <Route path="/Detail/:type/:id" element={<Detail/>} />
            </Routes>
        </main>
      </div>
    </HashRouter>
    </Context>
  );
}

export default App;
