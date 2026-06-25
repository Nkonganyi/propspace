import api from "./api";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  // Let the browser/axios set the multipart boundary automatically —
  // forcing the Content-Type header here would drop the boundary and
  // break parsing on the server.
  const res = await api.post("/upload", formData);
  return res.data.url;
};
