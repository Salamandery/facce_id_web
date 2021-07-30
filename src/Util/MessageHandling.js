import { toast } from 'react-toastify';

export default function MessageHandling(res, needNotify, IsNotNull) {
  if (res.data) {
    switch (res.data.status) {
      case 200:
      case 201:
        if (needNotify) toast.success(res.data.msg);
        if (IsNotNull && res.data.data.length > 0) return true;
        return !IsNotNull;
      case 400:
        for (let i = 0; i < res.data.errors.length; i++) {
          toast.info(res.data.errors[i].msg);
        }
        return false;
      case 401:
        for (let i = 0; i < res.data.errors.length; i++) {
          toast.error(res.data.errors[i].msg);
          if (res.data.errors[i].msg === 'Token inválido') {
            return 'logout';
          }
        }
        return false;
      default:
        for (let i = 0; i < res.data.errors.length; i++) {
          toast.warn(res.data.errors[i].msg);
        }
        return false;
    }
  }
}
