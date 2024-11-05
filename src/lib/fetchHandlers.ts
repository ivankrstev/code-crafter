export const swrFetcher = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });
  if (response.status === 401) {
    window.location.href = "/signin";
    return Promise.reject(new Error("Unauthorized"));
  }
  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  return response.json();
};
