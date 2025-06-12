import { PathName } from "#app/config/paths";
import { Paths } from "#app/config/paths";
import { Link } from "react-router";

export default function Index() {
  return (
    <main className="flex flex-col items-center gap-10 p-4 pt-6">
      <h1 className="text-center text-4xl font-bold">Elma TCG</h1>
      <div className="flex flex-col text-2xl items-center gap-6">
        <Link to={Paths.rules}>{PathName.rules}</Link>
        <Link to={Paths.cards}>{PathName.cards}</Link>
      </div>
    </main>
  );
}
