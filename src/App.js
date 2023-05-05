import { useState } from "react";
import PropTypes from "prop-types";

import "./App.css";

// pokemon.json
import pokemon from "./Pokemon.json";

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

function App() {
	// filtering the pokemon
	const [filter, filterSet] = useState("");

	// selecting the selected pokemon
	const [selectedItem, selectedItemSet] = useState(null);

	return (
		<div
			style={{
				margin: "auto",
				width: 800,
				paddingTop: "1rem",
			}}
		>
			<h1 className="title">Pokemon Search</h1>
			{/* input field to search pokemon */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "70% 30%",
					columnGap: "1rem",
				}}
			>
				<div>
					<input value={filter} onChange={(e) => filterSet(e.target.value)} />
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
			</div>
		</div>
	);
}

export default App;
