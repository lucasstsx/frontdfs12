import { api } from "../api";
import type { Conhecimento, PaginatedResponse } from "./conhecimentos.service";

export interface Pessoa {
	id: string;
	nome: string;
	email: string;
	telefone: string;
	descricao: string | null;
	isAdmin: boolean;
	criadoEm: string;
	conhecimentos?: Conhecimento[];
}

export const pessoasService = {
	async listAll(params?: {
		page?: number;
		limit?: number;
	}): Promise<PaginatedResponse<Pessoa>> {
		// Listagem administrativa paginada de usuarios.
		const { data } = await api.get<PaginatedResponse<Pessoa>>("/pessoas", {
			params,
		});
		return data;
	},

	async getById(id: string): Promise<Pessoa> {
		const { data } = await api.get<Pessoa>(`/pessoas/${id}`);
		return data;
	},

	async update(id: string, userData: Partial<Pessoa>): Promise<Pessoa> {
		const { data } = await api.patch<Pessoa>(`/pessoas/${id}`, userData);
		return data;
	},

	async delete(id: string): Promise<void> {
		await api.delete(`/pessoas/${id}`);
	},
};
