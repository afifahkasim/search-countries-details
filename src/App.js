import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./screens/Details.js";
import Home from "./screens/Home.js";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
  );
}

export default App;
