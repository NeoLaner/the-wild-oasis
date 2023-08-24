import supabase from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
