import { useState, useContext } from "react";
import { getFirestore, collection, writeBatch, addDoc, Timestamp, doc } from "firebase/firestore";
import { Link } from 'react-router-dom'
import { CartContext } from "../context/CartContext";
import Loader from "./Loader"

const Checkout = () => {

	const [orderId, setOrderId] = useState('');
	const [creatingOrder, setCreatingOrder] = useState(false)
	const [formData, setFormData] = useState({
		name: "", email: "", emailConfirm: "", phone: ""
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
		setCreatingOrder(true)
		delete formData.emailConfirm
		let order = {}
		order.date = Timestamp.fromDate(new Date())
		order.buyer = formData
		order.total = totalBuy()

		order.items = cartList.map(cartItem => {
			const id = cartItem.id
			const title = cartItem.title
			const price = cartItem.price
			const quantity = cartItem.quantity
			const totalPrice = cartItem.price * cartItem.quantity
			return { id, title, price, quantity, totalPrice }
		})

		const db = getFirestore()
		const orderCollection = collection(db, 'orders')
		addDoc(orderCollection, order)
			.then(resp => setOrderId(resp.id))
			.catch(err => console.log(err))
			.finally(() => {
				setCreatingOrder(false)
				updateStock()
				emptyCart()
				setFormData({
					name: "", email: "", emailConfirm: "", phone: ""
				})
				{
					Toastify({
						text: (`Compra realizada exitosamente ✔`),
						position: "center",
						gravity: "top",
						duration: 3000,
						style: {
							background: "#548C1C",
							marginTop: "60px",
							padding: "20px",
							fontSize: "20px"
						},
					}).showToast()
				}
			})

		function updateStock() {
			const batch = writeBatch(db)

			order.items.map(el => {
				let updateDoc = doc(db, 'computadoras', el.id)
				let currentStock = cartList.find(item => item.id === el.id).stock

				batch.update(updateDoc, {
					stock: currentStock - el.quantity
				})
			})

			batch.commit()
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
									<input type="text" className="input" name="email" placeholder="Ej. juanperez@ejemplo.com" defaultValue={formData.email} pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$" required />
									<span className="input-helper">Campo requerido</span>
									<span className="input-helper">Formato incorrecto</span>
								</div>
								<div className="input-box">
									<label className="input-label">Confirmar Email</label>
									<input type="text" className="input" name="emailConfirm" defaultValue={formData.emailConfirm} required />
									<span className="input-helper">Campo requerido</span>
									<span className="input-helper">Formato incorrecto</span>
								</div>
								<div><input type="submit" className="input" value="Procesar orden de compra" disabled={!formData.name || !formData.phone || !formData.email || formData.email !== formData.emailConfirm || cartList.length == 0} /></div>
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