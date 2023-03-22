import React from 'react'
import { Navigate } from "react-router-dom";
import useCheckToken from '../hooks/useCheckToken';
import { useValue } from '../context/ContextProvider';



const  Protected = ({currentUser, children}) => {

    if (!currentUser) {

        return <Navigate to="/dashboard" replace />;

    }

    return children
}

export default Protected