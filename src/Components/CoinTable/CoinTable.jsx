import { useContext, useState } from "react";
import { fetchCoinData } from "../../services/fetchCoinData";
import { useQuery } from "@tanstack/react-query";
import { CurrencyContext } from "../../CurrencyContext/CurrencyContext";
import { useNavigate } from "react-router-dom";
import PageLoader from "../PageLoader/PageLoader";
function CoinTable() {
    const [page, setPage] = useState(1);
    const {currency}=useContext(CurrencyContext);
    const {
        data,
        isLoading,
        isError,
        error,
        isFetching,
    } = useQuery({
        queryKey: ['coins', page,currency],
        queryFn: () => fetchCoinData(page, currency),
        cacheTime: 1000 * 60 * 20,
        staleTime:1000 *60 *20,
    });
    
 
    const navigate=useNavigate();
    function handleCoinRedirect(id){
        navigate(`/details/${id}`);
    }
       if(isLoading){
        return <PageLoader/>
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className="flex flex-col items-center justify-center mx-auto my-5 gap-4 w-[80vw]">
            <div>{currency}</div>
            <div className="flex items-center justify-center w-full px-3 py-2 font-semibold text-black bg-yellow-300">
                <div className="w-[35%]">Coin</div>
                <div className="w-[25%]">Price</div>
                <div className="w-[20%]">24h Change</div>
                <div className="w-[20%]">Market Cap</div>
            </div>

            <div className="flex flex-col w-full mx-auto">
                {isLoading && <div>Loading...</div>}
                {
                    
                    data && data.map((coin) => {
                        return (
                            <div 
                            onClick={()=>handleCoinRedirect(coin.id)}
                            key={coin.id} className="flex items-center justify-between px-2 py-4 font-semibold text-white bg-transparent cursor-pointer">
                                <div className="flex items-center gap-3 w-[35%]">
                                    <div className="w-[5rem] h-[5rem]">
                                        <img src={coin.image} className="w-full h-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-3xl">{coin.name}</div>
                                        <div className="text-xl">{coin.symbol}</div>
                                    </div>
                                </div>
                                <div className="w-[25%]">{coin.high_24h}</div>
                                <div className="w-[20%]">{coin.price_change_24h}</div>
                                <div className="w-[20%]">{coin.market_cap}</div>
                            </div>
                        );
                    })
                }
            </div>

            <div className="flex items-center justify-center gap-4">
                <button
                    className="text-2xl text-white btn btn-primary btn-wide"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <button
                    className="text-2xl text-white btn btn-secondary btn-wide"
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default CoinTable;
