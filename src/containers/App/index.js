import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../Main/index.js";
import ChangedCurrencyPage from "../ChangedCurrency/index.js";
import CurrencyPage from "../Currency/index.js";
import SearchPage from "../Search/index.js";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/changed" element={<ChangedCurrencyPage />} />
        <Route path="/currency/:id" element={<CurrencyPage />} />
      </Routes>
    </Router>
  );
}
