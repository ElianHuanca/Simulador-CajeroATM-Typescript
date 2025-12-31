import { Observador } from "./Observador";

export interface Notificador {
    agregarObservador(obs: Observador): void;
    eliminarObservador(obs: Observador): void;
    notificarObservadores(): void;
}
