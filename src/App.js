import 'normalize.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import CC from './components/CC';
import Login from './components/Login';
import Layout from './components/Layout';
import Buzon from './components/Buzon';
import LayoutAdmin from './components/LayoutAdmin';
import EditTestimonial from './components/EditTestimonial';
import EditPost from './components/EditPost';
import Register from './components/Register';
import Nosotros from './components/Nosotros';
import ChangePassword from './components/ChangePassword';
import Career from './components/Career';
import NotFound from './components/NotFound';
import Posts from './components/Posts';
import EditCareer from './components/EditCareer';
import AdminPublications from './components/AdminPublications';
import AdminTestimonials from './components/AdminTestimonials';
import AdminCareers from './components/AdminCareers';
import AdminUsers from './components/AdminUsers';
import AdminCalendar from './components/AdminCalendar';
import EditSubject from './components/EditSubject';
import Suggestion from './components/Suggestion';
import AdminSuggestions from './components/AdminSuggestions';
import Admission from './components/Admission';
import SeeAdmission from './components/SeeAdmission';
import AdminAdmissions from './components/AdminAdmissions';
import Highschool from './components/Highschool';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Layout Page={Home} Title = "Universidad Monte Albán"/>} />
          <Route path="CC" element={<Layout Page={CC} Title = "Universidad Monte Albán - Creative Commons"/>} />
          <Route path="login" element={<Layout Page={Login} Title = "Universidad Monte Albán - Acceso"/>}/>
          <Route path="buzon" element={<Layout Page={Buzon} Title = "Universidad Monte Albán - Buzón de sugerencias"/>}/>
          <Route path="admisiones" element={<Layout Page={Admission} Title = "Universidad Monte Albán - Solicitud de admisión"/>}/>
          <Route path="register" element={<Layout Page={Register} Title = "Universidad Monte Albán - Registrarse"/>}/>
          <Route path="password" element={<Layout Page={ChangePassword} Title = "Universidad Monte Albán - Cambio de contraseña"/>}/>
          <Route path="nosotros" element={<Layout Page={Nosotros} Title = "Universidad Monte Albán - Nosotros"/>}/>
          <Route path="oferta/:id" element={<Layout Page={Career} Title = "Universidad Monte Albán - Ver carrera"/>}/>
          <Route path="publicaciones" element={<Layout Page={Posts} Title = "Universidad Monte Albán - Ver todas las publicaciones"/>}></Route>
          <Route path="sugerencia/:url" element={<Layout Page={Suggestion} Title = "Universidad Monte Albán - Ver sugerencia"/>}></Route>
          <Route path="admision/:url" element={<Layout Page={SeeAdmission} Title = "Universidad Monte Albán - Ver mensaje de admisión"/>}></Route>
          <Route path="highschool" element={<Layout Page={Highschool} Title = "Realiza tu preparatoria abierta en la Universidad Monte Albán"/>}></Route>
          <Route path="admin/">
            <Route index element={<Navigate to="/admin/posts" />} />
            <Route path="posts">
              <Route index element={<LayoutAdmin Page={AdminPublications} Title="Publicaciones"/>}/>
              <Route path="editpost/:id" element={<LayoutAdmin Page={EditPost} Title="Editar post"/>}/>
            </Route>
            <Route path="testimonials">
              <Route index element={<LayoutAdmin Page={AdminTestimonials} Title="Testimonios"/>}/>
              <Route path="editTestimonial/:id" element={<LayoutAdmin Page={EditTestimonial} Title="Editar testimonio"/>}/>
            </Route>
            <Route path="careers">
              <Route index element={<LayoutAdmin Page={AdminCareers} Title="Carreras"/>}/>
              <Route path="editCareer/:id" element={<LayoutAdmin Page={EditCareer} Title="Editar carrera"/>}/>
              <Route path="editSubject/:id" element={<LayoutAdmin Page={EditSubject} Title="Editar materia"/>}/>
            </Route>
            <Route path="users" element={<LayoutAdmin Page={AdminUsers} Title="Administradores y usuarios"/>}/>
            <Route path="calendar" element={<LayoutAdmin Page={AdminCalendar} Title="Administrar calendario"/>}/>
            <Route path="suggestions" element={<LayoutAdmin Page={AdminSuggestions} Title="Administrar sugerencias"/>}/>
            <Route path="admissions" element={<LayoutAdmin Page={AdminAdmissions} Title="Administrar admisiones"/>}/>
          </Route>
          <Route path="404" element={<Layout Page={NotFound} Title="Universidad Monte Albán - Página no encontrada"/>} />
        </Route>
        {<Route path="*" element={<Navigate to="/404" />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
