import supabase from "./supabase";

export async function getClicksforUrls(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);
  if (error) {
    console.error(error.message);
    throw new Error("unable to load clicks");
  }
  return data;
}
