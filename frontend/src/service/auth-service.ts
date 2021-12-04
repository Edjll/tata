import axios from "axios";
import {RequestService} from "./request-service";
import {Role} from "./role";

interface TokenResponse {
    accessToken: string,
    accessTokenExpires: number,
    refreshToken: string;
    refreshTokenExpires: number;
}

interface CookieToken {
    accessToken: string | null,
    refreshToken: string | null,
}

interface ParsedAccessToken {
    sub: number,
    exp: number,
    username: string,
    roles: Role []
}

enum AuthType {
    PASSWORD = 'PASSWORD', REFRESH_TOKEN = 'REFRESH_TOKEN'
}

export class AuthService {
    private static accessToken: string | null;
    private static accessTokenExpires: number | null;
    private static refreshToken: string | null;
    private static refreshTokenExpires: number | null;
    private static authenticated: boolean = false;
    private static parsedAccessToken: ParsedAccessToken;

    private static Constants = class {
        static readonly ACCESS_TOKEN: string = 'accessToken';
        static readonly REFRESH_TOKEN: string = 'refreshToken';
    }

    public static hasRole(roles: Role []): boolean {
        if (roles.length === 0) return true;
        return roles.find(role => AuthService.parsedAccessToken.roles[0] === role) !== undefined;
    }

    public static init(callback: Function): void {
        const cookie: CookieToken = AuthService.parseCookie();
        if (!!cookie.accessToken) {
            AuthService
                .verifyAccessToken(cookie.accessToken)
                .then(() => AuthService.saveAccessByCookie(cookie))
                .catch(() => {
                    if (!!cookie.refreshToken) {
                        return AuthService
                            .loginByRefreshToken(cookie.refreshToken)
                            .catch(() => AuthService.clearCookie());
                    }
                    return Promise.reject();
                })
                .finally(() => callback());
        } else if (!!cookie.refreshToken) {
            AuthService
                .loginByRefreshToken(cookie.refreshToken)
                .catch(() => AuthService.clearCookie())
                .finally(() => callback());
        } else {
            callback();
        }
    }

    private static verifyAccessToken(accessToken: string): Promise<void> {
        return axios.get(
            RequestService.BACKEND_URL + 'v1/auth/verify',
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            }
        );
    }

    public static login(username: string, password: string): Promise<void> {
        return axios.post(
            RequestService.BACKEND_URL + 'v1/auth/token',
            {
                username: username,
                password: password,
                type: AuthType.PASSWORD
            }
        )
            .then(response => {
                AuthService.saveAccess(response.data);
                console.log(AuthService.parsedAccessToken)
            });
    }

    private static saveAccess(tokenResponse: TokenResponse): void {
        AuthService.accessToken = tokenResponse.accessToken;
        AuthService.accessTokenExpires = tokenResponse.accessTokenExpires;
        AuthService.refreshToken = tokenResponse.refreshToken;
        AuthService.refreshTokenExpires = tokenResponse.refreshTokenExpires;

        AuthService.authenticated = true;

        AuthService.parsedAccessToken = AuthService.parseAccessToken(AuthService.accessToken);

        AuthService.saveCookie();
    }

    private static saveAccessByCookie(cookieToken: CookieToken): void {
        AuthService.accessToken = cookieToken.accessToken;
        AuthService.refreshToken = cookieToken.refreshToken;

        AuthService.authenticated = true;

        AuthService.parsedAccessToken = AuthService.parseAccessToken(AuthService.accessToken as string);
    }

    private static parseAccessToken(accessToken: string): ParsedAccessToken {
        return JSON.parse(decodeURIComponent(escape(atob(accessToken.split('.')[1]))));
    }

    public static isAuthenticated(): boolean {
        return AuthService.authenticated;
    }

    private static saveCookie(): void {
        document.cookie = `${AuthService.Constants.ACCESS_TOKEN}=${AuthService.accessToken}; path=/; max-age=${AuthService.accessTokenExpires}`;
        document.cookie = `${AuthService.Constants.REFRESH_TOKEN}=${AuthService.refreshToken}; path=/; max-age=${AuthService.refreshTokenExpires}`;
    }

    private static clearCookie() {
        document.cookie = `${AuthService.Constants.ACCESS_TOKEN}=; path=/; max-age=-1`;
        document.cookie = `${AuthService.Constants.REFRESH_TOKEN}=; path=/; max-age=-1`;

        AuthService.authenticated = false;
    }

    private static parseCookie(): CookieToken {
        const cookies = document.cookie.split('; ');

        const dirtyAccessToken: string | undefined = cookies.find(row => row.startsWith(`${AuthService.Constants.ACCESS_TOKEN}=`));
        const accessToken: string | null = dirtyAccessToken !== undefined ? dirtyAccessToken.split('=')[1] : null;

        const dirtyRefreshToken: string | undefined = cookies.find(row => row.startsWith(`${AuthService.Constants.REFRESH_TOKEN}=`));
        const refreshToken: string | null = dirtyRefreshToken !== undefined ? dirtyRefreshToken.split('=')[1] : null;

        return {accessToken: accessToken, refreshToken: refreshToken};
    }

    public static updateToken(callback: Function): Promise<any> {
        if (!!AuthService.refreshToken && AuthService.isTokenExpired()) {
            return AuthService
                .loginByRefreshToken(null)
                .then(() => callback());
        }
        return Promise
            .resolve()
            .then(() => callback());
    }

    public static isTokenExpired(): boolean {
        return !!AuthService.accessTokenExpires && (AuthService.accessTokenExpires - Math.ceil(new Date().getTime() / 1000) - 5) < 0;
    }

    private static loginByRefreshToken(refreshToken: string | null): Promise<void> {
        let token = null;

        if (!!refreshToken) token = refreshToken;
        else if (!!AuthService.refreshToken) token = AuthService.refreshToken;
        else Promise.reject();

        return axios.post(
            RequestService.BACKEND_URL + 'v1/auth/token',
            {
                refreshToken: token,
                type: AuthType.REFRESH_TOKEN
            }
        )
            .then(response => AuthService.saveAccess(response.data))
    }

    public static getAccessToken(): string | null {
        return AuthService.accessToken;
    }

    public static getUsername(): string | null {
        return AuthService.authenticated ? AuthService.parsedAccessToken.username : null;
    }

    public static logout() {
        return RequestService
            .getInstance()
            .post(RequestService.BACKEND_URL + 'v1/auth/logout')
            .then(() => {
                AuthService.clearCookie();
                window.location.pathname = '/';
            });
    }
}