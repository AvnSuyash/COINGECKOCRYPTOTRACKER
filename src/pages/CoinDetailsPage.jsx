import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../services/fetchCoinDetails";
import { useEffect,useContext } from "react";
import parse from 'html-react-parser';
import { CurrencyContext } from "../CurrencyContext/CurrencyContext";
import PageLoader from "../Components/PageLoader/PageLoader";

function CoinDetailsPage(){
    const {currency}=useContext(CurrencyContext);

    const {coinId}=useParams();
    const {isError, isLoading, data:coin}=useQuery({
        queryKey: ['coin',coinId],
        queryFn: () => fetchCoinDetails(coinId),
        cacheTime: 1000 * 60 * 20,
        staleTime:1000 *60 *20,
    });
    useEffect(()=>{
        console.log(coin);
    },[coin]);

    if(isLoading){
        return <PageLoader/>
    }
    if(isError){
        return <div>Something went wrong</div>
    }
    return(
        
        <div className="flex flex-col md:flex-row ">
            
            <div className="flex flex-col items-center w-full mt-6 border-r-2 border-gray-500 md:w-1/3">
                <img src={coin?.image?.large} alt={coin?.name}
                className="mb-5 h-52 "/>
                <h1 className="mb-5 text-4xl font-bold">
                     {coin?.name}
                </h1>
                <p className="w-full px-6 py-4 text-justify">
                    {parse(coin?.description?.en)}
                </p>
                
                <div className="flex flex-col w-full md:flex-row md:justify-around">
                    
                    <div className="flex items-center mb-4 md:mb-0">
                        <h2 className="text-xl font-bold">
                            Rank
                        </h2>
                        <span className="ml-3 text-xl">
                            {coin?.market_cap_rank}    
                        </span>
                    </div>
                    <div className="flex items-center mb-4 md:mb-0">
                        <h2 className="text-xl font-bold text-yellow-400">
                            Current Price
                        </h2>
                        <span className="ml-3 text-xl">
                            {coin?.market_data.current_price[currency]}    
                        </span>
                    </div>
                    
                </div>
            </div>
            <div className="w-2/3 p-6 md:w-full">
                Coin Information
            </div>
        </div>
    );
}

export default CoinDetailsPage;