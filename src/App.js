import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import "./App.css";

// PokemonRow component
const PokemonRow = ({ pokemon, onSelect }) => {
	return (
		<tr>
			<td>{pokemon.name.english}</td>
			<td>{pokemon.type.join(", ")}</td>
			<td>
				<button onClick={() => onSelect(pokemon)}>Select</button>
			</td>
		</tr>
	);
};

PokemonRow.propTypes = {
	pokemon: PropTypes.shape({
		name: PropTypes.shape({
			english: PropTypes.string.isRequired,
		}),
		type: PropTypes.arrayOf(PropTypes.string.isRequired),
	}),
	onSelect: PropTypes.func.isRequired,
};

// PokemonInfo component
const PokemonInfo = ({ name, base }) => {
	return (
		<div>
			<h1>{name.english}</h1>
			<table>
				<tbody>
					{Object.keys(base).map((key) => (
						<tr key={key}>
							<td>{key}</td>
							<td>{base[key]}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

PokemonInfo.propTypes = {
	name: PropTypes.shape({
		english: PropTypes.string,
	}),
	base: PropTypes.shape({
		HP: PropTypes.number.isRequired,
		Attack: PropTypes.number.isRequired,
		Defense: PropTypes.number.isRequired,
		"Sp. Attack": PropTypes.number.isRequired,
		"Sp. Defense": PropTypes.number.isRequired,
		Speed: PropTypes.number.isRequired,
	}),
};

const Title = styled.h1`
	text-align: center;
`;

const Container = styled.div`
	margin: auto;
	width: 800px;
	paddingtop: 1rem;
`;

const TwoColumnLayout = styled.div`
	display: grid;
	grid-template-columns: 70% 30%;
	column-gap: 1rem;
`;

const InputTextField = styled.input`
	width: 100%;
	font-size: x-large;
	padding: 0.2rem;
`;

function App() {
	// filtering the pokemon
	const [filter, filterSet] = useState("");

	// pokemon values
	const [pokemon, pokemonSet] = useState([]);

	// selecting the selected pokemon
	const [selectedItem, selectedItemSet] = useState(null);

	// use useEffect to get the pokemon data and represent it to the UI
	useEffect(() => {
		fetch("http://localhost:3000/pokemon.json")
			.then((resp) => resp.json())
			.then((data) => pokemonSet(data))
			.catch((e) => console.log(e));
	}, []);

	return (
		<Container>
			<Title className="title">Pokemon Search</Title>
			{/* input field to search pokemon */}
			<TwoColumnLayout>
				<div>
					<InputTextField
						value={filter}
						onChange={(e) => filterSet(e.target.value)}
					/>
					{/* pokemon table */}
					<table width="100%">
						<thead>
							<tr>
								<th>Name (ENG)</th>
								<th>Type</th>
							</tr>
						</thead>
						<tbody>
							{pokemon
								.filter((pokemon) =>
									pokemon.name.english
										.toLowerCase()
										.includes(filter.toLowerCase())
								)
								.slice(0, 20)
								.map((pokemon) => (
									<PokemonRow
										key={pokemon.id}
										pokemon={pokemon}
										onSelect={(pokemon) => selectedItemSet(pokemon)}
									/>
								))}
						</tbody>
					</table>
				</div>
				{selectedItem && <PokemonInfo {...selectedItem} />}
			</TwoColumnLayout>
		</Container>
	);
}

export default App;
