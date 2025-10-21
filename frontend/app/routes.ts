import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("users/:username", "routes/user.tsx"),
  route("/account", "routes/account.tsx"),

  route("demo", "routes/demo.tsx"),
  route("search", "routes/search.tsx"),
  route("about", "routes/about.tsx"),

  route("error", "routes/error.tsx")
] satisfies RouteConfig;
