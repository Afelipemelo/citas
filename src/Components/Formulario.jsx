import React,{Fragment,useState} from "react";
import { v4 as uuidv4} from 'uuid'
import PropTypes from "prop-types";

const Formulario = ({crearCita}) => {
    //creando state de citas
    const [cita,actualizarCita]= useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });
    const [error,actualizarError] =useState(false)
    //funcion que e ejecuta cada que el usuario esccribe en un input
    const actualizarState = e =>{
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }
    //extraer los valores
    const{mascota,propietario,fecha,hora,sintomas} =cita;
    //cuando el usuario preciona agragar cita 
    const submitCita = e =>{
        e.preventDefault();
        
        //validar
        if(mascota.trim() ==="" || propietario.trim() === "" || fecha.trim()=== "" || hora.trim()==="" || sintomas.trim()===""){
            actualizarError(true);
            return;
        }
        //eliminar el mensaje de error
        actualizarError(false);

        //asignar ID
        cita.id = uuidv4();
        //crear la cita
        crearCita(cita)
        //reiniciar el form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }
    return ( 
        <Fragment>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error"> Todos los campos son obligatorios</p> :null}
            <form
                onSubmit={submitCita}
            >
                
                <label> Nombre de mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizarState}
                    value = {mascota}
                    />
               
                <label> Nombre del Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueo de la mascota"
                    onChange={actualizarState}
                    value = {propietario}
                    />
               
                <label> Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value = {fecha}
                    />
               
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value= {hora}
                    />
               
                <label>Sintomas</label>
                <textarea 
                className="u-full-width"
                name="sintomas"
                onChange={actualizarState}
                value = {sintomas}
                ></textarea>
                
                <button
                type="submit"
                className="u-full-width button-primary"
                >Agregar cita  </button>
            </form>

        </Fragment>
     );
}

Formulario.propTypes ={
    crearCita: PropTypes.func.isRequired
}


export default Formulario;