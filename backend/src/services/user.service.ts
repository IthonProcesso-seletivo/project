import { prisma } from '../config/prisma';

export class UserService {
  static findAll() {
    return prisma.user.findMany();
  }

  static findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  static create(data: { name: string; email: string }) {
    return prisma.user.create({ data });
  }
}
