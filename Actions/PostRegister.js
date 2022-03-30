

exports.onExecutePostUserRegistration= async (event, api) => {
    const ManagementClient = require("auth0").ManagementClient;
    
  
    const namespace = 'https://agileapi.com/';
  
    const management = new ManagementClient({
      domain: event.secrets.domain,
      clientId: event.secrets.clientId,
      clientSecret: event.secrets.clientSecret,
      scope: "read:roles create:roles update:roles",
    });
  
    const memberRole = { 'roles' : [event.secrets.memberRole]};
    const adminRole = { 'roles' : [event.secrets.adminRole]};
    var param = { id :  event.user.user_id};
  
    try {
      if (event.authorization) {
        if (!event.user.email) {
          return;
        } else if (event.user.email && event.user.email.endsWith("@smithhorizons.com" || "@theadaptiveceo.com")) {
            api.idToken.setCustomClaim(`${namespace}/roles`, event.secrets.adminRole);
            api.accessToken.setCustomClaim(`${namespace}/roles`, event.secrets.adminRole);
            await management.assignRolestoUser(param.id, adminRole);
        } else {
            api.idToken.setCustomClaim(`${namespace}/roles`, event.secrets.memberRole);
            api.accessToken.setCustomClaim(`${namespace}/roles`, event.secrets.memberRole);
            await management.assignRolestoUser(param.id, memberRole);
        }
      }
    } catch (e) {
      console.log(e);
    }
  
  };