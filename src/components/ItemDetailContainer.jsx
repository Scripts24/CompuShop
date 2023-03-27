import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import LoaderDetail from "./LoaderDetail"
import { doc, getDoc, getFirestore } from "firebase/firestore";

const ItemDetailContainer = () => {

    const [computer, setComputer] = useState([]);
    const [loading, setLoading] = useState(true)
    const { id } = useParams();


    useEffect(() => {
        const db = getFirestore()
        const queryDb = doc(db, 'computadoras', id)
        getDoc(queryDb)
            .then(resp => setComputer({ id: resp.id, ...resp.data() }))
            .finally(() => setLoading(false))
    }, [id])


    return (
        <>
            {loading ? <LoaderDetail /> : <ItemDetail computer={computer} />}
        </>
    );
};

export default ItemDetailContainer;
