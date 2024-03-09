import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../Main/index.js";

import Layout from "../../components/Layout/index.js";
import Loader from "../../components/Loader/index.js";

// FIXME: REMOVE TO SEPERATE CONTAINER
function SearchPage() {
  return <div>Search Page</div>;
}

function ChangedCurrencyPage() {
  return <div>ChangedCurrency Page</div>;
}

function CurrencyPage() {
  return <div>Currency Page</div>;
}

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
