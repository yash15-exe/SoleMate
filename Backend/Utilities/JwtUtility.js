import jwt from "jsonwebtoken";

/**
 * Creates a JWT token with the given payload and options.
 * @param {Object} payload - The payload to encode in the token.
 * @param {Object} [options={}] - Optional settings for token creation.
 * @param {string} [options.secretKey=process.env.JWT_SECRET_KEY] - Secret key for signing the token.
 * @param {string} [options.expiresIn='1h'] - Token expiration time.
 * @returns {Promise<string>} - The generated JWT token.
 */



export async function createToken(payload, options = {}) {
  const {
    secretKey = process.env.JWT_SECRET_KEY,
    expiresIn = '1h',
    ...otherOptions
  } = options;

  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, { expiresIn, ...otherOptions }, (err, token) => {
      if (err) {
        console.error('Error in creating token:', err);
        return reject(err);
      }
      resolve(token);
    });
  });
}



/**
 * Decodes a JWT token.
 * @param {string} token - The JWT token to decode.
 * @returns {Promise<Object>} - The decoded payload.
 */



export async function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedPayload) => {
      if (err) {
        console.error('Error in decoding token:', err);
        return reject(err);
      }
      resolve(decodedPayload);
    });
  });
}
