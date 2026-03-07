import { api } from "../api";

export interface Conhecimento {
	id: string;
	titulo: string;
	descricao: string;
	categoria: string;
	nivel: string;
	pessoaId: string;
	pessoa?: {
		id: string;
		nome: string;
		email: string;
		telefone: string;
	};
	criadoEm: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export interface ListConhecimentosParams {
	busca?: string;
	categoria?: string;
	nivel?: string;
	page?: number;
	limit?: number;
}

export const conhecimentosService = {
	async list(
		params?: ListConhecimentosParams,
	): Promise<PaginatedResponse<Conhecimento>> {
		const { data } = await api.get<PaginatedResponse<Conhecimento>>(
			"/conhecimentos",
			{
				params: {
					...params,
					categoria:
						params?.categoria === "TODOS" ? undefined : params?.categoria,
					nivel: params?.nivel === "TODOS" ? undefined : params?.nivel,
				},
			},
		);
		return data;
	},

	async create(
		conhecimento: Omit<Conhecimento, "id" | "criadoEm">,
	): Promise<Conhecimento> {
		const { data } = await api.post<Conhecimento>(
			"/conhecimentos",
			conhecimento,
		);
		return data;
	},

	async update(
		id: string,
		conhecimento: Partial<Conhecimento>,
	): Promise<Conhecimento> {
		const { data } = await api.patch<Conhecimento>(
			`/conhecimentos/${id}`,
			conhecimento,
		);
		return data;
	},

	async delete(id: string): Promise<void> {
		await api.delete(`/conhecimentos/${id}`);
	},
};
