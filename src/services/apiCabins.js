import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Failed to get cabins");
  return cabins;
}

export async function createUpdateCabin(newCabin, id) {
  const isEditSession = Boolean(id);

  const isNewImage = typeof newCabin.image !== "string";
  console.log(isNewImage, newCabin.image);
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  //1) Create Cabin
  if (!isEditSession)
    query = query
      .insert([{ ...newCabin, image: isNewImage ? imagePath : newCabin.image }])
      .select();

  //Edit Cabin
  if (isEditSession)
    query = query
      .update({
        ...newCabin,
        image: isNewImage ? imagePath : newCabin.image,
      })
      .eq("id", id)
      .select();

  const { data, error } = await query;

  if (error) throw new Error("Failed to create the cabin");

  //2) Upload image
  if (!isNewImage) return data;

  const { error: errorImage } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3) Delete Cabin if uploading the image is failed
  if (errorImage) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error("Uploading the image is failed, Can't create the cabin");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Failed to delete cabin");
}
