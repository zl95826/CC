import React,{useEffect,useState} from 'react';
import '../App.css';
import Row from './Row';
const Base_url='https://api.exchangeratesapi.io/latest';
function Currency() {
  const [curOptions,setCurOptions]=useState([]);
  const [fromCur, setFromCurr]=useState('');
  const [toCur, setToCurr]=useState(''); 
  //////////////////////////////////////////
  const [fromVal,setFromVal]=useState(1);
  const [toVal,setToVal]=useState(1);
  ////////////////////////////////
  //const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();//const [rates,setRates]=useState({});
  
  //let valF=1,valT;一直出现错误,尤其是先type等号下边的input,每一次useState工作以后，不赋值的话，valT/valF都是undefined
  useEffect(()=>{
    fetch(Base_url)
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
      const usdCur=Object.keys(data.rates)[26];
      setCurOptions([data.base,...Object.keys(data.rates)]);
      setFromCurr(data.base);
      setToCurr(usdCur);
      setFromVal(1);
      setToVal(data.rates['USD']);
      setExchangeRate(data.rates['USD']);
    })
  },[]);
  
//   if(fromToto) {valF=amount;valT=(exchangeRate*amount).toFixed(2);
    
//   }
//   else {valT=amount;valF=(amount/exchangeRate).toFixed(2);
    
//   }
  useEffect(()=>{fetch(`${Base_url}?base=${fromCur}&symbols=${toCur}`)
  .then(response=>response.json())
  .then(data=>{setExchangeRate(data.rates[toCur]);})
},[fromCur,toCur]);
console.log(fromVal);
  function handleFromAmountChange(e) {
    setFromVal(e.target.value);
    setToVal(e.target.value*exchangeRate);
  }
  
  function handleToAmountChange(e) {
    setToVal(e.target.value);
    setFromVal(e.target.value/exchangeRate);
  }

  return (
    <>
    <h1>Convert</h1>
    <Row options={curOptions} selectedCur={fromCur} inputValue={fromVal} onChangeCurrency={e=>{setFromCurr(e.target.value);}} onChangeAmount={handleFromAmountChange}/>
    <h2>=</h2>
    <Row options={curOptions} selectedCur={toCur} inputValue={toVal} onChangeCurrency={e=>{setToCurr(e.target.value);}} onChangeAmount={handleToAmountChange}/>
    </>
  );
}

export default Currency;