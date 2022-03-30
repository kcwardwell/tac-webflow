var ManagementClient = require("auth0").ManagementClient;

exports.onExecutePostUserRegistration = async (event, api) => {
  const management = new ManagementClient({
    domain: event.secrets.domain,
    clientId: event.secrets.clientId,
    clientSecret: event.secrets.clientSecret,
    audience: "https://auth0react.auth0.com/api/v2/",
    scope: "read:users write:users",
    tokenProvider: {
      enableCache: true,
      cacheTTLInSeconds: 10,
    },
  });

  const memberRoles = ["rol_Ov4kxXjqjuYq2uGi"];
  // memberRoles.push(event.secrets.memberRole)
  const memberData = { roles: memberRoles };

  const adminRoles = ["rol_4KVILWDGTdBMeSE4"];
  // adminRoles.push(event.secrets.adminRole)
  const adminData = { roles: adminRoles };

  var param = { id: event.user.user_id };

  console.log("param", param);
  console.log("memberData", memberData);

  try {
    await management.assignRolestoUser(param, memberData);
    // if (
    //   event.user.email &&
    //   event.user.email.endsWith("@smithhorizons.com" || "@theadaptiveceo.com")
    // ) {
    //   await management.assignRolestoUser(param, adminData);
    // } else {
    //   await management.assignRolestoUser(param, memberData);
    // }
  } catch (error) {
    console.log(error);
  }
};
