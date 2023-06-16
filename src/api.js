export const base_url =
  "https://my-json-server.typicode.com/open-veezoo/editor";

export const deleteFileById = async (id) => {
  await fetch(`${base_url}/files/${id}`, { method: "DELETE" });
};

export const UpdateFileByID = async (id, content) => {
  await fetch(`${base_url}/files/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  });
};

export const fetchFileById = async (
  id,
  isDirectory,
  setContent,
  setIsDirectory
) => {
  const response = await fetch(`${base_url}/files/${id}`);
  const data = await response.json();
  setContent(data);
  setIsDirectory(isDirectory);
};
