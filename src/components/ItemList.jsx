import Item from "./Item";

const ItemList = ({ computers }) => {
    return (
        <>
            <div className="container-cards">
                {computers.map((comp) => (
                    <Item
                        {...comp} key={comp.id}
                    />
                ))}
            </div>
        </>
    );
};

export default ItemList;
