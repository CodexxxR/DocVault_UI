export function getUserRoles(user: any) {

  if (!user?.access_token) return [];

  const payload = user.access_token.split('.')[1];

  const decoded = JSON.parse(atob(payload));

  return decoded?.resource_access?.["docvault-Frontend"]?.roles ?? [];

}
