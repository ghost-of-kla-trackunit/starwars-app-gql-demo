const headers = {
	'Content-Type': 'application/json'
};
export const getREST = async () => {
	const filmsResponse = await (
		await fetch('https://swapi.dev/api/films/', {
			method: 'GET',
			headers
		})
	).json();

	const films = filmsResponse.results;

	const filmsWithShips = await films.map(async (film) => {
		console.log('film', film);
		const ships = await Promise.all(
			film.starships.map(async (url) => {
				console.log('starships', film.starships);
				const ship = await (
					await fetch(url, {
						method: 'GET',
						headers
					})
				).json();
				const pilots = await Promise.all(
					ship.pilots.map(async (url) => {
						console.log('pilots', ship.pilots);
						const pilot = await (
							await fetch(url, {
								method: 'GET',
								headers
							})
						).json();

						const species = await Promise.all(
							pilot.species.map(async (url) => {
								console.log('species', pilot.species);

								return await (
									await fetch(url, {
										method: 'GET',
										headers
									})
								).json();
							})
						);

						return { ...pilot, species };
					})
				);
				return { ...ship, pilots };
			})
		);
		return { ...film, starships: ships };
	});

	return await Promise.all(filmsWithShips);
};
