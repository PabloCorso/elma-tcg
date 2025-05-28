import { PathName, Paths } from "#app/config/paths";
import { Link, type LinkProps } from "react-router";

export function TopBackLink({
  to = Paths.home,
  children = PathName.home,
  ...delegated
}: LinkProps) {
  return (
    <Link to={to} className="absolute top-1 left-4" {...delegated}>
      ← {children}
    </Link>
  );
}
