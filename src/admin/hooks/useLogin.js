import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

    
export const useLogin = () => {

    const { dispatch } = useAuthContext();

    const [ error, setErrors] = useState(null);
    const [ isLoading, setIsLoading] = useState(null);

    const login = async ( email, password)=>{

        setIsLoading(true);
        setErrors(null); 

        const response = await fetch('http://192.168.0.146:10000/sime/api/login',{
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {'Content-Type': 'application/json'}
            });

        const json = await response.json();
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json)); // save the user to local storage to keep logged in
            dispatch({type: 'LOGIN', payload: json});//updating global state (user status) to re-render a DOM
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setErrors(json.Error);
        }
    }

    return { login, isLoading, error };
}
