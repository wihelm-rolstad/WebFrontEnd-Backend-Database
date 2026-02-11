export async function getUsers() {
  const sessionToken = localStorage.getItem("sessionToken");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const response = await fetch(`${API_BASE_URL}/get-users`, {
    method: "GET",
    headers: { Authorization: `Bearer ${sessionToken}` },
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
}