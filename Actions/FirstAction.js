/**
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
exports.onExecutePostLogin = async (event, api) => {
  const userRolesUpdated = event.user.app_metadata.roles || [];
  const adminRole = "admin";
  const memberRole = "member";
  const horizonEmail = "horizonsmith.com";
  const ceoEmail = "theadaptiveceo.com";

  if (event.user.email) {
    const domain = event.user.email.substring(event.user.email.indexOf("@"));
    const roleName =
      domain === horizonEmail || ceoEmail ? adminRole : memberRole;
    if (!userRolesUpdated.includes(roleName)) {
      userRolesUpdated.push(roleName);
    }
  }

  // Note the two different methods here.
  api.user.setAppMetadata("roles", userRolesUpdated);
  api.user.setUserMetadata("hasRoles", userRolesUpdated);
  //   const namespace = 'https://artapi.com';

  api.idToken.setCustomClaim("hasRoles", true);
  api.accessToken.setCustomClaim("roles", userRolesUpdated);
};
