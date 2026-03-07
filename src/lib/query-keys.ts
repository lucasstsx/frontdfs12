import type { ListConhecimentosParams } from "#/lib/services/conhecimentos.service";

export interface AdminConhecimentosParams {
	titulo?: string;
	page?: number;
}

export interface AdminUsuariosParams {
	page?: number;
}

function normalizeConhecimentosParams(params?: ListConhecimentosParams) {
	// Normalizacao evita gerar chaves diferentes para filtros semanticamente iguais.
	return {
		busca: params?.busca?.trim() || undefined,
		categoria: params?.categoria || undefined,
		nivel: params?.nivel || undefined,
		page: params?.page ?? 1,
		limit: params?.limit,
	};
}

function normalizeAdminConhecimentosParams(params?: AdminConhecimentosParams) {
	// Mantem titulo/page estaveis para cache e invalidacao previsiveis no admin.
	return {
		titulo: params?.titulo?.trim() || "",
		page: params?.page ?? 1,
	};
}

function normalizeAdminUsuariosParams(params?: AdminUsuariosParams) {
	// Pagina e o unico filtro server-side da listagem de usuarios hoje.
	return {
		page: params?.page ?? 1,
	};
}

export const queryKeys = {
	conhecimentos: {
		all: ["conhecimentos"] as const,
		lists: ["conhecimentos", "list"] as const,
		list: (params?: ListConhecimentosParams) =>
			["conhecimentos", "list", normalizeConhecimentosParams(params)] as const,
		landing: ["conhecimentos", "landing"] as const,
		adminLists: ["admin", "conhecimentos", "list"] as const,
		adminList: (params?: AdminConhecimentosParams) =>
			[
				"admin",
				"conhecimentos",
				"list",
				normalizeAdminConhecimentosParams(params),
			] as const,
		adminSummary: ["admin", "conhecimentos", "summary"] as const,
	},
	pessoas: {
		adminLists: ["admin", "usuarios", "list"] as const,
		adminList: (params?: AdminUsuariosParams) =>
			[
				"admin",
				"usuarios",
				"list",
				normalizeAdminUsuariosParams(params),
			] as const,
		adminSummary: ["admin", "usuarios", "summary"] as const,
	},
	profile: {
		byId: (id: string) => ["profile", id] as const,
		meusConhecimentos: (id: string) =>
			["profile", id, "meus-conhecimentos"] as const,
	},
};
