export const query = `
query ExampleQuery {
  allFilms {
    films {
      title
      releaseDate
      starshipConnection {
        starships {
          name
          model
          costInCredits
          pilotConnection {
            pilots {
              gender
              name
              species {
                homeworld {
                  name
                }
                name
              }
            }
          }
        }
      }
    }
  }
}
`;

export const getGraphQL = async (): Promise<GQLRoot> => {
	const response = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query })
	});
	return response.json();
};

export interface GQLRoot {
	data: Data;
}

export interface Data {
	allFilms: AllFilms;
}

export interface AllFilms {
	films: Film[];
}

export interface Film {
	title: string;
	releaseDate: string;
	starshipConnection: StarshipConnection;
}

export interface StarshipConnection {
	starships: Starship[];
}

export interface Starship {
	name: string;
	model: string;
	costInCredits?: number;
	pilotConnection: PilotConnection;
}

export interface PilotConnection {
	pilots: Pilot[][];
}

export interface Pilot {
	gender: string;
	name: string;
	species?: Species | Species | null;
}

export interface Species {
	homeworld: Homeworld;
	name: string;
}

export interface Homeworld {
	name: string;
}
