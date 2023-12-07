import axios from "axios";
import { apiClient } from "./ApiClient";

export function retrieveHelloWorldText(token) {
  return apiClient.get(`/hello`);
}
export function retrieveHelloWorldBean(token) {
  return apiClient.get(`/hello-bean`);
}

export function retrieveHelloWorldBeanPathVariable(username) {
  return apiClient.get(`/hello-bean/${username}`);
}
