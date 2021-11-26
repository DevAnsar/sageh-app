// import Index from './pages/Index/Index';
import LoginMobile from './components/Login/Index';
import CategoriesPage from './pages/Categories/CategoriesPage';
import CategoryProducts from './pages/Categories/CategoryProducts';
import Chats from './components/Chats/Index';
import Product from './components/Products/Product';
import UserProfile from './components/User/UserProfile';
import Meteorology from './components/Meteorology/Meteorology';
import QuestionsPage from './pages/Questions/QuestionsPage';
import QuestionPage from './pages/Questions/QuestionPage';
import NotFound from './pages/NotFound/Index';

const routes = [
    {

        path: "/login",
        component: LoginMobile,
    },
    {
        exact: true,
        path: "/",
        private: true,
        component: CategoriesPage,
    },

    {
        exact:true,
        private: true,
        path: "/products/:slug([A-Za-z0-9-]+)",
        component: CategoryProducts,
    },
    {
        exact:true,
        private: true,
        path: "/product/:slug",
        component: Product,
    },
    {
        private: true,
        path: "/chats",
        component: Chats,
    },
    {
        private: true,
        path: "/user/:id",
        exact: true,
        component: UserProfile,
    },
    {
        private: true,
        path: "/meteorology",
        exact: true,
        component: Meteorology,
    },
    {
        private: true,
        path: "/questions",
        exact: true,
        component: QuestionsPage,
    },
    {
        private: true,
        path: "/questions/:slug([A-Za-z0-9-]+)",
        exact: true,
        component: QuestionsPage,
    },
    {
        private: true,
        path: "/faq/:id([A-Za-z0-9-]+)",
        exact: true,
        component: QuestionPage,
    },

    {
        component: NotFound,
    },
];

export default routes