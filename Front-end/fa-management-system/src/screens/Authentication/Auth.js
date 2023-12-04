import Cookies from 'js-cookie';
import apiUserInstance from './../../service/api-user';

const Authorization = () => {
  const token = Cookies.get("token");
  if (token) {
    apiUserInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }
  else {
    apiUserInstance.defaults.headers.common["Authorization"] = null;
  }
}
export default Authorization;