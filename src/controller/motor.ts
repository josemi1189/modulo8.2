import { pacientes } from "../assets/datos";
import { muestraDatosPacientes, muestraMensaje } from "../ui/ui";
import { NumeroPacientesPorEspecialidad, Pacientes } from "../modelo";


export const principal = () => {
   // Apartado 1
   let pediatria = obtenPacientesAsignadosAPediatria(pacientes);
   muestraDatosPacientes("pediatria", pediatria);
   
   let pediatriaMenor10 = obtenPacientesPediatriaMenorDe10(pacientes);
   muestraDatosPacientes("pediatriaMenor10", pediatriaMenor10);

   // Apartado 2
   let activarProctolo = activarProtocoloUrgencia(pacientes);
   ( activarProctolo ) ? 
      muestraMensaje("protocolo", "Activar protocolo de urgencia", "danger") 
      : muestraMensaje("protocolo", "Todo correcto", "success")

   // Apartado 3
   let pediatraAMedicoFamilia = reasignaPacientesAMedicoFamilia(pacientes);
   muestraDatosPacientes("reasignaMedicoFamilia", pediatraAMedicoFamilia);
   
   // Apartado 4
   let tienePacientes = pediatraTienePacientes(pacientes);
   ( tienePacientes ) ?
      muestraMensaje("pacientesPediatra", "Pediatra sigue teniendo pacientes","danger") 
      : muestraMensaje("pacientesPediatra", "Pediatra no tiene pacientes","success");


   // Apartado 5

   let pacientesPorEspecialidad = cuentaPacientesPorEspecialidad(pacientes);
   
   muestraMensaje("totalPacientesCardiologo", `Cardiólogo: ${pacientesPorEspecialidad.cardiologia} pacientes.`, "warning");
   muestraMensaje("totalPacientesMedicoFamilia", `Médico de familia: ${pacientesPorEspecialidad.medicoDeFamilia} pacientes.`, "warning");
   muestraMensaje("totalPacientesPediatra", `Pediatra: ${pacientesPorEspecialidad.pediatria} pacientes.`, "warning");
}

// APARTADO 1

// a) lista de paciente que están asignados a la especialidad de Pediatría
export const obtenPacientesAsignadosAPediatria = (
  pacientes: Pacientes[]
): Pacientes[] => {   
   
   let pacientesPediatria:Pacientes[] = [];
   for ( let i = 0; i < pacientes.length; i++ ) {
      ( pacientes[i].especialidad === "Pediatra" ) && pacientesPediatria.push(pacientes[i]);
   }

   return pacientesPediatria;
};

// b) lista de pacientes asignados a Pediatría y que tengan una edad menor de 10 años.
export const obtenPacientesPediatriaMenorDe10 = (
  pacientes: Pacientes[]
): Pacientes[] => {   
   
   let pacientesPediatria:Pacientes[] = [];
   for ( let i = 0; i < pacientes.length; i++ ) {
      ( pacientes[i].especialidad === "Pediatra" && pacientes[i].edad < 10) && pacientesPediatria.push(pacientes[i]);
   }

   return pacientesPediatria;
};

// APARTADO 2

// Activa protocolo si paciente con ritmo cardíaco superior a 100 y temperatura superior a 39º.
const activarProtocoloUrgencia = (pacientes: Pacientes[]): boolean => {
   let activarProctolo = false;

   for ( let i = 0; i < pacientes.length; i++ ) {
      if ( pacientes[i].frecuenciaCardiaca > 100 && pacientes[i].temperatura > 39 ){
         activarProctolo = true;
      }
   }
   return activarProctolo;
};

// APARTADO 3
/* Reasignar pacientes de pediatra a médico de familia.
 * No modifica datos originales.
**/
const reasignaPacientesAMedicoFamilia = (
  pacientes: Pacientes[]
): Pacientes[] => {

   let pacientesReasignados:Pacientes[] = []
   
   for ( let i = 0; i < pacientes.length; i++ ) {
      let copiaPacientes:Pacientes = { ...pacientes[i] };
      if ( copiaPacientes.especialidad === "Pediatra" ) {
            copiaPacientes.especialidad = "Medico de familia";
      }
      pacientesReasignados.push(copiaPacientes);
   }
   return pacientesReasignados;
};

// APARTADO 4
// Comprobar si quedan pacientes asignados a pediatra

const pediatraTienePacientes = (pacientes: Pacientes[]): boolean => {
  let tienePacientes = false;

   for ( let i = 0; i < pacientes.length; i++ ) {
      if ( pacientes[i].especialidad === "Pediatra" ){
         tienePacientes = true;
      }
   }
   return tienePacientes;
};

// APARTADO 5



const cuentaPacientesPorEspecialidad = (
  pacientes: Pacientes[]
): NumeroPacientesPorEspecialidad => {
  
   let totalPacientes :NumeroPacientesPorEspecialidad = {
      cardiologia: 0,
      medicoDeFamilia: 0,
      pediatria: 0
   };
   
   for ( let i = 0; i<pacientes.length; i++ ) {
      switch(pacientes[i].especialidad) {
         case "Cardiólogo": totalPacientes.cardiologia++;
            break;
         case "Medico de familia": totalPacientes.medicoDeFamilia++;
            break;
         case "Pediatra": totalPacientes.pediatria++;
            break;
      }
   }
   

   return totalPacientes;

};