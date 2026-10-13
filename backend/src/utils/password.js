import crypto from "crypto";

const HASH_ALGORITHM = "sha256";
const KEY_LENGTH = 64;
const ITERATIONS = 100000;

export const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, HASH_ALGORITHM)
    .toString("hex");

  return `${salt}:${hash}`;
};

export const comparePassword = (password, savedPassword) => {
  const [salt, savedHash] = savedPassword.split(":");

  if (!salt || !savedHash) return false;

  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, HASH_ALGORITHM)
    .toString("hex");

  if (hash.length !== savedHash.length) return false;

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(savedHash));
};
