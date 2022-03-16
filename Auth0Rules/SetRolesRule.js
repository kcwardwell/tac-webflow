function setRolesToUser(user, context, callback) {
  // Roles should only be set to verified users.
  if (!user.email || !user.email_verified) {
    return callback(null, user, context);
  }
  let domain='';
  user.app_metadata = user.app_metadata || {};
  // You can add a Role based on what you want
  // In this case I check domain
  const addRolesToUser = function (user) {
  const domains = ['smithhorizon.com', 'theadaptiveceo.com' ];
  let domain='';
  const asterisk = user.email.indexOf('@');
  if(asterisk > -1){
      domain = user.email.substring(asterisk);
      if(domains.includes(domain)) {
              return ['admin'];
      } else {
              return ['member'];
          }
      }

  };
 
  const roles = addRolesToUser(user);

  user.app_metadata.roles = roles;
  auth0.users
    .updateAppMetadata(user.user_id, user.app_metadata)
    .then(function () {
      context.idToken['https://art.api/roles'] = user.app_metadata.roles;
      context.authorization.roles = user.app_metadata.roles;
      callback(null, user, context);      
    })
    .catch(function (err) {
      callback(err);
    });
}