import { auth } from "@/auth";
import { db } from "@/db";
import { listings } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { query: string };
}) {
  console.log("params", params); // { slug
  console.log(searchParams.query);
  const session = await auth();
  console.log(session?.user?.id);
  const data = await db.query.listings.findMany({
    where: (listings, { eq, like, and }) =>
      eq(listings.userId, session?.user?.id!).if(session?.user?.id),
  });
  return (
    <div>
      <h1>Admin Page</h1>
      <p>This page is protected by the auth middleware.</p>
      <div>
        {data.map((listing) => (
          <div key={listing.id} className="flex gap-4">
            <p className="font-semibold">{listing.projectName}</p>
            <p className="text-sm opacity-50">{listing.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
