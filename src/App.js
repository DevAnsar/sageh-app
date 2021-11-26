import React, {useEffect} from 'react';
import {Container} from '@material-ui/core';
import {Route, Switch} from 'react-router-dom';
import routes from "./routes"
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from './providers/AuthProvider';
import SocketProvider from './providers/SocketProvider';
import SnackbarProvider from './providers/SnackbarProvider';
import RTL from './RTL';
import './App.css';
import CategoriesProvider from "./providers/CategoriesProvider";
// import ProductsProvider from "./providers/ProductsProvider";
import {ReactQueryDevtools} from 'react-query/devtools'
import {QueryClient, QueryClientProvider} from 'react-query'
import QuestionsProvider from "./providers/QuestionsProvider";
import QuestionProvider from "./providers/QuestionProvider";

// Create a client
const queryClient = new QueryClient()

// import {useParams} from "react-router-dom";
// import Splash from "./components/Theme/Splash";
// import "react-tiger-transition/styles/main.min.css";

function App() {
    const theme = createMuiTheme({
        direction: 'rtl',
        palette: {
            type: 'light', //'dark' , 'light'
            // primary: {
            //     main: 'rgb(36,210,101)',
            //     contrastText: '#fff',
            // },
        },
        typography: {
            fontFamily: [
                'IRANSans',
            ].join(','),
        },
    });
    // let {slug} = useParams();

    // const [splash,setSplash]=React.useState(true);
    // useEffect(()=>{
    //     console.log('sageh.ir runing...')
    //     setTimeout(()=>{setSplash(false)},4000);
    // },[]);
    return (

        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <AuthProvider>
                        <SocketProvider>
                            <CategoriesProvider>
                                <QuestionsProvider>
                                    <QuestionProvider>

                                        {/*<ProductsProvider>*/}


                                        <RTL>
                                            <Container disableGutters="true" maxWidth="false">
                                                {/*{splash&&<Splash />}*/}

                                                <Switch>
                                                    {routes.map((route) =>
                                                        route.private === true ? (
                                                            <PrivateRoute key={route.path} {...route} />
                                                        ) : (
                                                            <Route exact={route.exact}
                                                                   key={route.path} {...route} />
                                                        )
                                                    )}
                                                </Switch>
                                            </Container>
                                        </RTL>

                                        {/*</ProductsProvider>*/}
                                    </QuestionProvider>
                                </QuestionsProvider>
                            </CategoriesProvider>
                        </SocketProvider>
                    </AuthProvider>
                </SnackbarProvider>
                <ReactQueryDevtools/>
            </ThemeProvider>

        </QueryClientProvider>
    );
}

export default App;
