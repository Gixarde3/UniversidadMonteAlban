import 'normalize.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import HomeAdmin from './components/HomeAdmin';
import CC from './components/CC';
import Login from './components/Login';
import Layout from './components/Layout';
import Buzon from './components/Buzon';
import LayoutAdmin from './components/LayoutAdmin';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Layout Page={Home} Title = "Universidad Monte Albán"/>} />
          <Route path="CC" element={<Layout Page={CC} Title = "Universidad Monte Albán - Creative Commons"/>} />
          <Route path="login" element={<Layout Page={Login} Title = "Universidad Monte Albán - Acceso"/>}/>
          <Route path="buzon" element={<Layout Page={Buzon} Title = "Universidad Monte Albán - Buzón de sugerencias"/>}/>
          <Route path="admin/">
            <Route index element={<LayoutAdmin Page={HomeAdmin} Title="Inicio"/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
