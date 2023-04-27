import { ESCOLAS_ENDPOINT } from ".";
import type { Estado } from "./estados";

export type Escola = {

};

export type Cidade = {
    id: number,
    nome: string
};

export async function getCidadesDeEstado(estado: Estado): Promise<Array<Cidade>> {
    const response = await fetch(ESCOLAS_ENDPOINT + `cidades/${estado.sigla.toLowerCase()}`);
    const data: string[] = await response.json();

    return data.map(line => {
        const [id, nome] = line.split(":");

        return {
            id: +id,
            nome
        } as Cidade;
    })
}