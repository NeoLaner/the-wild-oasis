import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Failed to get cabins");
  return cabins;
}

export async function createCabin(newCabin) {
  console.log(newCabin);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  console.log(imageName);
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1) Create Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) throw new Error("Failed to create the cabin");

  //2) Upload image

  const { error: errorImage } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  //3) Delete Cabin if uploading the image is failed
  if (errorImage) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Uploading the image is failed, Can't create the cabin");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Failed to delete cabin");
}
