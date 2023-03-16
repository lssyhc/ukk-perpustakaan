import { useNavigate } from "react-router-dom";

import "../public/css/style-login.css";

const Login = () => {
  const navigate = useNavigate();

  function checkLogin() {
    const email = document.querySelector(".main-login .container-login .login .email").value;
    const password = document.querySelector(".main-login .container-login .login .password").value;

    if (email !== "admin@gmail.com" || password !== "admin123") {
      return;
    } else {
      navigate("/");
    }
  }

  return (
    <main className="main-login">
      <div className="container-login">
        <input type="checkbox" id="check" />
        <div className="login form">
          <header>Masuk</header>
          <form onSubmit={checkLogin}>
            <input
              type="text"
              placeholder="Masukkan email kamu"
              className="email"
            />
            <input
              type="password"
              placeholder="Masukkan password kamu"
              className="password"
            />
            <input type="submit" className="button" value="Masuk" />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;