import { writeDataToFile, IFileStructure, readDataFromFile } from '../services/fileService';

export class Movie {
    id?: number;
    title: string;
    genres: string[];
    year: string;
    runtime: string;
    director: string;
    actors: string;
    plot?: string;
    posterUrl?: string;

    constructor(input: IMovie) {
        this.title = input.title;
        this.genres = input.genres;
        this.year = input.year;
        this.runtime = input.runtime;
        this.director = input.director;
        this.actors = input.actors;
        this.plot = input.plot;
        this.posterUrl = input.posterUrl;
    }

    async save(): Promise<number> {
        const data = await readDataFromFile();
        this.id = data.movies.length + 1;

        data.movies.push(this);

        await writeDataToFile(<IFileStructure>data);
        return this.id;
    }
}

export interface IMovie {
    title: string;
    genres: string[];
    year: string;
    runtime: string;
    director: string;
    actors: string;
    plot?: string;
    posterUrl?: string;
}
