import 'normalize.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import CC from './components/CC';
import Login from './components/Login';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="CC" element={<CC />} />
          <Route path="login" element={<Login />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
