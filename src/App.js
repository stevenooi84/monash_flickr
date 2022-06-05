import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './page/Login';
import Search from './page/Search';
import CreateAccount from './page/CreateAccount';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
