import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SugerirFilmes } from "./pages/SugerirFilmes";

export default function Navigation() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SugerirFilmes />} />
			</Routes>
		</BrowserRouter>
	);
}
