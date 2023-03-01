import { useEffect, useState } from "react";
import ItemCount from "./ItemCount";
import Data from "../data.json";
import ItemList from "./ItemList";

const ItemListContainer = ({ greeting }) => {
	const [listProducts, setListProducts] = useState([]);
	const getProducts = new Promise((resolve, reject) => {
		
		if (Data.length === 0) {
			reject(new Error("No hay productos para mostrar"));
		}
		
		setTimeout(() => {
			resolve(Data);
		}, 2000);
	});

	useEffect(() => {
		getProducts
			.then((res) => {
				setListProducts(res);
				console.log(res);
			})
			
			.catch((error) => {
				console.log("La llamada falló", error);
			})
			.finally(() => {
				console.log("desactivar texto");
			});
	}, []);

	return (
		<>
			<div className=" greeting animate__animated animate__flash animate__slow">
				{greeting}
			</div>
			<ItemCount />
			<ItemList  computers={listProducts} />
			<h3>Cargando...</h3>
		</>
	);
};

export default ItemListContainer;
