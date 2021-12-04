import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./component/header/header";
import {Login} from "./component/auth/login";
import {MapPage} from "./component/map/map-page/map-page";
import {Camera} from "./component/camera/camera";
import {Home} from "./component/home/home";
import {Admin} from "./component/admin/admin";
import {RegistrationOperator} from "./component/admin/registration-operator";
import {RegistrationCamera} from "./component/admin/registration-camera";
import {AdminOperators} from "./component/admin/admin-operators";
import {AdminCameras} from "./component/admin/admin-cameras";
import {Dashboard} from "./component/dashboard/dashboard";
import {DashboardCard} from "./component/dashboard/dashboard-card";
import {CameraInfo} from "./component/camera/camera-info";
import {CleanCityChart} from "./component/chart/clean-city-chart";
import {FriendOfHumanChart} from "./component/chart/friend-of-human-chart";
import { PrivateRoute } from './component/private/private-route';

const Router = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/clean-city'} element={<MapPage to={'clean-city'}/>}>
                    <Route path={':id'} element={
                        <Camera>
                            <CameraInfo/>
                            <CleanCityChart/>
                        </Camera>
                    }/>
                </Route>
                <Route path={'/friend-of-human'} element={<MapPage to={'friend-of-human'}/>}>
                    <Route path={':id'} element={
                        <Camera>
                            <CameraInfo/>
                            <FriendOfHumanChart/>
                        </Camera>
                    }/>
                </Route>
                <Route path={'/admin'} element={<PrivateRoute component={Admin}/>}>
                    <Route path={'operators/registration'} element={<RegistrationOperator/>}/>
                    <Route path={'operators'} element={<AdminOperators/>}/>
                    <Route path={'cameras/registration'} element={<RegistrationCamera/>}/>
                    <Route path={'cameras'} element={<AdminCameras/>}/>
                </Route>
                <Route path={'/dashboard'} element={<PrivateRoute component={Dashboard}/>}>
                    <Route path={':service/:id'} element={<DashboardCard/>}/>
                </Route>
                <Route path={'/'} element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
