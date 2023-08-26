import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateUser({ fullName, avatar, password }) {
  const newData = password
    ? {
        password,
      }
    : { data: { fullName } };

  //1)Update user fullName
  const { data, error } = await supabase.auth.updateUser(newData);

  if (error) throw new Error(error.message);

  //2)Update user avatar
  if (!avatar) return data;

  const avatarName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: errorAvatar } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (errorAvatar) throw new Error(errorAvatar.message);

  //3)Update user data with avatar location
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
