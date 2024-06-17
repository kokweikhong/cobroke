import { auth } from "@/auth";

const UserBadge = async () => {
  const session = await auth();

  return (
    <>
      {session ? (
        <div>
          <span>{session?.user?.email}</span>
        </div>
      ) : (
        <div>
          <span>Not logged in</span>
        </div>
      )}
    </>
  );
};

export default UserBadge;
