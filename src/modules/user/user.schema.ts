import { Follows } from "./../../../node_modules/.prisma/client/index.d";
import { buildJsonSchemas } from "fastify-zod";
import * as zod from "zod";

const userCore = {
  first_name: zod
    .string({
      invalid_type_error: "Name is required",
      required_error: "Name is required",
    })
    .min(1, "Name is required"),
  gender: zod.enum(["male", "female"], {
    invalid_type_error: "Gender should be either 'male' or 'female'",
    required_error: "Gender is required",
  }),
};

const createUserSchema = zod.object({
  ...userCore,
});

const createUserResponseSchema = zod.object({
  ...userCore,
  id: zod.number(),
  createdAt: zod.date(),
  updatedAt: zod.date(),
  following: zod
    .array(
      zod.object({
        followerId: zod.number(),
        followingId: zod.number(),
      })
    )
    .length(150)
    .optional(),
  followedBy: zod
    .array(
      zod.object({
        followerId: zod.number(),
        followingId: zod.number(),
      })
    )
    .optional(),
});

export type CreateUserInput = zod.infer<typeof createUserSchema>;

export type CreateUserResponse = zod.infer<typeof createUserResponseSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
});
