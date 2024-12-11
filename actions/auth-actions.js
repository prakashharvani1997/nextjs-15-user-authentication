"use server";

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { redirect } from "next/dist/server/api-utils";

export async function signUp(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Please enter valid email address.";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be atleast 8 characters long..";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors
    };
  }

  const hashedPassword = hashUserPassword(password);
  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id);
    redirect("/training");
  } catch (error) {
    if (error.code == "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: "Account already exists with this email."
        }
      };
    }
    throw error;
  }
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: "Could not authenticate with user,please check credentials."
      }
    };
  }

  const isValidPassword = verifyPassword(existingUser.password);

  if (!isValidPassword) {
    return {
      errors: {
        password: "Could not authenticate with user,please check credentials."
      }
    };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(mode, prevState, formData) {
  if (mode == "login") {
    return login(prevState, formData);
  } else {
    return signUp(prevState, formData);
  }
}
