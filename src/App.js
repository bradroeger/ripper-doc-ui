import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BodyMap from "./components/BodyMap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BodyMap />} />
      </Routes>
    </Router>
  );
}

export default App;
