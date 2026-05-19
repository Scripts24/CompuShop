import { useState, useContext } from "react";
import { getFirestore, collection, writeBatch, addDoc, Timestamp, doc } from "firebase/firestore";
import { Link } from 'react-router-dom'
import { CartContext } from "../context/CartContext";
import Loader from "./Loader"
import emailjs from '@emailjs/browser';


const Checkout = () => {

	const [orderId, setOrderId] = useState('');
	const [creatingOrder, setCreatingOrder] = useState(false)
	const [formData, setFormData] = useState({
		name: "", userEmail: "", emailConfirm: "", phone: ""
	})
	const cartContext = useContext(CartContext);
	const { cartList, totalBuy, emptyCart } = cartContext;



	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const createOrder = (e) => {
		e.preventDefault();
		setCreatingOrder(true);

		const order = {};

		order.date = Timestamp.fromDate(new Date());
		order.buyer = {
			name: formData.name,
			email: formData.email,
			phone: formData.phone
		};

		order.total = totalBuy();

		order.items = cartList.map(cartItem => {
			const id = cartItem.id;
			const title = cartItem.title;
			const price = cartItem.price;
			const quantity = cartItem.quantity;
			const totalPrice = price * quantity;

			return { id, title, price, quantity, totalPrice };
		});

		const productosTexto = order.items.map(item =>
			`• ${item.title}
	Cantidad: ${item.quantity}
	Subtotal: $${item.totalPrice}
	`
		).join('\n');

		const db = getFirestore();
		const orderCollection = collection(db, 'orders');

		addDoc(orderCollection, order)
			.then(resp => {

				setOrderId(resp.id);

				// 📩 EMAIL ADMIN
				emailjs.send(
					'compushop_service',
					'template_5gvgg9l',
					{
						orderId: resp.id,
						name: formData.name,
						phone: formData.phone,
						email: formData.email,
						productos: productosTexto,
						total: totalBuy(),
						fecha: new Date().toLocaleString()
					},
					'or9iSjgH7pinttlXJ'
				)
					.then(() => {
						console.log('Email admin enviado');
					})
					.catch((error) => {
						console.error('Error email admin:', error);
					});


				// 📩 EMAIL CLIENTE
				emailjs.send(
					'compushop_service',
					'template_qkzxw1g',
					{
						orderId: resp.id,
						name: formData.name,
						email: formData.email,
						productos: productosTexto,
						total: totalBuy()
					},
					'or9iSjgH7pinttlXJ'
				)
					.then(() => {
						console.log('Email cliente enviado');
					})
					.catch((error) => {
						console.error('Error email cliente:', error);
					});

			})
			.catch(err => console.log(err))
			.finally(() => {

				setCreatingOrder(false);

				updateStock();

				emptyCart();

				setFormData({
					name: "",
					email: "",
					emailConfirm: "",
					phone: ""
				});

				Toastify({
					text: `Compra realizada exitosamente ✔`,
					position: "center",
					gravity: "top",
					duration: 3000,
					style: {
						background: "#548C1C",
						marginTop: "60px",
						padding: "20px",
						fontSize: "20px"
					},
				}).showToast();

			});
		function updateStock() {

			const batch = writeBatch(db);

			order.items.forEach(el => {

				let updateDoc = doc(db, 'computadoras', el.id);

				let currentStock = cartList.find(item => item.id === el.id).stock;

				batch.update(updateDoc, {
					stock: currentStock - el.quantity
				});

			});

			batch.commit();
		}
	}

	return (
		<>
			{creatingOrder
				?
				<>
					<h3>Procesando orden de compra...</h3>
					<Loader />
				</>
				:
				orderId
					?
					<div className="check">
						<div className="id-order">
							<h2 className="gracias">¡Gracias por su compra! <i className="bi bi-emoji-smile-fill"></i></h2>
							<div className="cardBox">
								<div className="card-check">
									<div className="h4"><h3>Se ha generado una orden con el ID: {orderId}</h3></div>
									<div className="content-check">
										<p>Por cualquier consulta, tiene a su disposición los medios de contacto al pie de página</p>
									</div>
								</div>
							</div>
							<Link to={"/"} className="buttons">
								<button>Regresar</button>
							</Link>
						</div>
					</div>
					:
					<div className="check">
						<h2 className="title-order">PROCESAR COMPRA</h2>
						<div className="contenedor-form" >
							<form className="contact-form"
								onSubmit={createOrder}
								onChange={handleChange}>
								<div className="input-box">
									<label className="input-label" >Nombre y Apellido</label>
									<input type="text" className="input" name="name" placeholder="Ej. Juan Pérez" defaultValue={formData.name} pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$" required />
									<span className="input-helper">Campo requerido</span>
									<span className="input-helper">Formato incorrecto</span>
								</div>
								<div className="input-box">
									<label className="input-label">Teléfono</label>
									<input type="number" className="input" name="phone" placeholder="Ej. 2215687733" defaultValue={formData.phone} pattern="/^\d{7,14}$/" required />
									<span className="input-helper">Campo requerido</span>
									<span className="input-helper">Formato incorrecto</span>
								</div>
								<div className="input-box">
									<label className="input-label"> Email</label>
									<input type="text" className="input" name="email" placeholder="Ej. youremail@gmail.com" defaultValue={formData.email} pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$" required />
									<span className="input-helper">Campo requerido</span>
									<span className="input-helper">Formato incorrecto</span>
								</div>
								<div className="input-box">
									<label className="input-label">Confirmar Email</label>
									<input type="text" className="input" name="emailConfirm" defaultValue={formData.emailConfirm} required />
									<span className="input-helper">Campo requerido</span>
									<span className="input-helper">Formato incorrecto</span>
								</div>
								<div><input type="submit" className="input" value="Procesar orden de compra" disabled={!formData.name || !formData.phone || !formData.email || formData.email !== formData.emailConfirm} /></div>
								<div><input type="reset" className="input" value="Reset" /></div>
								<Link to={"/"} className="buttons" >
									<button>Regresar</button>
								</Link>
							</form>
						</div>
					</div>
			}
		</>
	)
}

export default Checkout;