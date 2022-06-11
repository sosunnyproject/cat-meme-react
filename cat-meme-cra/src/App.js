import logo from './logo.svg';
import './App.css';
import React from "react";
import { Title } from "./components/Title";
import { Favorites } from './components/Favorites';
import { CatItem } from './components/Item';
import { CatForm } from './components/Form';
import { MainCard } from './components/MainCard';

const jsonLocalStorage = {
	setItem: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	},
	getItem: (key) => {
		return JSON.parse(localStorage.getItem(key));
	},
};

const fetchCat = async (text) => {
	const OPEN_CAT_DOMAIN = "https://cataas.com";
	const response = await fetch(`${OPEN_CAT_DOMAIN}/cat/says/${text}?json=true`);
	const responseJson = await response.json();
	const imageUrl = await responseJson.url;
	return `${OPEN_CAT_DOMAIN}/${imageUrl}`;
}

const App = () => {
	const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
	const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
	const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

	// const counterState = React.useState(1);
	// const counter = counterState[0];
	// const setCounter = counterState[1];

	// wrap localStorage.getItem with Number if string error occurs
	const [counter, setCounter] = React.useState(
		() => {
			return jsonLocalStorage.getItem('counter') || 0;
		});
	const [mainCat, setMainCat] = React.useState(CAT1);
	const [favorites, setFavorites] = React.useState(
		() => {
			return jsonLocalStorage.getItem('favorites') || []
		});

	const isFavorite = favorites.includes(mainCat);
	const [loading, setLoading] = React.useState(true);

	async function updateMainCat(value) {
		setLoading(true);
		const newCat = await fetchCat(value);

		setMainCat(newCat);

		setCounter((prev) => {
			const nextCounter = prev + 1;
			jsonLocalStorage.setItem('counter', nextCounter);
			return nextCounter;
		});

		setLoading(false);
	}

	async function initCat() {
		const newCat = await fetchCat("First Cat");
		console.log("init", newCat);
		setMainCat(newCat);
		setLoading(false);
	}

	// initCat(); // this runs at every render update

	React.useEffect(() => {
		initCat();
	}, []);

	// React.useEffect(() => {
	// 	console.log("state changes")
	// }, [favorites]);

	function handleHeartClick() {
		// 버튼 누르면 고양이 추가
		const nextFavorites = [...favorites, mainCat]
		setFavorites(nextFavorites)
		jsonLocalStorage.setItem('favorites', nextFavorites)
	}

	const partialTitle = counter ? `${counter}번째 ` : ''

	return (
		<div>
			<Title>{partialTitle}고양이 가라사대</Title>
			<CatForm updateMainCat={updateMainCat} />
			<MainCard img={mainCat} onHeartClick={handleHeartClick} isFavorite={isFavorite} loading={loading} />
			<Favorites favorites={favorites} />
		</div>
	);
};

export default App;
