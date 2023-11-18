import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Team from "./pages/Team";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/:id" element={<Team />} />
      </Routes>
    </>
  );
}

export default App;
