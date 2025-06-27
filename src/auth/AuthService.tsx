
import { UserManager } from 'oidc-client-ts';

const oidcConfig = {
  authority: 'http://localhost:8080/realms/DocVault', 
  client_id: 'docvault-Frontend',
  redirect_uri: window.location.origin + '/callback',
  response_type: 'code',
  scope: 'openid profile email',
};

export const userManager = new UserManager(oidcConfig);
