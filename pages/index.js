import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';

const CoinGeckoClient=new CoinGecko();

export default function Home(props) {
  const {data} =props.result;

  const formatPercent=number=>
  `${new Number(number).toFixed(2)}%`

  const formatRupee=(number,maximumSignificantDigits)=>
  new Intl.NumberFormat(
    'en-UD',
    {
      style:'currency',
      currency:'USD',
      maximumSignificantDigits
    }).format(number);

  
  return (
    
    <div className={styles.container}>
      <Head> 
        <title>coinmarketcap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>WatchList</h1>
      
      <table class ='table'>

        <thead>
          <tr>
            <th>Symbol</th>
            <th>24hr change</th>
            <th>Price</th>
            <th>Market cap</th>
              </tr>
        </thead>
        <tbody>
          { data.map(coin=>(
            <tr key={coin.id}>
              <td>
                <img
                src={coin.image}
                style={{width:25,height:25,marginRight:10}}
                />
                {coin.symbol.toUpperCase()}
                </td>
              <td>
                <span
                className={coin.price_change_percentage_24h>0?('text-success'):'text-danger'}>
                {formatPercent(coin.price_change_percentage_24h)}
                </span>
                </td>
              <td>{formatRupee(coin.current_price,20)}</td>
              <td>{formatRupee(coin.market_cap,12)}</td>
              
            </tr>
          ))}

        </tbody>
      </table>
      <ul>
                <li>
               <Link href="/shop">
                 <a>shop</a>
                 </Link>
                 </li>
      
                </ul>
      
    </div>
  )
}
export async function getServerSideProps(context){
 const params={
   order:CoinGecko.ORDER.MARKET_CAP_DESC
 }
  const result =await CoinGeckoClient.coins.markets({params});
  return{
    props:{
      result
    }
  };
}