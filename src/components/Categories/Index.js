import React from 'react';
import CustomTheme from './../Theme/Theme';

import Category from './Category';
import Loading from './../Loading';
// import {useFetch} from './../../hooks/useFetch';
import useCategories from './../../hooks/useCategories';


function Index() {
    // const [loading, data] = useFetch('/getCategories');
    const {loading, data} = useCategories();

    return (
        <CustomTheme>
            <div className="container-fluid" style={{minHeight: 'calc(100vh - 125px)'}}>
                <div className="row pb-3">
                    <div className="container">

                            <div className={`col-12`}>
                            </div>


                            <div className={`col-12 mt-5`}>
                                <div className={`row`}>
                                    {
                                        loading && <Loading/>
                                    }
                                    {
                                        data && data.categories?.map(category => {
                                            return <Category key={category.id} {...category}  />
                                        })
                                    }
                                </div>
                            </div>

                    </div>
                </div>
            </div>
        </CustomTheme>
    )
}

export default Index;