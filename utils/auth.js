import cookie from 'js-cookie';
import Router from 'next/router';
export function handleLogin(token) {
  cookie.set('token', token);
  Router.push('/account');
}

export function redirectUser(ctx, location) {
  // Check to see if the code is on server
  if (ctx.req) {
    // Redirection from server
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  }
  else {
    // Redirection on client
    Router.push(location);
  }
}

export function handleLogout() {
  cookie.remove('token');
  localStorage.setItem('logout', Date.now());
  Router.push('/login');
}