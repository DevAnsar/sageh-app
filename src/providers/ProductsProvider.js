import React, { useState} from 'react';


export const ProductsContext = React.createContext();
export const ProductsSetContext = React.createContext();

function ProductsProvider({children}) {
    const [products, setProducts] = useState(null);

    return (

        <ProductsContext.Provider value={products}>
            <ProductsSetContext.Provider value={setProducts}>
                        {children}
            </ProductsSetContext.Provider>
        </ProductsContext.Provider>

    );


}

export default ProductsProvider;