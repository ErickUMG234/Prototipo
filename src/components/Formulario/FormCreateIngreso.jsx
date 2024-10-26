import { useState, useEffect, useContext} from "react";
import { AuthContext } from '../../context/AuthContext';
import { Formik, Field, Form, ErrorMessage } from "formik";

import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import * as Yup from "yup"; 
import './FormIng.css';
import { axiosInstance } from '../../services/axios.config';






const FormCreateIngreso = () => {
    const { usuarioAutenticado} = useContext(AuthContext);
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
    }, [usuarioAutenticado])

    // Fetch de materiales y proveedores
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

    // Función para añadir un nuevo ingreso dinámicamente
    const addIngreso = (setFieldValue, values) => {
        const nuevosIngresos = [...values.ingresos, { id_material: '', id_proveedor: '', cantidad_ingresada: '', fecha_ingreso: '' }];
        setFieldValue('ingresos', nuevosIngresos);
    };

    const validationSchema = Yup.object().shape({
        descripcion: Yup.string().required('La descripción es requerida'),
        ingresos: Yup.array().of(
            Yup.object().shape({
                id_material: Yup.string().required('Selecciona un material'),
                id_proveedor: Yup.string().required('Selecciona un proveedor'),
                cantidad_ingresada: Yup.number().required('La cantidad es requerida').positive('Debe ser un número positivo'),
                fecha_ingreso: Yup.date().required('La fecha de ingreso es requerida')
            })
        ),
        solicitud_recibido: Yup.mixed().required('La solicitud de recibido es requerida'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if (!usuarioAutenticado || !usuarioAutenticado.id_usuario) {
            setMensaje('Error: No hay un usuario autenticado.');
            setSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('descripcion', values.descripcion);
        formData.append('solicitud_recibido', values.solicitud_recibido);
        formData.append('proveedor_materiales', JSON.stringify(values.ingresos));  // Convertir el array a JSON
        formData.append('id_usuario', usuarioAutenticado.id_usuario);

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
            console.error("Error creando el ingreso:", error);
            setMensaje('Hubo un error al crear el ingreso');
        }
        setSubmitting(false);
    };
    if (!isLoaded) {
        return <p>Cargando usuario autenticado...</p>; // Mostrar mientras está cargando
    }

    return (
        <div className="container">
            {usuarioAutenticado && (
                <div className="alert alert-info">
                    <strong>Usuario autenticado: </strong>{usuarioAutenticado.nombre_usuario}
                </div>
            )}
           <Formik
                initialValues={{ descripcion: '', ingresos: [{ id_material: '', id_proveedor: '', cantidad_ingresada: '', fecha_ingreso: '' }], solicitud_recibido: null }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        {mensaje && <div className="alert alert-success">{mensaje}</div>}

                        <FormBs.Group className="mb-3">
                            <label htmlFor="descripcion">Descripción de la Solicitud</label>
                            <Field name="descripcion" type="text" className="form-control" />
                            <ErrorMessage name="descripcion" component="div" className="text-danger" />
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor="solicitud_recibido">Subir Solicitud Recibida</label>
                            <input id="solicitud_recibido" name="solicitud_recibido" type="file" className="form-control"
                                onChange={(event) => setFieldValue('solicitud_recibido', event.currentTarget.files[0])} />
                            <ErrorMessage name="solicitud_recibido" component="div" className="text-danger" />
                        </FormBs.Group>

                        {/* Renderizar cada ingreso dinámicamente */}
                        {values.ingresos.map((ingreso, index) => (
                            <div key={index}>
                                <FormBs.Group className="mb-3">
                                    <label>Material</label>
                                    <Field as="select" name={`ingresos.${index}.id_material`} className="form-control">
                                        <option value="">Selecciona un material</option>
                                        {materiales.map(material => (
                                            <option key={material.id_material} value={material.id_material}>
                                                {material.nombre_material}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name={`ingresos.${index}.id_material`} component="div" className="text-danger" />
                                </FormBs.Group>

                                <FormBs.Group className="mb-3">
                                    <label>Proveedor</label>
                                    <Field as="select" name={`ingresos.${index}.id_proveedor`} className="form-control">
                                        <option value="">Selecciona un proveedor</option>
                                        {proveedores.map(proveedor => (
                                            <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                                                {proveedor.nombre_proveedor}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name={`ingresos.${index}.id_proveedor`} component="div" className="text-danger" />
                                </FormBs.Group>

                                <FormBs.Group className="mb-3">
                                    <label>Cantidad Ingresada</label>
                                    <Field name={`ingresos.${index}.cantidad_ingresada`} type="number" className="form-control" />
                                    <ErrorMessage name={`ingresos.${index}.cantidad_ingresada`} component="div" className="text-danger" />
                                </FormBs.Group>

                                <FormBs.Group className="mb-3">
                                    <label>Fecha de Ingreso</label>
                                    <Field name={`ingresos.${index}.fecha_ingreso`} type="date" className="form-control" />
                                    <ErrorMessage name={`ingresos.${index}.fecha_ingreso`} component="div" className="text-danger" />
                                </FormBs.Group>
                            </div>
                        ))}

                        <Button variant="secondary" onClick={() => addIngreso(setFieldValue, values)}>Agregar otro material</Button>

                        <Button variant="primary" type="submit">Crear Ingreso</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormCreateIngreso;

