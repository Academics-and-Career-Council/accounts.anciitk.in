export const BACKEND_ROOT_URL = "https://api.anciitk.in";

export const BASE_URL = "https://api.anciitk.in/";
export const KRATOS_BROWSER_URL = "https://api.anciitk.in/.ory/kratos/public";
export const KRATOS_PUBLIC_URL = "https://api.anciitk.in/.ory/kratos/public";
export const KRATOS_ADMIN_URL = "http://127.0.0.1:4434";

export default {
    kratos: {
        browser: KRATOS_BROWSER_URL,
        admin: KRATOS_ADMIN_URL,
        public: KRATOS_PUBLIC_URL,
    },
    register: `${BACKEND_ROOT_URL}/register`,
    recover: `${BACKEND_ROOT_URL}/recover`,
    baseUrl: BASE_URL,
    projectName: "SecureApp",
    routes: {
        settings: {
            path: "/settings",
        },
        recovery: {
            path: "/recovery",
        },
        verification: {
            path: "/verify",
        },
        login: {
            path: "/login",
        },
        registration: {
            path: "/registration",
        },
    },
};