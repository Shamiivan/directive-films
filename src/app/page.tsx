import client from "../../tina/__generated__/client";
import HomePage from "../components/pages/home-page";

export default async function Home() {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.md"
  });

  return <HomePage data={data} query={query} variables={variables} />;
}
