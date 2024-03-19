import React, { createContext, useState, useContext } from 'react';

const initialState = {
  users: [{ id: 'initialUserId', balance: 0 }],
  updateUserBalance: () => {},
};

const UserContext = createContext(initialState);

// Context Provider Component
export const UserProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // Function to update the balance of the currently logged-in user
  const updateUserBalance = (userId, newBalance) => {
    setState((prevState) => ({
      ...prevState,
      users: prevState.users.map((user) =>
        user.id === userId ? { ...user, balance: newBalance } : user
      ),
    }));
  };

  return (
    <UserContext.Provider value={{ ...state, updateUserBalance }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContext;
