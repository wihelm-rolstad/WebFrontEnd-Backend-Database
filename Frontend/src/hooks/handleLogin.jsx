
export async function handleLogin({ email, password, setUserFeedback, navigate}) {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await fetch(
      `${API_BASE_URL}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) throw new Error(await response.text());

    const result = await response.json();

    if (result.status === "ok") {
      localStorage.setItem("sessionToken", result.token);
      setUserFeedback?.("login success");
      setTimeout(() => {
        navigate("/app");
        }, 1000);
      return;
    }

    setUserFeedback?.("login failed");
  } catch (err) {
    console.error("Login failed:", err.message);
    setUserFeedback?.("login failed");
  }
}