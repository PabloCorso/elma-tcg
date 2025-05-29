import { PathName } from "#app/config/paths";
import { Paths } from "#app/config/paths";
import { Link } from "react-router";

export default function Index() {
  return (
    <main className="flex flex-col items-center gap-6 p-4 pt-6">
      <h1 className="text-center text-4xl font-bold">Elma TCG</h1>
      <div className="flex flex-col items-center gap-6">
        <Link to={Paths.rules} className="kbd btn">
          {PathName.rules}
        </Link>
        <Link to={Paths.cards} className="kbd btn">
          {PathName.cards}
        </Link>
      </div>
    </main>
  );
}
