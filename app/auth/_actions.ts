"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/auth/login?message=Could not authenticate user");
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email") as string;

  if (!email) {
    return redirect(
      "/auth/login?message=Please enter an email to reset your password."
    );
  }

  const redirectUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/auth/reset`
    : "http://localhost:3000/auth/reset";

  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  });

  if (error) {
    return redirect(
      "/auth/login?message=We were not able to send a password reset. Please contact support."
    );
  }
  return redirect(
    "/auth/login?message=Please check your email for a password reset."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get("password") as string;
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password,
  });
  if (error) {
    return redirect(
      "/auth/login?message=We were not able to reset your password. Please contact support."
    );
  }
  return redirect(
    "/auth/login?message=Your password was reset. You may now login."
  );
};

export const signUpAction = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/sign-up?message=Could not sign up user");
  }

  return redirect("/sign-up?message=Check email to continue sign up process");
};

export const signOutAction = async () => {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/auth/login");
  } catch (e) {
    console.log(e);
  }
};

export const signInWithGithub = async () => {
  const supabaseClient = createClient();
  const origin = headers().get("origin");
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    return redirect("/auth/login?message=Could not authenticate user");
  }
  return redirect(data.url);
};
