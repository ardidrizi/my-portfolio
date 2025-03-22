import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import SkillsPage from "./pages/skills"
import ScrollablePage from './pages/ScrollablePage';
import React from 'react';
import { ThemeProvider } from './components/ThemeController';
import InteractiveBackground from './components/InteractiveBackground';
import Layout from './components/Layout';
import './styles/scrollable-page.css';
import './styles/scrollIndicator.css';
import './styles/fonts.css'; // Import the fonts explicitly
import ScrollIndicator from './components/ScrollIndicator';
import Navbar from './components/Navbar';

const App: React.FC = () => {
	return (
		<ThemeProvider>
			<InteractiveBackground />
			<BrowserRouter>
				<ScrollIndicator />
        <ScrollablePage />
				<Routes>
					<Route path="/" element={<Layout><ScrollablePage /></Layout>} />
					<Route path="/traditional" element={<Layout><Home /></Layout>} />
					<Route path="/about" element={<Layout><About /></Layout>} />
					<Route path="/projects" element={<Layout><Projects /></Layout>} />
					<Route path="/contact" element={<Layout><Contact /></Layout>} />
					<Route path="/blog" element={<Layout><Blog /></Layout>} />
					<Route path="/skills" element={<Layout><SkillsPage /></Layout>} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
