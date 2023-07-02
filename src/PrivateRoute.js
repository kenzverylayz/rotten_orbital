import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from "./firebase";

export default function PrivateRoute({ element, ...rest }) {
    const currentUser = auth.currentUser;

    return currentUser ? (
        <Route {...rest} element={element} />
    ) : (
        <Navigate to="/login" replace={true} />
    );
}
