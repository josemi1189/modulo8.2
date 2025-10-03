import { Pacientes } from "../modelo";


/** 
 <div class="paciente">
        <div>
          <div>Nombre</div>
          <div>Apellidos</div>
          <div>Sexo</div>
          <div>Temperatura</div>
          <div>Frec. Cardíaca</div>
          <div>Especialidad</div>
          <div>Edad</div>
        </div>
        <div>
          <div>Nombre</div>
          <div>Apellidos</div>
          <div>Sexo</div>
          <div>Temperatura</div>
          <div>Frec. Cardíaca</div>
          <div>Especialidad</div>
          <div>Edad</div>
        </div>
      </div>
 * **/

const creaDiv = <T>(clase:string, contenido?:T):object => {
   let nuevaCapa = document.createElement("div");
   if (nuevaCapa && nuevaCapa instanceof HTMLDivElement) {
      if (clase) {
         nuevaCapa.classList.add(clase);
      }
      if (contenido) {
         nuevaCapa.innerHTML = contenido.toString();
      }
   }
   return nuevaCapa;
}

/**
 * Incluye div hijo en div padre. Si existe hijo 2 lo incluye también en padre.
 * Si existe padre principal, incluye los hijos en el padre, y el padre en este.
 * 
 * @param padre Objeto div padre
 * @param hijo Objeto div hijo 1
 * @param hijo2 Opcional. Objeto div hijo 2
 * @param padrePrincipal Opcional. Objeto contenedor principal
 */
const insertarDivEnContenedor = (padre:object, hijo:object, hijo2?:object, padrePrincipal?:object):void => {

   if (padre && padre instanceof HTMLDivElement 
      && hijo && hijo instanceof HTMLDivElement) {
         padre.appendChild(hijo);   
         
         // Si existe segundo hijo, lo añade también sobre el padre
         (hijo2 && hijo2 instanceof HTMLDivElement) && padre.appendChild(hijo2);

         // Si existe padre principal, incluye los dos hijos padre, y padre en PadrePrincipal
         (padrePrincipal && padrePrincipal instanceof HTMLDivElement) && padrePrincipal.appendChild(padre);
   }
}

/**
 * Muestra los datos recibidos por parámetro en pantalla.
 * @param contenedor ID del div donde se debe incluir el contenido
 * @param pacientes Array filtrado de datos a mostrar
 */
export const muestraDatosPacientes = (contenedor:string, pacientes:Pacientes[]) => {
   
   // .ejercicio
   const divContenedor = document.getElementById(contenedor);

   if (divContenedor && divContenedor instanceof HTMLDivElement) {
      for (let i=0; i < pacientes.length; i++) {
         
         let capaPaciente = creaDiv("paciente");
         if (capaPaciente && capaPaciente instanceof HTMLDivElement) {
            // Nombre y apellidos
            let divNombre = creaDiv("nombre",`${pacientes[i].nombre} ${pacientes[i].apellidos}`);
            insertarDivEnContenedor(capaPaciente, divNombre);
            
            // ID
            let divRow = creaDiv("row");
            let divLabel = creaDiv( "label", "ID");
            let divValue = creaDiv( "value", pacientes[i].id );
            insertarDivEnContenedor(divRow, divLabel, divValue, capaPaciente);

            // Sexo
            divRow = creaDiv("row");
            divLabel = creaDiv("label","Sexo");
            divValue = creaDiv("value",pacientes[i].sexo);

            insertarDivEnContenedor(divRow, divLabel, divValue, capaPaciente);

            // Temperatura
            divRow = creaDiv("row");
            divLabel = creaDiv("label","Temperatura");
            divValue = creaDiv("value",pacientes[i].temperatura);

            insertarDivEnContenedor(divRow, divLabel, divValue, capaPaciente);
         
            // Frecuencia cardiaca
            divRow = creaDiv("row");
            divLabel = creaDiv("label","Frec. Cardiaca");
            divValue = creaDiv("value",pacientes[i].frecuenciaCardiaca);

            insertarDivEnContenedor(divRow, divLabel, divValue, capaPaciente);

            // Especialidad
            divRow = creaDiv("row");
            divLabel = creaDiv("label","Especialidad");
            divValue = creaDiv("value",pacientes[i].especialidad);

            insertarDivEnContenedor(divRow, divLabel, divValue, capaPaciente);

            // Edad
            divRow = creaDiv("row");
            divLabel = creaDiv("label","Edad");
            divValue = creaDiv("value",pacientes[i].edad);

            insertarDivEnContenedor(divRow, divLabel, divValue, capaPaciente);
         }
         (capaPaciente && capaPaciente instanceof HTMLDivElement) &&
            divContenedor.appendChild(capaPaciente);
         
      }  
   }
};

/**
 * Muestra div con texto y formato indicado según parámetros.
 * @param mensaje String a mostrar
 * @param clase Clase CSS (danger | warning | success)
 */
export const muestraMensaje = (panelMensajes:string, mensaje:string, clase:string):void => {
   const capaMensaje = document.getElementById(panelMensajes);

   if ( capaMensaje && capaMensaje instanceof HTMLDivElement ) {
      capaMensaje.classList.add(clase);
      capaMensaje.innerHTML = mensaje.toString();
   }
}






