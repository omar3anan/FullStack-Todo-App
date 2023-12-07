import React, { createContext, useState, useContext } from "react";
import {
  executeBasicAuthenticationService,
  executeJWTAuthenticationService,
} from "../Api/AuthenticationApiService";
import { apiClient } from "../Api/ApiClient";

export const AuthContext = createContext(); //create context can be shared with the rest of the application

export const useAuth = () => useContext(AuthContext); //custom hook to use the context

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  //bagebhom mn el loginComponent
  async function loginAuthenticate(username, password) {
    const basicToken = "Basic " + window.btoa(username + ":" + password); //to creete basic authentication
    //add promise as background process Async , await
    try {
      const response = await executeBasicAuthenticationService(basicToken); //compare el token el 3amlto bl mawgod already gahez fyl Spring-Secuirty
      console.log(response);
      if (response.status == 200) {
        setAuthenticated(true);
        setUsername(username);
        setToken(basicToken);
        apiClient.interceptors.request.use((config) => {
          //hena ba2olo ay request mn el backend endpoint 7ot el header dah
          console.log("Send a request to the Backend");
          config.headers.Authorization = basicToken; //7ot el token fyl header wenta btb3at
          return config;
        });
        return true;
      } else {
        loginAuthenticate();
        return false;
      }
    } catch (error) {
      loginAuthenticate();
      return false;
    }
  }
  function logoutAuthenticate() {
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        loginAuthenticate,
        logoutAuthenticate,
        username,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// async function loginAuthenticate(username, password) {
//   try {
//     const response = await executeJWTAuthenticationService(basicToken); //compare el token el 3amlto bl mawgod already gahez fyl Spring-Secuirty
//     console.log(response);
//     if (response.status == 200) {
//       const JWT = "Bearer " + response.data.token;
//       setAuthenticated(true);
//       setUsername(username);
//       setToken(JWT);
//       apiClient.interceptors.request.use((config) => {
//         //hena ba2olo ay request mn el backend endpoint 7ot el header dah
//         console.log("Send a request to the Backend");
//         config.headers.Authorization = JWT; //7ot el token fyl header wenta btb3at
//         return config;
//       });
//       return true;
//     } else {
//       loginAuthenticate();
//       return false;
//     }
//   } catch (error) {
//     loginAuthenticate();
//     return false;
//   }
// }
