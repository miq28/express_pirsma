const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // console.log(req.body)
  try {
    let token = null;
    var message;
    if (req.body.token || req.query.token || req.headers["x-access-token"]) {
      // console.log('body query header')
      token = req.body.token || req.query.token || req.headers["x-access-token"]
    } else if (req.headers['authorization']) {
      // console.log('header authorization')
      token = req.headers['authorization']
        .split('; ')
        .find(row => row.startsWith('Bearer'))
      if (token) { token = token.split(' ')[1] }
    } else if (req.headers['cookie']) {
      // console.log('header cookie', req.headers['cookie'])
      token = req.headers['cookie']
        .split('; ')
        .find(row => row.startsWith('accessToken='))
      if (token) { token = token.split('=')[1] }
    }



    if (!token || token === undefined || token === null) {
      message = "Unauthorized. JWT token is not found"
      console.log({ err: message })
      // return res.status(403).send({ err: message });
      return res.redirect("/login");
      // return res.json(message);
    }
    // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, function (err, decoded) {
      if (err) {
        /*
          err = {
            name: '_______',
            message: '_______'
          }
        */
        console.log({ err: err.message })
        return res.redirect("/login");
        // return res.status(401).json({ err: err.message });
        // return res.json(err.message);
        // return res.sendFile('token-invalid.html', { root: process.cwd() + '/public' })
      }

      req.user = decoded;
      console.log({ jwt_decoded: decoded })
      return next();
    });

  } catch (err) {
    console.error({ err: err.message })
    return res.status(401).send({ err: err.message });
  }
};

const GenerateJwtToken = (payload) => {
  
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );

  return {accessToken, refreshToken}

}

module.exports = {
  verifyToken,
  GenerateJwtToken
}