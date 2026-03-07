import axios from "axios";

export const AUTH_UNAUTHORIZED_EVENT = "auth:unauthorized";

/**
 * Instância do Axios para comunicação com o backend.
 * O backend roda localmente por padrão.
 */
export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Interceptor para lidar com erros globais (ex: 401 Unauthorized)
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Se o token expirou ou é inválido, limpa o localStorage e redireciona
			localStorage.removeItem("token");
			if (typeof window !== "undefined") {
				window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
			}
		}
		return Promise.reject(error);
	},
);
