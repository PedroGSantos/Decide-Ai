import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorLogin, setErrorLogin] = useState(false);

	async function login() {
		const url = `/api/users/`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const user = data.find((user) => user.email === email);
				console.log(user);
				if (user === undefined) {
					console.log("Não encontrou usuário com esse e-mail");
					setErrorLogin(true);
					return;
				} else if (password === user.password) {
					localStorage.setItem("email", user.email);
					localStorage.setItem("id", user.user_id);
					navigate("/filmesAssistidos");
				} else {
					setErrorLogin(true);
				}
			})
			.catch((error) => console.error(error));
	}

	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
	};

	const handleChangePassword = (event) => {
		setPassword(event.target.value);
	};

	return (
		<div className="box">
			<div className="tituloLogin">
				<p>DECIDE AÍ</p>
			</div>

			<div className="loginBox">
				<div className="loginContainer">
					{errorLogin === true ? (
						<p>E-mail ou senha incorretos</p>
					) : (
						<p></p>
					)}
					<h1>Entrar</h1>
					<div className="inputsContainer">
						<input
							placeholder="E-mail"
							onChange={handleChangeEmail}
						></input>
						<input
							placeholder="Senha"
							type={"password"}
							onChange={handleChangePassword}
						></input>
						<button onClick={() => login()}>ENTRAR</button>
					</div>
				</div>
			</div>
		</div>
	);
}
