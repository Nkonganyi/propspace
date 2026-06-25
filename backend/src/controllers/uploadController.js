export const handleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file was provided" });
  }

  // Build an absolute URL so the frontend can use it directly as an <img src>
  // regardless of which host/port the API is actually running on.
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(201).json({ url });
};
