class Persona {
  constructor(public nombre: string) {}

  saludar(): void {
    console.log(`Hola, soy ${this.nombre}`);
  }
}

const p = new Persona("Elian");
p.saludar();
