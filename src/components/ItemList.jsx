import Item from "./Item";

const ItemList = ({ computers }) => {
    return (
        <>
            <div className="container-cards">
                {computers?.map((computer) => (
                    <Item
                        key={computer.id}
                        id={computer.id}
                        title={computer.title}
                        price={computer.price}
                        description={computer.description}
                        image={computer.image}
                    />
                ))}
            </div>
        </>
    );
};

export default ItemList;
