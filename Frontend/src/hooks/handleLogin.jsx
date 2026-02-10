
export async function handleLogin({ email, password, setUserFeedback, navigate}) {

  try {
    const response = await fetch(
      "https://webfrontend-backend-database-354058670203.europe-west1.run.app/login",
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