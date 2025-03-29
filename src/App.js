import logo from './logo.svg';
import './App.css';
import { useState,useEffect,useRef,useMemo, useCallback} from 'react';

const API_URL="https://api.exchangerate-api.com/v4/latest/";

export default function App() {
const [amount, setAmount]=useState(1);
const [fromCurrency, setFromCurrency]=useState("USD");
const [toCurrency, setToCurrency]=useState("INR");
const [exchangeRates, setExchangeRates]=useState({});
const [convertAmount,setConvertAmount]=useState(null);
const inputRef=useRef();

useEffect(()=>{
  fetch(`${API_URL}${fromCurrency}`)
  .then((res)=>res.json())
  .then((data)=>setExchangeRates(data.rates))
  .catch((err)=>console.error("Failed to fetch"))
},[fromCurrency]);

useEffect(()=>{
  inputRef.current.focus();
},[]);

const availableCurrencies=useMemo(
  ()=>Object.keys(exchangeRates),
  [exchangeRates]
);

const convert=useCallback(()=>{
  if(exchangeRates[toCurrency])
  {
    const rate=exchangeRates[toCurrency];
    setConvertAmount((amount*rate).toFixed(2));
  }
},[amount,toCurrency,exchangeRates]);


  return (
    <div className="app">
      <h1>Crrency Convertor</h1>
      <div>
        <input type="number" value={amount} ref={inputRef}
        onChange={(e)=>setAmount(e.target.value)}/>


        <select value={fromCurrency}
        onChange={(e)=>setFromCurrency(e.target.value)}>
        {availableCurrencies.map((cur)=>(
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
        </select>
        <span>to</span>
        <select value={toCurrency}
        onChange={(e)=>setToCurrency(e.target.value)}>
        {availableCurrencies.map((cur)=>(
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
        </select>
        <button onClick={convert}>Convert</button>
        {convertAmount && (
          <h2>
            {amount} {fromCurrency}=
            {convertAmount} {toCurrency}
          </h2>
        )}


      </div>
    </div>
  );
}


