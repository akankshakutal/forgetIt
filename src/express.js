const isMatching = (req, route) => {
  if (route.method && req.method != route.method) return false;
  if (route.url instanceof RegExp && route.url.test(req.url)) return true;
  if (route.url && req.url != route.url) return false;
  return true;
};

const send = function(data, statusCode = 200) {
  this.statusCode = statusCode;
  this.write(data);
  this.end();
};

const redirect = function(url) {
  this.writeHead(302, {
    Location: url
  });
  this.end();
};

const sendJson = function(data, statusCode = 200) {
  this.writeHead(statusCode, { "Content-Type": "application/json" });
  this.write(JSON.stringify(data));
  this.end();
};

class Express {
  constructor() {
    this.routes = [];
  }

  use(handler) {
    this.routes.push({ handler });
  }

  get(url, handler) {
    this.routes.push({ method: "GET", url, handler });
  }

  post(url, handler) {
    this.routes.push({ method: "POST", url, handler });
  }

  handleRequest(req, res) {
    res.send = send;
    res.redirect = redirect;
    res.sendJson = sendJson;
    let matchingRoutes = this.routes.filter(r => isMatching(req, r));
    let remaining = [...matchingRoutes];

    let next = () => {
      let current = remaining[0];
      if (!current) return;
      remaining = remaining.slice(1);
      current.handler(req, res, next);
    };
    next();
  }
}

module.exports = Express;
