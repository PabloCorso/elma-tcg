import { PathName, Paths } from "#app/config/paths";
import { Link, type LinkProps } from "react-router";

export function TopBackLink({
  to = Paths.home,
  children = PathName.home,
  ...delegated
}: Omit<LinkProps, "to"> & { to?: string }) {
  return (
    <Link
      to={to}
      className="absolute text-gray-300 top-2 left-4"
      {...delegated}
    >
      ← {children}
    </Link>
  );
}
