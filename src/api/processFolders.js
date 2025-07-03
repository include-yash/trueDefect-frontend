export async function processFolders(inputSubpath, outputSubpath) {
  const response = await fetch("http://localhost:5000/process-folders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input_subpath: inputSubpath,
      output_subpath: outputSubpath,
    }),
  });

  return await response.json();
}
