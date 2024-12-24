const jwt = require('jsonwebtoken');

module.exports = {
  async GenerateToken(id, nome){
    return jwt.sign({ id, nome }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });
},
}

  