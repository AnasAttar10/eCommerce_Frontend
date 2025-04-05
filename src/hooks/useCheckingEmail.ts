import axios from 'axios';
import { useState } from 'react';
import.meta.env;
type TEmailStatus =
  | 'idle'
  | 'checking'
  | 'available'
  | 'notAvailable'
  | 'failed';
const useCheckingEmail = () => {
  const [enteredEmail, setEnteredEmail] = useState<null | string>(null);
  const [emailStatus, setEmailStatus] = useState<TEmailStatus>('idle');
  const handleCheckingEmail = async (email: string) => {
    setEnteredEmail(email);
    setEmailStatus('checking');
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VERSION}auth/checkEmail/${email}`
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
    setEnteredEmail(null);
  };
  return { enteredEmail, emailStatus, handleCheckingEmail, reset };
};
export default useCheckingEmail;
