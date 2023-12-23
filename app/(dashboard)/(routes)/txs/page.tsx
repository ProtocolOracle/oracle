import OverviewBox from "@/components/overview-box";
import TransactionList from "@/components/transaction-list";


const HomePage = () => {
  return ( 
    <div className="container mx-auto py-10">
        <OverviewBox/>
        <div className="container mx-auto">
        <h1 className="text-2xl text-red-500">Latest Transactions</h1>
        </div>
        <TransactionList/>
    </div>
    );
}
 
export default HomePage;