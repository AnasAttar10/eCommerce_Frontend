import { API_VERSION, BASE_URL } from '@util/constants';
import axios from 'axios';
import { useState } from 'react';

type TEmailStatus =
  | 'idle'
  | 'checking'
  | 'available'
  | 'notAvailable'
  | 'failed';
const useCheckingEmail = () => {
  const [enteredEmail, setEnterdEmail] = useState<null | string>(null);
  const [emailStatus, setEmailStatus] = useState<TEmailStatus>('idle');
  const handleCheckingEmail = async (email: string) => {
    setEnterdEmail(email);
    setEmailStatus('checking');
    try {
      const { data } = await axios.get(
        `${BASE_URL + API_VERSION}auth/checkEmail/${email}`
      );
      if (!data.data.length) {
        setEmailStatus('available');
      } else {
        setEmailStatus('notAvailable');
      }
    } catch (error) {
      setEmailStatus('failed');
    }
  };
  const reset = () => {
    setEmailStatus('idle');
    setEnterdEmail(null);
  };
  return { enteredEmail, emailStatus, handleCheckingEmail, reset };
};
export default useCheckingEmail;
