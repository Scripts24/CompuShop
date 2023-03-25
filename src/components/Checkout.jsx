import { useForm } from "react-hook-form";

const Checkout = () => {

	const { register, formState: { errors }, handleSubmit } = useForm();

	const onSubmit = () => {

		Toastify({
			text: (`Orden generada con éxito ✔`),
			position: "center",
			gravity: "bottom",
			duration: 3000,
			style: {
				background: "#548C1C",
				padding: "30px",
				fontSize: "30px"
			},
		}).showToast();
	}




	return (
		<div className="check">
			<h2 className="title-order">ORDEN DE COMPRA</h2>
			<div className="contenedor-form" >
				<form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
					<div className="input-box">
						<label className="input-label">Nombre y Apellido</label>
						<input type="text" className="input"  {...register('nombre', {
							required: true,
							pattern: /^[a-zA-ZÀ-ÿ\s]{1,40}$/
						})} />
						{errors.nombre?.type === 'required' && <span className="input-helper">Campo requerido</span>}
						{errors.nombre?.type === 'pattern' && <span className="input-helper">Formato incorrecto</span>}
					</div>
					<div className="input-box">
						<label className="input-label">Dirección</label>
						<input type="text" className="input" {...register('direccion', {
							required: true,
							pattern: /^[a-zA-ZÀ-ÿ\s]{1,40}$/
						})} />
						{errors.direccion?.type === 'required' && <span className="input-helper">Campo requerido</span>}
						{errors.direccion?.type === 'pattern' && <span className="input-helper">Formato incorrecto</span>}
					</div>
					<div className="input-box">
						<label className="input-label">Teléfono</label>
						<input type="number" className="input" {...register('telefono', {
							required: true,
							pattern: /^\d{7,12}$/
						})} />
						{errors.telefono?.type === 'required' && <span className="input-helper">Campo requerido</span>}
						{errors.telefono?.type === 'pattern' && <span className="input-helper">Formato incorrecto</span>}
					</div>
					<div className="input-box">
						<label className="input-label">Email</label>
						<input type="text" className="input"  {...register('email', {
							required: true,
							pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
						})} />
						{errors.email?.type === 'required' && <span className="input-helper">Campo requerido</span>}
						{errors.email?.type === 'pattern' && <span className="input-helper">Formato incorrecto</span>}
					</div>
					<div><input type="submit" className="input" value="Enviar" /></div>
					<div><input type="reset" className="input" value="Borrar" /></div>
				</form>
			</div>
		</div>
	)
}

export default Checkout;