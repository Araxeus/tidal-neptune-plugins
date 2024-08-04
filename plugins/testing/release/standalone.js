/* {"name":"Testing","description":"Testing stuff (v0.0.1)","author":"Araxeus","version":"0.0.1","hash":"5345ae41305b5e0d66948775aa680262"} */
import{intercept as s}from"@neptune";var p=window.neptune.actions,n=(e)=>e.replace(/[A-Z]/g,(t)=>`_${t}`).toUpperCase(),i=(e)=>Object.keys(e).flatMap((t)=>typeof e[t]==="function"?n(t):Object.keys(e[t]).map((o)=>`${t}/${n(o)}`));s(i(p),console.log);
