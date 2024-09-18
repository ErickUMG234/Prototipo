import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { Formik, Field, Form, ErrorMessage } from "formik";
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import * as Yup from "yup";
import './FormEg.css'; 
import { axiosInstance } from '../../services/axios.config';

const FormCreateEgreso = () => {
    const { usuarioAutenticado } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [materiales, setMateriales] = useState([]);
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
        const fetchData = async () => {
            try {
                const resMateriales = await axiosInstance.get('/Materiales');
                setMateriales(resMateriales.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const initialValues = {
        id_material: '',
      
        cantidad_egresada: '',
        fecha_egreso: '',
        nombre_ubicacion: '',
        descripcion: '',
        nombre_solicitante: '',
        area_solicitante: '',
        fecha_solicitada: '',
        solicitud_aprobada: null, // Archivo PDF
    };

    const validationSchema = Yup.object().shape({
        id_material: Yup.string().required('Selecciona un material'),
      
        cantidad_egresada: Yup.number().required('La cantidad egresada es requerida').positive('Debe ser un número positivo'),
        fecha_egreso: Yup.date().required('La fecha de egreso es requerida'),
        nombre_ubicacion: Yup.string().required('El nombre de la ubicación es requerido'),
        descripcion: Yup.string().required('La descripción es requerida'),
        nombre_solicitante: Yup.string().required('El nombre del solicitante es requerido'),
        area_solicitante: Yup.string().required('El área solicitante es requerida'),
        fecha_solicitada: Yup.date().required('La fecha solicitada es requerida'),
        solicitud_aprobada: Yup.mixed().required('El documento aprobado es requerido'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if (!usuarioAutenticado || !usuarioAutenticado.id_usuario) {
            setMensaje('Error: No hay un usuario autenticado.');
            setSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('id_material', values.id_material);
        
        formData.append('cantidad_egresada', values.cantidad_egresada);
        formData.append('fecha_egreso', values.fecha_egreso);
        formData.append('nombre_ubicacion', values.nombre_ubicacion);
        formData.append('descripcion', values.descripcion);
        formData.append('nombre_solicitante', values.nombre_solicitante);
        formData.append('area_solicitante', values.area_solicitante);
        formData.append('fecha_solicitada', values.fecha_solicitada);
        formData.append('solicitud_aprobada', values.solicitud_aprobada); // Archivo PDF

        try {
            const res = await axiosInstance.post('/egresos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 201) {
                setMensaje('Egreso y Ubicación creados exitosamente');
                resetForm();
            }
        } catch (error) {
            console.error("Error creando el egreso:", error);
            setMensaje('Hubo un error al crear el egreso y la ubicación');
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

                        {/* Material */}
                        <FormBs.Group className="mb-3">
                            <label htmlFor="id_material">Material</label>
                            <Field as="select" id="id_material" name="id_material" className="form-control">
                                <option value="">Selecciona un material</option>
                                {materiales.map(material => (
                                    <option key={material.id_material} value={material.id_material}>
                                        {material.nombre_material}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="id_material" component="div" className="text-danger" />
                        </FormBs.Group>

                       

                        {/* Cantidad Egresada */}
                        <FormBs.Group className="mb-3">
                            <label htmlFor="cantidad_egresada">Cantidad Egresada</label>
                            <Field id="cantidad_egresada" type="number" name="cantidad_egresada" className="form-control" />
                            <ErrorMessage name="cantidad_egresada" component="div" className="text-danger" />
                        </FormBs.Group>

                        {/* Fecha de Egreso */}
                        <FormBs.Group className="mb-3">
                            <label htmlFor="fecha_egreso">Fecha de Egreso</label>
                            <Field id="fecha_egreso" name="fecha_egreso" type="date" className="form-control" />
                            <ErrorMessage name="fecha_egreso" component="div" className="text-danger" />
                        </FormBs.Group>

                        {/* Ubicación */}
                        <FormBs.Group className="mb-3">
                            <label htmlFor="nombre_ubicacion">Ubicación</label>
                            <Field id="nombre_ubicacion" name="nombre_ubicacion" type="text" className="form-control" />
                            <ErrorMessage name="nombre_ubicacion" component="div" className="text-danger" />
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor="descripcion">Descripción</label>
                            <Field id="descripcion" name="descripcion" type="text" className="form-control" />
                            <ErrorMessage name="descripcion" component="div" className="text-danger" />
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor="nombre_solicitante">Nombre del Solicitante</label>
                            <Field id="nombre_solicitante" name="nombre_solicitante" type="text" className="form-control" />
                            <ErrorMessage name="nombre_solicitante" component="div" className="text-danger" />
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor="area_solicitante">Área del Solicitante</label>
                            <Field id="area_solicitante" name="area_solicitante" type="text" className="form-control" />
                            <ErrorMessage name="area_solicitante" component="div" className="text-danger" />
                        </FormBs.Group>

                        <FormBs.Group className="mb-3">
                            <label htmlFor="fecha_solicitada">Fecha Solicitada</label>
                            <Field id="fecha_solicitada" name="fecha_solicitada" type="date" className="form-control" />
                            <ErrorMessage name="fecha_solicitada" component="div" className="text-danger" />
                        </FormBs.Group>

                        {/* Subir Documento Aprobado */}
                        <FormBs.Group className="mb-3">
                            <label htmlFor="solicitud_aprobada">Subir Documento Aprobado</label>
                            <input
                                id="solicitud_aprobada"
                                name="solicitud_aprobada"
                                type="file"
                                className="form-control"
                                onChange={(event) => setFieldValue('solicitud_aprobada', event.currentTarget.files[0])}
                            />
                            <ErrorMessage name="solicitud_aprobada" component="div" className="text-danger" />
                        </FormBs.Group>

                        {/* Botón de envío */}
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Crear Egreso
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormCreateEgreso;
