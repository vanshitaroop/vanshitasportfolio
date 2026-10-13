import { Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";
import AnonymousFeedback from "./pages/AnonymousFeedback";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/feedback" element={<AnonymousFeedback />} />
    </Routes>
  );
}
