import React from "react";
import {Navigate} from "react-router-dom";
import {AuthService} from "../../service/auth-service";

interface PrivateRouteProps {
    component: React.ComponentType
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({component: PrivateComponent}) => {

    if (!AuthService.isAuthenticated())
        return <Navigate to={'/login'}/>;

    return <PrivateComponent/>;
}