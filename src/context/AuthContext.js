import { Children, createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebaseConfig";



const UserContext = createContext();
//I have used a context since I was using this methods in multiple pages 
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    //Create user, sign in, and signout can be done with firebase authentication service
    const createUser = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }
    //useEffect hook is helping to get user signed out
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ createUser, user, logout, signIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};