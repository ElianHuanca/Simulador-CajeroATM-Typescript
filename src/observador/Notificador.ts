import { Observador } from "./Observador.js";

export interface Notificador {
    agregar(obs: Observador): void;
    eliminar(obs: Observador): void;
    notificar(): void;
}
