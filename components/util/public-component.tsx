import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useAuth } from './context-user';

const PublicComponent = (Component: ComponentType) => {
  //const userToken = getCookieUser();
  return function ProtectedRoute({ ...props }) {
    const { userStorage } = useAuth() as any;
    const isOnline = userStorage?.id !== undefined;
    const { push, query } = useRouter();

    useEffect(() => {
      if (isOnline) {
        push(`/dashboard`);
      }
      // if (userToken && isOnline) {
      //   push(`/dashboard`);
      // }
    }, [isOnline, push, query]);

    return <Component {...props} />;
  };
};

export { PublicComponent };
