import React,{useEffect,useState} from 'react';
import './App.css';
import Row from './components/Row';
import Currency from './components/Currency';
const Base_url='https://api.exchangeratesapi.io/latest';
function App() {
  const [curOptions,setCurOptions]=useState([]);
  const [fromCur, setFromCurr]=useState('');
  const [toCur, setToCurr]=useState(''); 
  //////////////////////////////////////////
  ////////////////////////////////
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();//const [rates,setRates]=useState({});
  const [fromToto,setFromToTo]=useState(true);
  let valF,valT;
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
      //setFromVal(1);
     // setRates({EUR:1,...data.rates});
      setExchangeRate(data.rates['USD']);
    })
  },[]);
  if(fromToto) {valF=amount;valT=(exchangeRate*amount).toFixed(2);
    //没有valF=amount这一步，一直出现错误
    //console.log(amount,rates[fromCur],rates[toCur]);valT=(amount/rates[fromCur])*rates[toCur]||0;
  }
  else {console.log(amount);valT=amount;valF=(amount/exchangeRate).toFixed(2);
    ////没有valT=amount这一步，一直出现错误
    //valF=amount/(rates[toCur]);这一行的时候需要const [rates,setRates]=useState({});这种想法是可行的，但是不符合现行汇率
  }
  useEffect(()=>{fetch(`${Base_url}?base=${fromCur}&symbols=${toCur}`)
  .then(response=>response.json())
  .then(data=>{setExchangeRate(data.rates[toCur])})
},[fromCur,toCur]);
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setFromToTo(true);//从上到下的转换还是反向操作
   // setToVal(e.target.value*exchangeRate);
   // console.log(Date.now());
   // setToVal(amount);//这里依靠了amount，useState不会马上更新，所以toVal的值一直都是undefined初始值
  }
  
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setFromToTo(false);//false表明先type了下面的数字
  }

  return (
    <>
    <h1>Convert</h1>
    <Row options={curOptions} selectedCur={fromCur} inputValue={valF} onChangeCurrency={e=>setFromCurr(e.target.value)} onChangeAmount={handleFromAmountChange}/>
    <h2>=</h2>
    <Row options={curOptions} selectedCur={toCur} inputValue={valT} onChangeCurrency={e=>setToCurr(e.target.value)} onChangeAmount={handleToAmountChange}/>
    <hr />
    <Currency />
    </>
  );
}

export default App;
