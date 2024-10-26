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
        materiales: [{ id_material: '', cantidad_egresada: '' }], // Múltiples materiales
        fecha_egreso: '',
        nombre_ubicacion: '',
        descripcion: '',
        nombre_solicitante: '',
        area_solicitante: '',
        fecha_solicitada: '',
        solicitud_aprobada: null, 
    };

    const validationSchema = Yup.object().shape({
        materiales: Yup.array().of(
            Yup.object().shape({
                id_material: Yup.string().required('Selecciona un material'),
                cantidad_egresada: Yup.number()
                    .typeError('Debe ser un número válido') // Validación explícita de tipo número
                    .required('La cantidad es requerida')
                    .positive('Debe ser un número positivo'),
            })
        ),
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

       

        console.log('Valores enviados:', values); 
        const formData = new FormData();
        const materialesConvertidos = values.materiales.map(material => ({
            ...material,
            cantidad_egresada: Number(material.cantidad_egresada) || 0, // Asegurarse de que sea un número
        }));
        formData.append('materiales', JSON.stringify(materialesConvertidos));
    
      
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

    // Función para agregar más materiales
    const agregarMaterial = (setFieldValue, valoresActuales) => {
        const nuevosMateriales = [...valoresActuales.materiales, { id_material: '', cantidad_egresada: '' }];
        setFieldValue('materiales', nuevosMateriales);
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
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        {mensaje && <div className="alert alert-success">{mensaje}</div>}

                        {/* Materiales */}
                        {values.materiales.map((material, index) => (
                            <div key={index}>
                                <FormBs.Group className="mb-3">
                                    <label htmlFor={`materiales.${index}.id_material`}>Material</label>
                                    <Field as="select" name={`materiales.${index}.id_material`} className="form-control">
                                        <option value="">Selecciona un material</option>
                                        {materiales.map((material) => (
                                            <option key={material.id_material} value={material.id_material}>
                                                {material.nombre_material}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name={`materiales.${index}.id_material`} component="div" className="text-danger" />
                                </FormBs.Group>

                                <FormBs.Group className="mb-3">
    <label htmlFor={`materiales.${index}.cantidad_egresada`}>Cantidad Egresada</label>
    <Field
        id={`materiales.${index}.cantidad_egresada`}
        name={`materiales.${index}.cantidad_egresada`}
        type="number"
        className="form-control"
    />
    <ErrorMessage name={`materiales.${index}.cantidad_egresada`} component="div" className="text-danger" />
</FormBs.Group>
                            </div>
                        ))}

                       
                        <Button variant="secondary" type="button" onClick={() => agregarMaterial(setFieldValue, values)}>
                            Agregar otro material
                        </Button>

                        <FormBs.Group className="mb-3">
    <label htmlFor="fecha_egreso">Fecha de Egreso</label>
    <Field id="fecha_egreso" name="fecha_egreso" type="date" className="form-control" />
    <ErrorMessage name="fecha_egreso" component="div" className="text-danger" />
</FormBs.Group>

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
