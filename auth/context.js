import React, { useState, createContext, useContext, useEffect } from "react";
import auth from "./axiosAuth";
import Router from "next/router";
import { setCookie, removeCookie, getCookieFromBrowser } from "./cookies";
import jwt from "jwt-decode";
import axios from "axios";

//Création du context

const AuthContext = createContext({});

const formatUser = (user) => {
  // console.log("format", user);
  return {
    iat: user.iat,
    exp: user.exp,
    roles: user.roles[0],
    email: user.email,
    id: user._id,
  };
};

export const AuthProvider = ({ children }) => {
  //Définition du state de l'utilisateur
  const [user, setUser] = useState(null);
  //Définition du state loading => par défaut true
  const [loading, setLoading] = useState(true);

  //Permet à l'utilisateur de rester connecté même en rechargant la page
  useEffect(() => {
    async function loadUserFromCookies() {
      const token = getCookieFromBrowser("token");
      if (token) {
        try {
          // console.log("token ? context");
          // auth.defaults.headers["Authorization"] = "Bearer " + token;
          // Set default headers to common_axios ( as Instance )
          auth.defaults.headers["Authorization"] = "Bearer " + token;
          // Check your Header
          // console.log(auth.defaults.headers);
          const userData = formatUser(jwt(token));
          // console.log(jwt(token));
          // jwt(token);
          setUser(userData);
          // const { data: user } = await auth.get(`/api/users/${userData._id}`);
          // if (user) setUser(user);
        } catch (e) {
          if (e.response?.status === 401) {
            removeCookie("token");
            setUser(null);
            window.alert("Session expiré, veuillez vous reconnectez");
          }
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  //Requete login (envoie à body du username+password) Réponse: token

  const login = async (email, password) => {
    try {
      const { data: objToken } = await axios.post(
        `https://arcane-spire-42874.herokuapp.com/authentication_token`,
        {
          email,
          password,
        }
      );
      // console.log("objtoken", objToken);

      const { token } = objToken;
      //Si le token est reçu on définit le cookie
      if (token) {
        //1er paramètre : la clef qui est le nom que l'on donne au cookie (token), 2eme paramètre : la valeur du token
        setCookie("token", token);
        //Requete qui permet de mettre le token dans chaque entete
        auth.defaults.headers["Authorization"] = "Bearer " + token;
        // Check your Header
        // console.log(auth.defaults.headers);

        const userData = formatUser(jwt(token));

        //Requete pour récuperer le profil de l'utilisateur (_ pour mongodb)
        //const { data: user } = await auth.get(`/api/user/${userData._id}`);
        //Mise à jour de l'utilisateur => On lui passe la réponse
        setUser(userData);

        if (userData.roles === "ROLE_ADMIN") {
          await Router.push("/admin");
        } else if (userData.roles === "ROLE_PROPRIO") {
          await Router.push("/hebergeurs");
        } else {
          //Redirection vers la page d'accueil
          await Router.push("/");
        }
      }
    } catch (err) {
      console.log(error);
    }
  };

  const loginHebergeur = async (email, password) => {
    try {
      const { data: objToken } = await axios.post(
        `https://arcane-spire-42874.herokuapp.com/authentication_token`,
        {
          email,
          password,
        }
      );

      const { token } = objToken;
      //Si le token est reçu on définit le cookie
      if (token) {
        //1er paramètre : la clef qui est le nom que l'on donne au cookie (token), 2eme paramètre : la valeur du token
        setCookie("token", token);
        //Requete qui permet de mettre le token dans chaque entete
        auth.defaults.headers["Authorization"] = "Bearer " + token;
        // Check your Header
        // console.log(auth.defaults.headers);

        const userData = formatUser(jwt(token));
        //Requete pour récuperer le profil de l'utilisateur (_ pour mongodb)
        //const { data: user } = await auth.get(`/api/user/${userData._id}`);
        //Mise à jour de l'utilisateur => On lui passe la réponse
        setUser(userData);

        //Redirection vers la page d'accueil
        await Router.push("/hebergeurs/ajouter-un-bien");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Supprimer le cookie + mise à jour de l'utilisateur à null + redirection sur la page d'accueil
  const logout = () => {
    removeCookie("token");
    setUser(null);
    Router.push("/");
  };

  //Retourner le context
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        loading,
        loginHebergeur,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
//Exporter la fonction useAuth qui reçoit le context
export default function useAuth() {
  return useContext(AuthContext);
}
