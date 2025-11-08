async function uploadImageToImgBB(file) {
  const apiKey = "c6a562004bff421926419e6b22cec40e"; // 🔑 Replace with your real key
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      return data.data.display_url; // ✅ return uploaded image URL
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}
export default uploadImageToImgBB;