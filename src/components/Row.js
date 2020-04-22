import React from "react";

export default function Row({options,selectedCur,inputValue,onChangeCurrency,onChangeAmount}) {
    return (
    <div>
     <input type="number"  value={inputValue} onChange={onChangeAmount} />
     <select value={selectedCur} onChange={onChangeCurrency}>
        {options?options.map(val=><option key={val} value={val}>{val}</option>):null}
     </select>
    </div>  
    )
}