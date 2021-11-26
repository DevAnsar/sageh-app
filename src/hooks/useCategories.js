import React from "react"
import { CategoriesContext,CategoriesContextLoading  } from "../providers/CategoriesProvider"

function useCategories() {

    const data = React.useContext(CategoriesContext);
    const loading = React.useContext(CategoriesContextLoading);

    if (data === undefined) {
        throw new Error("render <CategoriesProvider /> at top of the tree")
    }
    return {data,loading};
}

export default useCategories;

