let auth0Client = null; 

async function init() {
  auth0Client = await window.auth0.createAuth0Client({
    domain: window.AUTH_CONFIG.domain, 
    clientId: window.AUTH_CONFIG.clientId,
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  });

  if (window.location.search.includes("code=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  updateUI();
}

async function updateUI() {
  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    const user = await auth0Client.getUser();
    document.getElementById("user").innerText = "Hello, " + user.name;
  } else {
    document.getElementById("user").innerText = "Not logged in";
  }
}

async function login() {
  await auth0Client.loginWithRedirect();
}

async function logout() {
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
}

window.addEventListener('load', init);