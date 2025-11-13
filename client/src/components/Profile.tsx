import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
  const { user } = useAuth0();

  return (
    user && (
      <div className="flex flex-row items-start justify-center gap-2">
        <picture>
          <img
            src={user.picture}
            alt={user.name}
            height={"50px"}
            width={"50px"}
            className="rounded-full"
          />
          <span className="absolute left-12 top-12 z-10 rounded-full border-2 border-orange-600 bg-green-500 p-1.5"></span>
        </picture>
        <div className="flex flex-col">
          <p>{user.username}</p>
          <span>Online</span>
        </div>
      </div>
    )
  );
};
