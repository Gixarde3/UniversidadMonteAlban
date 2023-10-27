import 'normalize.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import CC from './components/CC';
import Login from './components/Login';
import Layout from './components/Layout';
import Buzon from './components/Buzon';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Layout Page={Home} Title = "Universidad Monte ALbán"/>} />
          <Route path="CC" element={<Layout Page={CC} Title = "Universidad Monte ALbán - Creative Commons"/>} />
          <Route path="login" element={<Layout Page={Login} Title = "Universidad Monte ALbán - Acceso"/>}/>
          <Route path="buzon" element={<Layout Page={Buzon} Title = "Universidad Monte ALbán - Buzón de sugerencias"/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
