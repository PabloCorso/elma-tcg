import { PathName } from "#app/config/paths";
import { Paths } from "#app/config/paths";
import { Link } from "react-router";

export default function Index() {
  return (
    <main className="px-4 py-6">
      <h1 className="mb-6 text-center text-4xl font-bold">Elma TCG</h1>
      <div className="flex flex-col items-center gap-6">
        <Link to={Paths.rules} className="kbd btn">
          {PathName.rules}
        </Link>
        <Link to={Paths.cards} className="kbd btn">
          {PathName.cards}
        </Link>
        <Link to={Paths.effects} className="kbd btn">
          {PathName.effects}
        </Link>
        <Link to={Paths.random} className="kbd btn">
          {PathName.random}
        </Link>
        <div className="divider">Legacy</div>
        <Link to={Paths.legacy} className="kbd btn">
          {PathName.legacy}
        </Link>
        <Link to={Paths.legacyRandom} className="kbd btn">
          {PathName.legacyRandom}
        </Link>
      </div>
    </main>
  );
}
