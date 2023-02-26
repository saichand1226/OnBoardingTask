import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Customer } from "./components/Customer/Customer";
import { Product } from "./components/Product/Product";
import { Store } from "./components/Store/Store";
import { Sales } from "./components/Sales/Sales";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/customer',
        element: <Customer />
    },
    {
        path: '/Sales',
        element: <Sales />
    },
    {
        path: '/Product',
        element: <Product />
    },
    {
        path: '/Store',
        element: <Store />
    }
];

export default AppRoutes;
