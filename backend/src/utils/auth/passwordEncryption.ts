import bcrypt from "bcrypt";

async function hashPassword(password: string) {
  const saltOrRounds = 10;
  return bcrypt.hash(password, saltOrRounds);
}

async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export { comparePassword, hashPassword };
