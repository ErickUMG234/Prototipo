

import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import * as Yup from "yup"; 
import './formulario.css';
import { axiosInstance } from '../../services/axios.config';


const FormCreateProduct = () => {
    const [mensaje, setMensaje] = useState('');
    const initialValues = {
        nombre_material: '',
        descripcion: '',
        unidades: '',
        Cantidad_disponible: '',
        fecha_registro: ''
    };

    const validationSchema = Yup.object().shape({
        nombre_material: Yup.string().min(4, 'Nombre demasiado corto').max(80, 'Nombre demasiado largo').required('El campo es requerido'),
        descripcion: Yup.string().min(10, 'Descripción demasiado corta').max(100, 'Descripción demasiado larga').required('El campo es requerido'),
        unidades: Yup.string().required('El campo es requerido'),
        Cantidad_disponible: Yup.number().required('El campo es requerido'),
        fecha_registro: Yup.date().required('El campo es requerido')
    });

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting,resetForm }) => {
                    console.log(values);
                    axiosInstance.post('/Materiales', {
                        nombre_material: values.nombre_material,
                        descripcion: values.descripcion,
                        unidades: values.unidades,
                        Cantidad_disponible: values.Cantidad_disponible,
                        fecha_registro: values.fecha_registro || new Date().toISOString()
                    })
                    .then(r => {
                        
                        if (r.status === 201) {
                            console.log(r);
                            setMensaje('Producto creado exitosamente'); 
                            resetForm(); 
                            setSubmitting(false);
                        } else {
                            throw new Error(`[${r.status}] Error en la solicitud`);
                        }
                    })
                    .catch(err => console.log(err));
                   
                    setMensaje('Hubo un problema al crear el producto. Inténtalo de nuevo.'); 
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form>
                          {mensaje && <div className="alert alert-success">{mensaje}</div>}
                        <FormBs.Group className="mb-3">
                            <label htmlFor='nombre_material'>Nombre del Material</label>
                            <Field id='nombre_material' type='text' placeholder='Material' name='nombre_material' className='form-control field-input'/>
                            {errors.nombre_material && touched.nombre_material && (
                                <ErrorMessage name='nombre_material' component='div'/>
                            )}
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor='descripcion'>Descripción del Material</label>
                            <Field id='descripcion' type='text' placeholder='Descripción' name='descripcion' className='form-control field-input'/>
                            {errors.descripcion && touched.descripcion && (
                                <ErrorMessage name='descripcion' component='div'/>
                            )}
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor='unidades'>Unidades</label>
                            <Field id='unidades' type='text' placeholder='Unidades' name='unidades' className='form-control field-input'/>
                            {errors.unidades && touched.unidades && (
                                <ErrorMessage name='unidades' component='div'/>
                            )}
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor='Cantidad_disponible'>Cantidad Disponible</label>
                            <Field id='Cantidad_disponible' type='number' placeholder='Cantidad' name='Cantidad_disponible' className='form-control field-input'/>
                            {errors.Cantidad_disponible && touched.Cantidad_disponible && (
                                <ErrorMessage name='Cantidad_disponible' component='div'/>
                            )}
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor='fecha_registro'>Fecha de Registro</label>
                            <Field id='fecha_registro' type='date' name='fecha_registro' className='form-control field-input'/>
                            {errors.fecha_registro && touched.fecha_registro && (
                                <ErrorMessage name='fecha_registro' component='div'/>
                            )}
                        </FormBs.Group>

                        <Button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Cargar nuevo producto'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormCreateProduct;
