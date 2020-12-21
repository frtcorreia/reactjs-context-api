import React from "react";

import { useAuth } from "../../contexts/auth";

function Home() {
  const { signOut, user } = useAuth();
  function handleSignOut() {
    signOut();
  }
  console.log(user);
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleSignOut}>SIGNOUT</button>
    </div>
  );
}

export default Home;
