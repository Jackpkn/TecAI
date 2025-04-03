// components/UserInfo.js
"use client";

import { useUser } from "@clerk/nextjs";

function UserInfo() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return <div>{user?.fullName}</div>;
}

export default UserInfo;
