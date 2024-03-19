import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, onValue, update as firebaseUpdate } from 'firebase/database';
import { auth, database } from './firebase';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                // Fetch additional user data from Firebase, e.g., balance
                const userRef = ref(database, `users/${firebaseUser.uid}`);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val() || {};
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName,
                        balance: userData.balance || 100,
                    });
                }, {
                    onlyOnce: true
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Login error:", error.message);
            throw error;
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    const updateBalance = async (newBalance) => {
        if (!user || !user.uid) return;

        const userRef = ref(database, `users/${user.uid}`);
        await firebaseUpdate(userRef, { balance: newBalance });

        // Update the balance in the local state
        setUser((currentUser) => ({
            ...currentUser,
            balance: newBalance,
        }));
    };

    return (
        <UserContext.Provider value={{ user, login, logout, updateBalance }}>
            {children}
        </UserContext.Provider>
    );
};
