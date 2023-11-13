import Cookies from 'js-cookie';
import apiUserInstance from './../../service/api-user';

const Authorization = () => {
  const token = Cookies.get("token");
  apiUserInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
}
export default Authorization;