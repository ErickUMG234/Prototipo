import { useState, useEffect, useContext} from "react";
import { AuthContext } from '../../context/AuthContext';
import { Formik, Field, Form, ErrorMessage } from "formik";

import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import * as Yup from "yup"; 
import './FormIng.css';
import { axiosInstance } from '../../services/axios.config';






const FormCreateIngreso = () => {
    const { usuarioAutenticado } = useContext(AuthContext); 
    const [isLoaded, setIsLoaded] = useState(false); 
    const [materiales, setMateriales] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    
    const [mensaje, setMensaje] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
           
            window.location.reload();
        } else {
            
            setTimeout(() => {
                if (usuarioAutenticado) {
                    setIsLoaded(true); 
                } else {
                   
                    window.location.reload();
                }
            }, 1000); 
        }
    }, [usuarioAutenticado]);


    useEffect(() => {
        if (usuarioAutenticado) {
            setIsLoaded(true);  
        }
    }, [usuarioAutenticado]);





    useEffect(() => {
        const fetchData = async () => {
            try {
                const resMateriales = await axiosInstance.get('/Materiales');
                const resProveedores = await axiosInstance.get('/Proveedores');
               
                setMateriales(resMateriales.data);
                setProveedores(resProveedores.data);
              
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const initialValues = {
        id_material: '',
        id_proveedor: '',
        cantidad_ingresada: '',
        fecha_ingreso: '',  
        
        solicitud_recibido: null,  // Archivo PDF
    };

    const validationSchema = Yup.object().shape({
        id_material: Yup.string().required('Selecciona un material'),
        id_proveedor: Yup.string().required('Selecciona un proveedor'),
        cantidad_ingresada: Yup.number().required('La cantidad es requerida').positive('Debe ser un número positivo'),
        fecha_ingreso: Yup.date().required('La fecha de ingreso es requerida'),  // Validación de fecha
       
        solicitud_recibido: Yup.mixed().required('La solicitud de recibido es requerida'),
    });






    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if (!usuarioAutenticado || !usuarioAutenticado.id_usuario) {
            
            setMensaje('Error: No hay un usuario autenticado.');
            setSubmitting(false);
            return;
        }
        
        const formData = new FormData();
        formData.append('id_material', values.id_material);
        formData.append('id_proveedor', values.id_proveedor);
        formData.append('cantidad_ingresada', values.cantidad_ingresada);
        formData.append('fecha_ingreso', values.fecha_ingreso);  
        formData.append('id_usuario', usuarioAutenticado.id_usuario);
        formData.append('solicitud_recibido', values.solicitud_recibido); 

        try {
            const res = await axiosInstance.post('/Ingresos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 201) {
                setMensaje('Ingreso creado exitosamente');
                resetForm();
            }
        } catch (error) {
            console.error("Error creating ingreso:", error);
            setMensaje('Hubo un error al crear el ingreso');
        }
        setSubmitting(false);
    };



  if (!isLoaded) {
    return <p>Cargando...</p>; 
}



    return (
        <div className="container">
              
            {usuarioAutenticado && (
                <div className="alert alert-info">
                    <strong>Usuario autenticado: </strong>{usuarioAutenticado.nombre_usuario}
                </div>
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        {mensaje && <div className="alert alert-success">{mensaje}</div>}

                       
                        <FormBs.Group className="mb-3">
                            <label htmlFor="id_material">Material</label>
                            <Field as="select" id="id_material" name="id_material" className="form-control" >
                                <option value="">Selecciona un material</option>
                                {materiales.map(material => (
                                    <option key={material.id_material} value={material.id_material}>
                                        {material.nombre_material}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="id_material" component="div" className="text-danger" />
                        </FormBs.Group>

                       
                        <FormBs.Group className="mb-3">
                            <label htmlFor="id_proveedor">Proveedor</label>
                            <Field as="select" id="id_proveedor" name="id_proveedor" className="form-control black-text" >
                                <option value="">Selecciona un proveedor</option>
                                {proveedores.map(proveedor => (
                                    <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                                        {proveedor.nombre_proveedor}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="id_proveedor" component="div" className="text-danger" />
                        </FormBs.Group>

                      
                        <FormBs.Group className="mb-3">
                            <label htmlFor="cantidad_ingresada">Cantidad Ingresada</label>
                            <Field id="cantidad_ingresada" type="number" name="cantidad_ingresada" className="form-control"  />
                            <ErrorMessage name="cantidad_ingresada" component="div" className="text-danger" />
                        </FormBs.Group>

                       
                        <FormBs.Group className="mb-3">
                            <label htmlFor="fecha_ingreso">Fecha de Ingreso</label>
                            <Field id="fecha_ingreso" name="fecha_ingreso" type="date" className="form-control" />
                            <ErrorMessage name="fecha_ingreso" component="div" className="text-danger" />
                        </FormBs.Group>


                        
                        <FormBs.Group className="mb-3">
                            <label htmlFor="solicitud_recibido">Subir Solicitud Recibido</label>
                            <input id="solicitud_recibido" name="solicitud_recibido" type="file" className="form-control"
                                onChange={(event) => setFieldValue('solicitud_recibido', event.currentTarget.files[0])} />
                            <ErrorMessage name="solicitud_recibido" component="div" className="text-danger" />
                        </FormBs.Group>

                    
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Crear Ingreso
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormCreateIngreso;

