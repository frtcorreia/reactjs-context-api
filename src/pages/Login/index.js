import React, { useState } from "react";

import { useAuth } from "../../contexts/auth";

function Login() {
  const [email, setEmail] = useState("filipecorreia@albinet.pt");
  const [password, setPassword] = useState("123456");
  const { signed, user, signIn } = useAuth();

  function handleLogin() {
    signIn(email, password);
  }
  console.log(signed);
  console.log(user);
  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>LOGIN</button>
    </div>
  );
}

export default Login;
