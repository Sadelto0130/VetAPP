import { Routes, Route, Outlet, useLocation } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { PetProvider } from "./context/PetContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Registros from "./pages/Registros";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import Pets from "./pages/Pets";
import FormMascota from "./pages/FormMascota";
import PetRecord from "./pages/PetRecord";
import CreateRecord from "./pages/CreateRecord";

import Navbar from "./components/navbar/Navbar";
import { Container } from "./components/ui";
import EditRecord from "./pages/EditRecord";
import ScrollTop from "./pages/ScrollTop";
import PetProfile from "./pages/PetProfile";
import { useState } from "react";

function App() {
  const { isAuth, loading } = useAuth();  
  const location = useLocation()

  return (
    <>
      {/* Aplica el fondo solo si la ruta no es "/" (homepage) */}
      {location.pathname !== "/" && (
        <div
          className="fixed inset-0 w-full h-full opacity-50 z-0 overflow-hidden"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/vector-gratis/coleccion-personas-diferentes-mascotas_23-2148402944.jpg?t=st=1743231691~exp=1743235291~hmac=2574067afa2027763921792cc6999dc71c06b002335920f3262d245e6cbdd435&w=996')",
            backgroundSize: "auto",
            backgroundPosition: "center",
            backgroundRepeat: "repeat-y",
            backgroundAttachment: "fixed",
          }}
        ></div>
      )}
      <Navbar />
      <ScrollTop />
      <Container className="py-6">
        <Routes>
          <Route
            element={
              <ProtectedRoute isAllowed={!isAuth} registerTo="/pets" />
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route
            element={<ProtectedRoute isAllowed={isAuth} registerTo="/" />}
          >
            <Route path="/profile" element={<ProfilePage />} />

            <Route
              element={
                <PetProvider>
                  <Outlet />
                </PetProvider>
              }
            >
              <Route path="/pets" element={<Pets />} />
              <Route path="/pet/add_pet" element={<FormMascota />} />
              <Route path="/pet/records" element={<Registros />} />
              <Route path="/pet/:id/edit_pet" element={<FormMascota />} />
              <Route path="/pet/:id/records" element={<PetRecord />} />
              <Route path="/pet/:id/create_record" element={<CreateRecord />} />
              <Route path="/pet/edit_record/:id" element={<CreateRecord />} />
              <Route path="/pet/:id/profile" element={<PetProfile />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
