import "./App.css";
import CreateVideoObject from "./components/CreateVideoObject";
import SimpleUpload from "./components/SimpleUpload";
import SingleVideo from "./components/SingleVideo";
import Navbar from "./components/Navbar.js";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/upload" element={<CreateVideoObject />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/video/:id" element={<SingleVideo />} />
          <Route exact path="/search/:query" element={<SearchResults />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
