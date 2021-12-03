import axios from "axios";
import {AuthService} from "./auth-service";

export class RequestService {

    private static axi = axios.create();

    public static BACKEND_URL = 'http://localhost:8080/api/';

    public static init() {
        RequestService.axi.interceptors.request.use((config) => {
            if (AuthService.isAuthenticated()) {
                const cb = () => {
                    config.headers =  {
                        Authorization: `Bearer ${AuthService.getAccessToken()}`
                    };
                    return Promise.resolve(config);
                };
                return AuthService.updateToken(cb);
            }
            return config;
        });
    }

    public static getInstance() {
        return RequestService.axi;
    }
}