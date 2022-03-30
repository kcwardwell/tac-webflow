/**
* Handler that will be called during the execution of a PostLogin flow.
*
/**
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
/**
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
 exports.onExecutePostLogin = async (event, api) => {
  const userRolesUpdated = event.user.app_metadata.roles || [];
  const adminRole = "admin";
  const memberRole = "member";
  const horizonEmail = "@horizonsmith.com";
  const ceoEmail = "@theadaptiveceo.com";
  let emailServer = null;
  if (event.user.email) {
    emailServer = event.user.email.substring(event.user.email.indexOf("@"));
    const roleName =
    emailServer === (horizonEmail || ceoEmail) ? adminRole : memberRole;
    if (!userRolesUpdated.includes(roleName)) {
      userRolesUpdated.push(roleName);
    }
  }
  const namespace = 'https://agileapi.com';

  // Note the two different methods here.
  
  api.user.setAppMetadata('roles', userRolesUpdated); 
  api.idToken.setCustomClaim(`${namespace}/roles`, userRolesUpdated);
  api.accessToken.setCustomClaim(`${namespace}/roles`, userRolesUpdated);
};

/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
// exports.onContinuePostLogin = async (event, api) => {
// };
