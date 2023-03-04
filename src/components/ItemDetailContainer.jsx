import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Data from "../data.json";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
    const { id } = useParams();

    const [computers, setComputer] = useState([]);

    useEffect(() => {
        const getProducts = new Promise((resolve, reject) => {
            if (Data.length === 0) {
                reject(new Error("No hay productos para mostrar"));
            }
            resolve(Data);
        });

        getProducts.then((res) => setComputer(res));
        getProducts.then((res) => console.log(res));

        getProducts.catch((error) => {
            console.log("La llamada falló", error);
        })

    }, []);


    const computerFilter = computers.filter((computer) => computer.id == id);
    return (
        <>
            {id ? <ItemDetail computers={computerFilter} /> : <ItemDetail computers={computers} />}
        </>
    );
};

export default ItemDetailContainer;
