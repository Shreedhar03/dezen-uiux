import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTronLink } from '@/hooks/TronHooks';

interface User {
  address: string;
  username: string;
  profilePicture?: string;
  bio?: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isUserLoading: boolean;
  setUserLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setUserLoading] = useState<boolean>(false);
  const { address } = useTronLink();

  useEffect(() => {
    const autoSignIn = async () => {
      if (address) {
        setUserLoading(true);
        try {
          const response = await fetch(`/api/user/${address}`);
          if (response.status === 404) {
            const postRequest = await fetch('/api/user/default', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ address: address }),
            });
            if (!postRequest.ok) {
              throw new Error('Failed to create new user');
            }
            const postResponse = await postRequest.json();
            if (postResponse.success) {
              console.log('New user created with address:', address);
              setUser(postResponse.user);
              console.log('User created:', postResponse.user);
            }
          } else {
            const userData = await response.json();
            setUser(userData);
            console.log('User found:', userData);
          }
        } catch (error) {
          console.error('Error in user sign-in process:', error);
        } finally {
          setUserLoading(false);
        }
      }  else {
        setUserLoading(false);
      }
    };

    autoSignIn();
  }, [address]);

  return (
    <UserContext.Provider value={{ user, setUser, isUserLoading, setUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
