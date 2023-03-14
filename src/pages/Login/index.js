import React from "react";
import './style.css'

export function Login() {

	return (
		<div className="box">
			<div className="tituloLogin">  
				<p>DECIDE AÍ</p>
			</div>

			<div className="loginBox">
				<div className="loginContainer">
					<h1>Entrar</h1>
					<div className="inputsContainer">
						<input placeholder="E-mail"></input>
						<input placeholder="Senha" type={"password"}></input>
						<button >ENTRAR</button>
					</div>
				</div>
			</div>
		</div>

	)
}
