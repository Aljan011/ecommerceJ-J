import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
    //   async update({ args, model, operation, query }) {
    //     return query({
    //       ...args,
    //       data: {
    //         ...(args as any).data,
    //         deletedAt: new Date(),
    //       },
    //     });
    //   },

      async delete({ args, query }) {
        return query({
          ...args,
          where: {
            ...(args as any).where,
            data: {
                deletedAt: new Date(),
            }
          },
        });
      },

      async findMany({ args, query }) {
        return query({
          ...args,
          where: {
            ...(args.where || {}),
            deletedAt: null,
          },
        } as any);
      },

      async findFirst({ args, query }) {
        return query({
          ...args,
          where: {
            ...(args.where || {}),
            deletedAt: null,
          },
        } as any);
      },

      async findUnique({ args, query }) {
        return query({
          ...args,
          where: {
            ...(args.where || {}),
            deletedAt: null,
          },
        } as any);
      },
    },
  },
});

export default prisma;
