import { createContext, useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store';

export const LoginContext = createContext()

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key)
    result = JSON.stringify(result)
    return result
}

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userRole, setUserRole] = useState(null)

    async function LoginAction(key, value) {
        try {
            await SecureStore.setItemAsync(key, value)
            setIsLoggedIn(true)
        } catch (error) {
            throw error
        }
    }
    async function UserInfo(key, value) {
        try {
            await SecureStore.setItemAsync(key, JSON.stringify(value))
            setUserRole(value.role)
        } catch (error) {
            throw error
        }
    }

    async function LogoutAction(key) {
        try {
            await SecureStore.deleteItemAsync(key)
            setIsLoggedIn(false)
        } catch (error) {
            throw error
        }
    }
 

    useEffect(() => {
        getValueFor("access_token").then((data) => {
            if (data) {
                setIsLoggedIn(true)
            }
        })
    }, [])


    return (
        <LoginContext.Provider value={{ userRole, UserInfo, isLoggedIn, setIsLoggedIn, LoginAction, LogoutAction }}>
            {children}
        </LoginContext.Provider>
    )
}
