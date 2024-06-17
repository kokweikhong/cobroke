export default function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { query: string };
}) {
  console.log("params", params); // { slug
  console.log(searchParams.query);
  return (
    <div>
      <h1>Admin Page</h1>
      <p>This page is protected by the auth middleware.</p>
    </div>
  );
}
