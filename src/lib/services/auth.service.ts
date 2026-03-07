import { jwtDecode } from "jwt-decode";
import { api } from "../api";
import { type Conhecimento } from "./conhecimentos.service";

export interface UserTokenPayload {
	id: string;
	email: string;
	isAdmin: boolean;
	exp: number;
}

export interface LoginResponse {
	token: string;
}

export interface UserProfile {
	id: string;
	nome: string;
	email: string;
	telefone: string;
	descricao: string;
	isAdmin: boolean;
	criadoEm: string;
	conhecimentos: Conhecimento[];
}

export const authService = {
	async login(credentials: { email: string; senha: string }): Promise<LoginResponse> {
		const { data } = await api.post<LoginResponse>("/auth/login", credentials);
		return data;
	},

	async register(userData: {
		nome: string;
		email: string;
		telefone: string;
		descricao: string;
		senha: string;
	}): Promise<UserProfile> {
		const { data } = await api.post<UserProfile>("/pessoas", userData);
		return data;
	},

	async getProfile(id: string): Promise<UserProfile> {
		const { data } = await api.get<UserProfile>(`/pessoas/${id}`);
		return data;
	},

	async updateProfile(id: string, userData: Partial<UserProfile>): Promise<UserProfile> {
		const { data } = await api.patch<UserProfile>(`/pessoas/${id}`, userData);
		return data;
	},

	setToken(token: string) {
		localStorage.setItem("token", token);
	},

	getToken(): string | null {
		return localStorage.getItem("token");
	},

	logout() {
		localStorage.removeItem("token");
	},

	getUserFromToken(): UserTokenPayload | null {
		const token = this.getToken();
		if (!token) return null;
		try {
			return jwtDecode<UserTokenPayload>(token);
		} catch {
			return null;
		}
	},

	isAuthenticated(): boolean {
		const payload = this.getUserFromToken();
		if (!payload) return false;
		// Verifica se o token expirou
		const now = Date.now() / 1000;
		return payload.exp > now;
	},
};
