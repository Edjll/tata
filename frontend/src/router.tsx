import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./component/header/header";
import {Login} from "./component/auth/login";
import {CleanCityMap} from "./component/map/clean-city-map/clean-city-map";
import {Camera} from "./component/camera/camera";
import {CameraVideo} from "./component/camera/camera-video";
import {LineChart} from "./component/chart/line-chart";
import {Home} from "./component/home/home";
import {Admin} from "./component/admin/admin";
import {RegistrationOperator} from "./component/admin/registration-operator";
import {RegistrationCamera} from "./component/admin/registration-camera";
import {AdminOperators} from "./component/admin/admin-operators";
import {AdminCameras} from "./component/admin/admin-cameras";

const Router = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/clean-city'} element={<CleanCityMap/>}>
                    <Route path={':id'} element={
                        <Camera>
                            <CameraVideo/>
                            <LineChart/>
                        </Camera>
                    }/>
                </Route>
                <Route path={'/admin'} element={<Admin/>}>
                    <Route path={'operators/registration'} element={<RegistrationOperator/>}/>
                    <Route path={'operators'} element={<AdminOperators/>}/>
                    <Route path={'cameras/registration'} element={<RegistrationCamera/>}/>
                    <Route path={'cameras'} element={<AdminCameras/>}/>
                </Route>
                <Route path={'/'} element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
