import { useEffect, useState } from "react";
import Data from "../data.json";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = ({ greeting }) => {
	const [computers, setComputers] = useState([]);
	const { category } = useParams();
	console.log(category)

	useEffect(() => {
		const getProducts = new Promise((resolve, reject) => {
			if (Data.length === 0) {
				reject(new Error("No hay productos para mostrar"));
			}
			resolve(Data);
			/*setTimeout(() => {
				resolve(Data);
			}, 2000);*/
		});

		getProducts.then((res) => setComputers(res));
		getProducts.then((res) => console.log(res));

		getProducts.catch((error) => {
			console.log("La llamada falló", error);
		})

	}, []);

	const catFilter = computers.filter((computer) => computer.category === category);

	return (
		<>
			<div className="greeting animate__animated animate__flash animate__slow">
				{greeting}
			</div>
			{category ? <ItemList computers={catFilter} /> :<ItemList computers={computers} />} 
		</>
	);
};

export default ItemListContainer;
