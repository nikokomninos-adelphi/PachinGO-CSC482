/**
 * auth.ts
 *
 * Contains global functions used for authentication
 */

/**
 * checkAuth - checks if the user attempting to access a
 * protected route is authenticated
 *
 * @returns the user's username if they are authenticated
 */
export const checkAuth = async () => {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/auth/check", {
    method: "GET",
    credentials: "include", 
  });

  if (!res.ok) { return null; }

  const data = await res.json();
  return data.username; 
}
