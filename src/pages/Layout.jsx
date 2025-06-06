import { Outlet } from "react-router-dom";
import Navbar from "../Components/NavBar/Navbar";

function Layout(){

    return(
        <>
        <Navbar/>  {/* This navbar is shared ui that we want across pages. */}
        <Outlet/>  {/*The actual page which will be rendered along with the navbar. */}
        </>
    );
}
export default Layout;