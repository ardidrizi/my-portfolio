import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import SkillsPage from "./pages/skills"
import React from 'react';
import { ThemeProvider } from './components/ThemeController';
import InteractiveBackground from './components/InteractiveBackground';

const App: React.FC = () => {
	return (
		<ThemeProvider>
			<InteractiveBackground />
			<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/projects" element={<Projects />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/skills" element={<SkillsPage />} />
					</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
