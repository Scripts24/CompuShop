import { useEffect, useState } from "react";
import Loader from "./Loader"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = ({ greeting }) => {
	const [computers, setComputers] = useState([]);
	const [loading, setLoading] = useState(true)
	const { category } = useParams();

	useEffect(() => {
		const db = getFirestore();
		if (category) {
			const queryCollectionCategory = query(collection(db, 'computadoras'), where('category', '==', category))
			getDocs(queryCollectionCategory)
				.then(resp => setComputers(resp.docs.map(prod => ({ id: prod.id, ...prod.data() }))))
				.finally(() => setLoading(false))
		} else {
			const queryCollection = collection(db, 'computadoras')
			getDocs(queryCollection)
				.then(resp => setComputers(resp.docs.map(prod => ({ id: prod.id, ...prod.data() }))))
				.finally(() => setLoading(false))
		}
	}, [category])
	


	return (
		<div>
			<div className="greeting animate__animated animate__flash animate__slow">
				{greeting}</div>
			<div>
				<div>
					{loading ? <Loader /> : <ItemList computers={computers} />}
				</div>
			</div>
		</div>

	);
};

export default ItemListContainer;
