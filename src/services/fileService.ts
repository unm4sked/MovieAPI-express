import path from 'path';
import { promises as fs } from 'fs';
import { Movie } from '../models/movie';

export interface IFileStructure {
    genres: string[];
    movies: Movie[];
}

export const writeDataToFile = async (data: IFileStructure): Promise<void> => {
    const pathToFile = path.join(__dirname, '..', '..', 'db', 'db.json');

    await fs.writeFile(pathToFile, JSON.stringify(data));
};

export const readDataFromFile = async (): Promise<IFileStructure> => {
    const pathToFile = path.join(__dirname, '..', '..', 'db', 'db.json');

    const data = await fs.readFile(pathToFile);

    return JSON.parse(data.toString());
};
