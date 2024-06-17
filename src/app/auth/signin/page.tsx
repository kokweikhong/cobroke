import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log("params", params); // { slug
  console.log(searchParams);
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", {
          values: formData,
          redirect: true,
          redirectTo: "/admin",
        });
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
