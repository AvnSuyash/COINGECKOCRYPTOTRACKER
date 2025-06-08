import { Route, Routes } from "react-router-dom";
// import Home from "../../pages/Home";
// import CoinDetailsPage from "../../pages/CoinDetailsPage";
import { lazy,Suspense } from "react";
import Layout from "../../pages/Layout";

const Home=lazy(()=>import("../../pages/Home"));
const CoinDetailsPage=lazy(()=>import("../../pages/CoinDetailsPage"));
// import { Facebook } from 'react-content-loader'
import PageLoader from "../PageLoader/PageLoader";
import CustomErrorBoundary from "../CustomErrorBoundary/CustomErrorBoundary";

function Routing() {
  return (
    <CustomErrorBoundary>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
         <Suspense fallback={<PageLoader/>}>
           <Home />
         </Suspense>
         } />
        <Route path="details/:coinId" element={
          
          <Suspense fallback={<PageLoader/>}>
            <CoinDetailsPage />
          </Suspense>} />
        </Route>
    </Routes>
    </CustomErrorBoundary>
  );
}

export default Routing;