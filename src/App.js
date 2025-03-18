import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BodyMap from "./components/BodyMap";
import ShopPage from "./pages/ShopPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BodyMap />} />
        <Route path="/:part" element={<ShopPage />} />
      </Routes>
    </Router>
  );
}

export default App;
