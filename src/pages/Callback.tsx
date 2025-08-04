import { useEffect, useRef } from 'react';
import { userManager } from '../auth/AuthService';
import { useNavigate } from 'react-router-dom';

const CallbackPage = () => {
  const navigate = useNavigate();
  const ranOnce = useRef(false); // <== guard against double call

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    userManager
      .signinRedirectCallback()
      .then((user) => {
        console.log('✅ Login successful. Access token:', user.access_token);
        navigate('/dashboard', { replace: true });
      })
      .catch((error) => {
        console.error('❌ Login failed:', error);
        navigate('/login', { replace: true });
      });
  }, [navigate]);

  return <p>Logging in...</p>;
};

export default CallbackPage;
