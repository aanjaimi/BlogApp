"use server";
import { User } from "@/types/user";
import { db } from "../lib/db";

//group of actions for the database operations: add user, get users, remove user, remove all users, get user, update user

export const addUser = async (values: Partial<User>) => {
  const { email, name, login } = values;

  if (!email || !name || !login) {
    return { error: "missing required fields" };
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return { error: "user already registred" };
  }

  await db.user.create({
    data: {
      email,
      name,
      login,
    },
  });

  return { success: "You have been registred successfully!" };
};

export const getUsers = async () => {
  return await db.user.findMany();
};

export const removeUser = async (id: string) => {
  try {
    await db.user.delete({
      where: {
        id,
      },
    });
    return { success: "User removed" };
  } catch (error) {
    console.error(error);
    return { error: "Error removing user" };
  }
};

export const removeAllUsers = async () => {
  try {
    await db.user.deleteMany({});
    return { success: "All users removed" };
  } catch (error) {
    console.error(error);
    return { error: "Error removing users" };
  }
};

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserByLogin = async (login: string) => {
  return await db.user.findUnique({
    where: {
      login,
    },
  });
};

export const updateUser = async (id: string, values: any) => {
  const { email, name, login } = values;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser && existingUser.id !== id) {
    return { error: "user email already in use" };
  }

  await db.user.update({
    where: {
      id,
    },
    data: {
      email,
      name,
      login,
    },
  });

  return { success: "User updated" };
};
