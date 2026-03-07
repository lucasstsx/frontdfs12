import { queryOptions } from "@tanstack/react-query";
import {
	type AdminConhecimentosParams,
	type AdminUsuariosParams,
	queryKeys,
} from "#/lib/query-keys";
import { authService } from "#/lib/services/auth.service";
import {
	conhecimentosService,
	type ListConhecimentosParams,
} from "#/lib/services/conhecimentos.service";
import { pessoasService } from "#/lib/services/pessoas.service";

export function conhecimentosListQueryOptions(
	params?: ListConhecimentosParams,
) {
	return queryOptions({
		queryKey: queryKeys.conhecimentos.list(params),
		queryFn: () => conhecimentosService.list(params),
	});
}

export function conhecimentosLandingQueryOptions() {
	return queryOptions({
		queryKey: queryKeys.conhecimentos.landing,
		queryFn: () => conhecimentosService.list({ page: 1, limit: 6 }),
	});
}

export function adminConhecimentosListQueryOptions(
	params?: AdminConhecimentosParams,
) {
	const normalizedTitulo = params?.titulo?.trim() || "";
	const page = params?.page ?? 1;

	return queryOptions({
		// A chave usa params normalizados para bater com a estrategia de invalidacao.
		queryKey: queryKeys.conhecimentos.adminList({
			titulo: normalizedTitulo,
			page,
		}),
		queryFn: () =>
			conhecimentosService.list({
				busca: normalizedTitulo || undefined,
				page,
			}),
	});
}

export function adminConhecimentosSummaryQueryOptions() {
	return queryOptions({
		// Summary do dashboard mostra amostra recente e total via meta.
		queryKey: queryKeys.conhecimentos.adminSummary,
		queryFn: () => conhecimentosService.list({ page: 1, limit: 5 }),
	});
}

export function adminUsuariosListQueryOptions(params?: AdminUsuariosParams) {
	const page = params?.page ?? 1;

	return queryOptions({
		queryKey: queryKeys.pessoas.adminList({ page }),
		queryFn: () => pessoasService.listAll({ page }),
	});
}

export function adminUsuariosSummaryQueryOptions() {
	return queryOptions({
		// Limit 1 reduz payload; o card usa principalmente o total vindo da meta.
		queryKey: queryKeys.pessoas.adminSummary,
		queryFn: () => pessoasService.listAll({ page: 1, limit: 1 }),
	});
}

export function profileQueryOptions(userId: string) {
	return queryOptions({
		queryKey: queryKeys.profile.byId(userId),
		queryFn: () => authService.getProfile(userId),
		enabled: !!userId,
	});
}
