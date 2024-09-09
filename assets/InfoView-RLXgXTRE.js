import{d as h,a as d,b as l,o as c,c as n,e as r,n as s,u as t,_,f as C,g as i,h as y,i as p,F as D,r as v,L as b,j as V}from"./index-Buh80CWm.js";const f="/simple-weather-app/assets/currency-Dpmr_oxJ.svg",$=h("currencyStore",{state:()=>({isLoading:!1,currencyData:{},cryptoCurrencyData:[],activeTab:1}),actions:{async getCurrencies(){this.isLoading=!0;try{const{data:a}=await d.get("https://www.cbr-xml-daily.ru/daily_json.js");this.currencyData=a,this.currencyData.Date=new Date(a.Date).toLocaleDateString()}catch(a){alert(`Возникла ошибка: ${a}`)}finally{this.isLoading=!1}},async getCryptoCurrencies(){try{const{data:a}=await d.get("https://api.coinlore.net/api/ticker/",{params:{id:"90,80,54683,28,130947"}});this.cryptoCurrencyData=a}catch(a){alert(`Возникла ошибка: ${a}`)}},setActiveTab(a){a===1?this.getCurrencies():this.getCryptoCurrencies(),this.activeTab=a}}}),g={class:"tabs"},N=l({__name:"TabBar",setup(a){const e=$();return(m,u)=>(c(),n("div",g,[r(_,{text:"Валюта",class:s({active:t(e).activeTab===1}),onClick:u[0]||(u[0]=o=>t(e).setActiveTab(1))},null,8,["class"]),r(_,{text:"Криптовалюта",class:s({active:t(e).activeTab===2}),onClick:u[1]||(u[1]=o=>t(e).setActiveTab(2))},null,8,["class"])]))}}),x={key:1},k={class:"data-wrapper"},T={key:0,class:"currency-data"},w={key:1,class:"crypto-currency-data"},F=l({__name:"CurrencyOutput",setup(a){const e=$();return e.getCurrencies(),e.getCryptoCurrencies(),(m,u)=>(c(),n(D,null,[r(N),t(e).isLoading?(c(),C(b,{key:0})):(c(),n("div",x,[r(i,{item:`Дата обновления: ${t(e).currencyData.Date}`,class:s(["current-date"])},null,8,["item"]),y("div",k,[t(e).activeTab===1&&t(e).currencyData.Valute?(c(),n("div",T,[r(i,{item:`${t(e).currencyData.Valute.USD.Name}: ${Number(t(e).currencyData.Valute.USD.Value).toFixed(2)}₽`,class:s(["usd"])},null,8,["item"]),r(i,{item:`${t(e).currencyData.Valute.EUR.Name}: ${Number(t(e).currencyData.Valute.EUR.Value).toFixed(2)}₽`,class:s(["eur"])},null,8,["item"]),r(i,{item:`${t(e).currencyData.Valute.BYN.Name}: ${Number(t(e).currencyData.Valute.BYN.Value).toFixed(2)}₽`,class:s(["byn"])},null,8,["item"]),r(i,{item:`${t(e).currencyData.Valute.CNY.Name}: ${Number(t(e).currencyData.Valute.CNY.Value).toFixed(2)}₽`,class:s(["cny"])},null,8,["item"]),r(i,{item:`${t(e).currencyData.Valute.KZT.Name}: ${Number(t(e).currencyData.Valute.KZT.Value).toFixed(2)}₽`,class:s(["kzt"])},null,8,["item"])])):p("",!0),t(e).activeTab===2&&t(e).cryptoCurrencyData?(c(),n("div",w,[(c(!0),n(D,null,v(t(e).cryptoCurrencyData,o=>(c(),n("div",{key:o.id},[r(i,{item:`${o.name}: ${Number(o.price_usd).toFixed(2)}$`,class:s(["coin"])},null,8,["item"])]))),128))])):p("",!0)])]))],64))}}),L={class:"info"},S={class:"info-header-wrapper"},B=y("img",{src:f,alt:"Currency icon",width:"40",height:"40"},null,-1),Y=l({__name:"InfoView",setup(a){return(e,m)=>(c(),n("div",L,[y("div",S,[r(V,{title:"Currency Info"}),B]),r(F)]))}});export{Y as default};