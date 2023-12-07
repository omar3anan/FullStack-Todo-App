import { apiClient } from "./ApiClient";
export function executeBasicAuthenticationService(token) {
  //3alshan enta 3amel basic secuirty already fy spring w gahez el Basic Authentication fa bt check howa howa wla la compare between them
  return apiClient.get(`/basicauth`, {
    headers: {
      Authorization: token,
    },
  });
}
export function executeJWTAuthenticationService(username, password) {
  return apiClient.post(`/authenticate`, {
    username,
    password,
  }); //gahza fyl spring oAuth2
}

//talama 7atet Spring-Secuirty
//lazem t7ot el basic Token
//el token dah ba3mlo mn el front fyl AuthContext 3alshan at2ked mn el token bta3ty sah wla la w 3amlo executeBasicAuthenticationService
