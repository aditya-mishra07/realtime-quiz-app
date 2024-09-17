import e from "express";
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

export { findExistingAdminModel, createAdminModel };
