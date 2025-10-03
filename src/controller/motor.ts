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
   let activarProtocolo = activarProtocoloUrgencia(pacientes);
   ( !activarProtocolo ) ? 
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

export const obtenPacientesAsignadosAPediatria = (
  pacientes: Pacientes[]
): Pacientes[] => {   

   const pacientesPediatria:Pacientes[] = pacientes.filter((paciente) => paciente.especialidad === "Pediatra")

   return pacientesPediatria;
};


export const obtenPacientesPediatriaMenorDe10 = (
  pacientes: Pacientes[]
): Pacientes[] => {   

   const pacientesPediatria:Pacientes[] = pacientes.filter((paciente) => 
      paciente.especialidad === "Pediatra" && paciente.edad < 10)

   return pacientesPediatria;
};

// APARTADO 2

// Activa protocolo si hay algún paciente con ritmo cardiaco superior a 100 y temperatura superior a 39º.
const activarProtocoloUrgencia = (pacientes: Pacientes[]): boolean => {

   
   let activarProtocolo = pacientes.some((paciente) => 
         paciente.frecuenciaCardiaca > 100 && paciente.temperatura > 39
      );

   return activarProtocolo;
};

// APARTADO 3
/* Reasignar pacientes de pediatra a médico de familia.
 * No modifica datos originales.
**/
const reasignaPacientesAMedicoFamilia = (
  pacientes: Pacientes[]
): Pacientes[] => {

   let pacientesReasignados: Pacientes[] = pacientes.map((paciente) => {
      return {
         ...paciente,
         especialidad: paciente.especialidad === "Pediatra"
            ? "Medico de familia"
            : paciente.especialidad
      }}
   )

   return pacientesReasignados;
};

// APARTADO 4
// Comprobar si quedan pacientes asignados a pediatra

const pediatraTienePacientes = (pacientes: Pacientes[]): boolean => {
   
   let tienePacientes:boolean = false;
   
   tienePacientes = pacientes.some((paciente) => 
      paciente.especialidad === "Pediatra"
   );
   
   return tienePacientes;
};

// APARTADO 5


const cuentaPacientesPorEspecialidad = (
  pacientes: Pacientes[]
): NumeroPacientesPorEspecialidad => {
  
   const contador:NumeroPacientesPorEspecialidad = pacientes.reduce((acc, paciente) => {
      if (paciente.especialidad === "Cardiólogo") {
         acc.cardiologia++;
      }else if ( paciente.especialidad === "Medico de familia" ) {
         acc.medicoDeFamilia++;
      }else if ( paciente.especialidad === "Pediatra" ) {
         acc.pediatria++;
      }
   return acc;

   }, { cardiologia: 0, medicoDeFamilia: 0, pediatria: 0 });

   return contador;
}