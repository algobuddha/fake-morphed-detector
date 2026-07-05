export async function classifyImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("https://fake-morphed-detector-2.onrender.com/predict", {
    method: "POST",
    body: formData,
  });

  return res.json();
}
