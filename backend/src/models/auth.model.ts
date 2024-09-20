import prisma from "../db/db";

async function findExistingAdminModel(email: string) {
  return await prisma.admin.findFirst({
    where: {
      email,
    },
  });
}

async function createAdminModel({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return await prisma.admin.create({
    data: {
      email,
      password,
    },
  });
}

async function findAdminByIdModel(id: number) {
  return await prisma.admin.findFirst({
    where: {
      id,
    },
  });
}

async function verifyAdminModel({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return await prisma.admin.findFirst({
    where: {
      email,
      password,
    },
  });
}

async function addRefreshTokenModel(userID: number, refreshToken: string) {
  return await prisma.admin.update({
    where: {
      id: userID,
    },
    data: {
      refreshToken: refreshToken,
    },
  });
}

async function removeRefreshToken(userId: number) {
  return await prisma.admin.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken: "",
    },
    select: {
      refreshToken: true,
    },
  });
}

export {
  findExistingAdminModel,
  createAdminModel,
  verifyAdminModel,
  findAdminByIdModel,
  addRefreshTokenModel,
  removeRefreshToken,
};
