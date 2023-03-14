import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SugerirFilmes } from "./pages/SugerirFilmes";
import { DetalheFilme } from "./pages/DetalheFilme";
import { Login } from "./pages/Login";

export default function Navigation() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SugerirFilmes />} />
				<Route path="/login" element={<Login />} />
				<Route path="/detalheFilme" element={<DetalheFilme />} />
			</Routes>
		</BrowserRouter>
	);
}
