import { createContext, useState, useContext, useEffect } from "react";
import axios from '../api/axios'
import { array } from "zod";
import Cookie from 'js-cookie'

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
  const [errors, setErrors] = useState(null);

  const sign = async (data) => {
    try {
      const res = await axios.post("/signin", data);
      setUser(res.data)    
      setIsAuth(true)  

      return res.data
    } catch (error) {
      console.log(error);
      if(Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
    }    
  };

  const registerUser = async (data) => {
    try {
      const res = await axios.post("/register", data);
      setUser(res.data)    
      setIsAuth(true)  

      return res.data     
    } catch (error) {
      console.log(error);
      if(Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
    }    
  };  

  useEffect(()=>{
    if(Cookie.get('token')){
      axios.
        get("/profile")
        .then((res) => {
          setUser(res.data)
          setIsAuth(true)
        })
        .catch((err) => {
          setUser(null)
          setIsAuth(false)
        })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        sign,
        registerUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
