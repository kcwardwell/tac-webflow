//  <script src="https://cdn.auth0.com/js/auth0-spa-js/1.13/auth0-spa-js.production.js"></script>

{/* <script> */}
  
  // The Auth0 client, initialized in configureClient()
  let auth0 = null;

  /**
   * Starts the authentication flow
   */
  const login = async (url) => {
    try {
      console.log("Logging in", url);

      // Update the targetUrl to point to define the redirect after login
      const loginPath = document.querySelector("meta[name=loginPath]").content;
      const targetUrl = loginPath;
      console.log('loginPath', loginPath, 'targetUrl', targetUrl)
      //
      const options = {
        redirect_uri: window.location.origin,
        appState: { targetUrl }
      };

      await auth0.loginWithRedirect(options);
    } catch (err) {
      console.log("Log in failed", err);
    }
  };

  /**
   * Executes the logout flow
   */
  const logout = () => {
    try {
      console.log("Logging out");

      auth0.logout({
        returnTo: window.location.origin
      });
    } catch (err) {
      console.log("Log out failed", err);
    }
  };

  /**
   * Initializes the Auth0 client
   */
  const configureClient = async () => {
    const domain = document.querySelector("meta[name=domain]").content;
    const clientId = document.querySelector("meta[name=clientId]").content;

    auth0 = await createAuth0Client({
      domain: domain,
      client_id: clientId
    });
  };

  // Will run when page finishes loading
  window.onload = async () => {
    await configureClient();
    updateDom();

    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
      console.log("> User is authenticated");

      window.history.replaceState({}, document.title, window.location.pathname);
      updateUI();

      return;
    }

    console.log("> User not authenticated");

    const query = window.location.search;
    const shouldParseResult = query.includes("code=") && query.includes("state=");

    if (shouldParseResult) {
      console.log("> Parsing redirect");
      try {
        const result = await auth0.handleRedirectCallback();

        if (result.appState && result.appState.targetUrl) {
          window.location.replace(result.appState.targetUrl);
        }

        console.log("Logged in!");
      } catch (err) {
        console.log("Error parsing redirect:", err);
      }
    }

    updateUI();
  };

  /**
   * Iterates over the elements matching 'selector' and passes them
   * to 'fn'
   * @param {*} selector The CSS selector to find
   * @param {*} fn The function to execute for every element
   */
  const eachElement = (selector, fn) => {
    for (let e of document.querySelectorAll(selector)) {
      fn(e);
    }
  };

  /**
   * Shows and hides UI elements
   */
  const updateUI = async () => {
    try {
      const isAuthenticated = await auth0.isAuthenticated();

      if (isAuthenticated) {
        const user = await auth0.getUser();

        eachElement(".auth---invisible", (e) => e.classList.add("hidden"));
        eachElement(".auth---visible", (e) => {
          e.classList.remove("hidden");
          e.style.visibility = "visible";
        });
      } else {
        if (document.body.classList.contains("auth---visible")) {
          window.location.replace("/");
        }

        eachElement(".auth---invisible", (e) => {
          e.classList.remove("hidden");
          e.style.visibility = "visible";
        });
        eachElement(".auth---visible", (e) => e.classList.add("hidden"));
      }
    } catch (err) {
      console.log("Error updating UI!", err);
      return;
    }
  };

  /**
   * Add click events
   */
  const updateDom = () => {
    var loginBtn = document.querySelector("#btn-login");
    var signUpBtn = document.querySelector("#signup-btn");
    var contentBtn = document.querySelector(".content-button");
    var logoutBtn = document.querySelector("#btn-logout");

    if (loginBtn) {
      loginBtn.addEventListener("click", login);
    }

    if (signUpBtn) {
      signUpBtn.addEventListener("click", login);
    }

    if (contentBtn) {
      contentBtn.addEventListener("click", login);
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", logout);
    }
  };
  
// </script>



{/* <script> Webflow.push(function() { $('.copyright-year').text(new Date().getFullYear()); }); </script> */}
