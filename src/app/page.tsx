import client from "../../tina/__generated__/client";
import ClientPage from "./client-page";

export default async function Home() {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.md"
  });

  return <ClientPage data={data} query={query} variables={variables} />;
}
