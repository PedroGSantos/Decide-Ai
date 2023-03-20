import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SugerirFilmes } from "./pages/SugerirFilmes";
import { DetalheFilme } from "./pages/DetalheFilme";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { FilmesAssistidos } from "./pages/FilmesAssistidos";

export default function Navigation() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sugerirFilmes" element={<SugerirFilmes />} />
				<Route path="/login" element={<Login />} />
				<Route path="/detalheFilme/:id" element={<DetalheFilme />} />
				<Route path="/filmesAssistidos" element={<FilmesAssistidos />} />
			</Routes>
		</BrowserRouter>
	);
}
