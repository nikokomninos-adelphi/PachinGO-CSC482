import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("demo", "routes/demo.tsx"),
  route("my_levels", "routes/my_levels.tsx"),
  route("search", "routes/search.tsx")
] satisfies RouteConfig;
