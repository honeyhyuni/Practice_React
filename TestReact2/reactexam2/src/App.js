import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import RouteTest from "./components/RouteTest";

function App() {
  return (
    <div className="App">
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/diary/:id" element={<Diary />} />
          </Routes>
          <RouteTest />
        </BrowserRouter>
    </div>
  );
}

export default App;
