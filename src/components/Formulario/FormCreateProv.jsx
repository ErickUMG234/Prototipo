import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import * as Yup from "yup"; 
import './FormProv.css';
import { axiosInstance } from '../../services/axios.config';

const FormCreateProv = () => {
    const [mensaje, setMensaje] = useState('');
    const initialValues = {
        nombre_proveedor: '',
        contacto: '',
        direccion: '',
        telefono: '',
        email: ''
    };

    const validationSchema = Yup.object().shape({
        nombre_proveedor: Yup.string().min(4, 'Nombre demasiado corto').max(80, 'Nombre demasiado largo').required('El campo es requerido'),
        contacto: Yup.string().min(10, 'Contacto demasiado corto').max(100, 'Contacto demasiado largo').required('El campo es requerido'),
        direccion: Yup.string().min(10, 'Dirección demasiado corta').max(150, 'Dirección demasiado larga').required('El campo es requerido'),
        telefono: Yup.string().min(9, 'Dirección demasiado corta').max(12, 'Dirección demasiado larga').required('El campo es requerido'),
        email: Yup.string().email('Email inválido').required('El campo es requerido')
    });

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    axiosInstance.post('/Proveedores', {
                        nombre_proveedor: values.nombre_proveedor,
                        contacto: values.contacto,
                        direccion: values.direccion,
                        telefono: values.telefono,
                        email: values.email
                    })
                    .then(r => {
                        
                        if (r.status === 201) {      // Limpia el formulario
                            console.log(r);
                            setMensaje('Proveedor creado exitosamente'); // Establece el mensaje de éxito
                      resetForm(); 
                            setSubmitting(false);
                        } else {
                            throw new Error(`[${r.status}] Error en la solicitud`);
                        }
                    })
                    .catch(err => console.log(err));
                   
                    setMensaje('Hubo un problema al crear el proveedor. Intentalo de nuevpo.'); // Mensaje en caso de error
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, errors, touched}) => (
                    <Form>
                        {mensaje && <div className="alert alert-success">{mensaje}</div>}
                        <FormBs.Group className="mb-3">
                            <label htmlFor='nombre_proveedor'>Nombre del Proveedor</label>
                            <Field id='nombre_proveedor' type='text' placeholder='Nombre del proveedor' name='nombre_proveedor' className='form-control field-input'/>
                            {errors.nombre_proveedor && touched.nombre_proveedor && (
                                <ErrorMessage name='nombre_proveedor' component='div' className='text-danger'/>
                            )}
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor='contacto'>Contacto</label>
                            <Field id='contacto' type='text' placeholder='Contacto' name='contacto' className='form-control field-input'/>
                            
                            {errors.contacto && touched.contacto && (
                                <ErrorMessage name='contacto' component='div' className='text-danger'/>
                            )}
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor='direccion'>Dirección</label>
                            <Field id='direccion' type='text' placeholder='Dirección' name='direccion' className='form-control field-input'/>
                            {errors.direccion && touched.direccion && (
                                <ErrorMessage name='direccion' component='div' className='text-danger'/>
                            )}
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor='telefono'>Teléfono</label>
                            <Field id='telefono' type='text' placeholder='Teléfono' name='telefono' className='form-control field-input'/>
                            {errors.telefono && touched.telefono && (
                                <ErrorMessage name='telefono' component='div' className='text-danger'/>
                            )}
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor='email'>Email</label>
                            <Field id='email' type='email' placeholder='Email' name='email' className='form-control field-input'/>
                            {errors.email && touched.email && (
                                <ErrorMessage name='email' component='div' className='text-danger'/>
                            )}
                        </FormBs.Group>

                        <Button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Crear Proveedor'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormCreateProv;
