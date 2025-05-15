import { createContext, useState, useContext, useEffect } from "react";
import axios from "../api/axios";
import { array, set } from "zod";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

//Exportar de forma automatica
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deberia estar dentro de un provider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [registros, setRegistros] = useState([]);

  const navigate = useNavigate()

  const sign = async (data) => {
    try {
      const res = await axios.post("/signin", data);
      setUser(res.data);
      setIsAuth(true);

      return res.data;
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const registerUser = async (data) => {
    try {
      const res = await axios.post("/register", data);
      setUser(res.data);
      setIsAuth(true);

      return res.data;
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = async() => {
    await axios.post("/logout");
    setUser(null);
    setIsAuth(false); 
    navigate("/")
  }

  const getUserRecords = async () => {
    try {
      const res = await axios.get(`/registros_user/${user.idduenio}`)
      if(res.data.registro.length === 0) {
        setErrors(["No tienes registros de mascotas"]);
        setRegistros([]);
      } else {
        setRegistros(Array.isArray(res.data.registro) ? res.data.registro : []);
        setErrors(null);
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      } else {
         setErrors([error.response.data.message]);
      }
      setRegistros([]);
    }
  }

  useEffect(() => {
    setLoading(true)
    if (Cookie.get("token")) {
      setLoading(true);
      axios
        .get("/profile")
        .then((res) => {
          setUser(res.data);
          setIsAuth(true);
          setLoading(false)
        })
        .catch((err) => {
          setUser(null);
          setIsAuth(false);
          setLoading(false)
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        registros,
        getUserRecords,
        errors,
        loading,
        sign,
        registerUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
