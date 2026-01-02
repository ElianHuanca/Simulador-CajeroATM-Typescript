import { Observador } from "./Observador";

export interface Notificador {
    agregar(obs: Observador): void;
    eliminar(obs: Observador): void;
    notificar(): void;
}
