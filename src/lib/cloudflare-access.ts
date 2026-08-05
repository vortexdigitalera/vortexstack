export interface CloudflareAccessUser {
	email: string;
	userId: string;
	jwt?: string;
}

export function getCloudflareAccessUser(headers: Headers): CloudflareAccessUser | null {
	const email = headers.get("cf-access-authenticated-user-email");
	const userId = headers.get("cf-access-authenticated-user-id");
	const jwt = headers.get("cf-access-jwt-assertion");

	if (!email || !userId) {
		return null;
	}

	return {
		email,
		userId,
		jwt: jwt || undefined,
	};
}

export function getAccessLoginUrl(request: Request): string {
	const teamDomain = process.env.NEXT_PUBLIC_ACCESS_TEAM_DOMAIN;
	if (!teamDomain) {
		return "/login";
	}
	const returnUrl = encodeURIComponent(request.url);
	return `${teamDomain}/cdn-cgi/access/login?redirect_url=${returnUrl}`;
}

export function getAccessLogoutUrl(request: Request): string {
	const teamDomain = process.env.NEXT_PUBLIC_ACCESS_TEAM_DOMAIN;
	if (!teamDomain) {
		return "/";
	}
	const returnUrl = encodeURIComponent(new URL("/", request.url).toString());
	return `${teamDomain}/cdn-cgi/access/logout?redirect_url=${returnUrl}`;
}
