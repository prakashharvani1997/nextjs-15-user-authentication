'use server';

import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";

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

 const hashedPassword = hashUserPassword(password)

  createUser(email,hashedPassword)
}
