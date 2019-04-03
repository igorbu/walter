import Home from "../views/Home/Home";
import Cart from "../views/ShopingCart/Cart";


const dashboardRoutes = [
  {
    path: "/homepage",
    name: "Home page",  
    component: Home
  },
  {
    path: "/cart", 
    name:"Shopping cart" ,
    icon: "pe-7s-cart",
    component: Cart
  },
  { redirect: true, path: "/", to: "/homepage", name: "Sve kamere" }
];

export default dashboardRoutes;
