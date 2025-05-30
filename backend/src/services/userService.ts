import prisma from '../config/prismaClient';

export const getUserById = (id: number) => prisma.user.findUnique({ where: { id } });

export const getAllUsers = () => prisma.user.findMany();
