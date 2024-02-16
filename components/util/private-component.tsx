import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useAuth } from './context-user';

const PrivateComponent = (Component: ComponentType) => {
  //const userToken = getCookieUser();
  return function ProtectedRoute({ ...props }) {
    const { userStorage } = useAuth() as any;
    const isOnline = userStorage?.id !== undefined;
    const { push, pathname } = useRouter();
    const linkHref =
      typeof window !== 'undefined' ? window.location.href : null;

    useEffect(() => {
      if (!isOnline) {
        push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
      }
      // if (!userToken && !isOnline) {
      //   push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
      // }
    }, [isOnline, pathname, push]);

    return <Component {...props} />;
  };
};

export { PrivateComponent };
