/* {"name":"Volume Scroll","description":"Enable mousewheel volume control (v0.3.4)","author":"Araxeus","version":"0.3.4","hash":"f74cb1746fa9a0248d1b69f430c1e1eb"} */
import{actions as g,intercept as j,store as k}from"@neptune";import{html as S}from"@neptune/voby";import{$ as d,html as w}from"@neptune/voby";import{html as h}from"@neptune/voby";var f=({children:t,tooltip:r})=>h`
    <div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${r}">${t}</div>
`;var v=({value:t,onValue:r,title:e,tooltip:T})=>{const i=d(t),m=(o)=>{const a=o.target.value;if(!Number.isFinite(+a)||parseFloat(o.target.value)<1)o.target.value="1",i(1);else if(parseFloat(o.target.value)>20)o.target.value="20",i(20);r?.(o.target.value)},x=(o)=>{o.preventDefault();const a=o.deltaY<0?1:-1,u=Math.min(20,Math.max(1,i()+a));i(u),r?.(u.toString())};return w`
    <${f} tooltip=${T}>
        <label for="text-${e}" style="font-size: 1.2em;margin-right: 16px;">${e}</label>
        <input type="text" class="neptune-text-input" id="text-${e}" value=${i} onChange=${m} onwheel=${x}
            style="flex-grow: 1; max-width: 25px; margin-right: 8px; margin-top: 6px; text-align: center;" />
        <input type="range" min="0" max="20" id="range-${e}" value=${i} onChange=${m} onwheel=${x}
            style="flex-grow: 1; margin-top: 4px; accent-color: var(--wave-color-solid-accent-fill);" />
    <//>`};import{storage as s}from"@plugin";var $=(t)=>{s.settings??={};for(let r of Object.keys(t))s.settings[r]??=t[r];return s.settings};var p=$({steps:10}),M=()=>S`<div>
    <${v}
    value=${p.steps}
    onValue=${(t)=>{p.steps=parseInt(t)}}
    title="Volume Steps"
    tooltip="The volume percentage to adjust by"
    />
</div>`;function b(t){if(!t.deltaY)return;t.preventDefault();const r=t.deltaY<0;if(p.steps===10)C(r);else F(r);H()}function C(t){t?g.playbackControls.increaseVolume():g.playbackControls.decreaseVolume()}function F(t){const r=k.getState().playbackControls.volume,e=Math.round(t?Math.min(r+p.steps,100):Math.max(r-p.steps,0));g.playbackControls.setVolume({volume:e})}function H(){l?.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0})),setTimeout(()=>{l?.dispatchEvent(new MouseEvent("mouseout",{bubbles:!0}))},500)}function c(){if(y)return;if(n??=document.querySelector("#footerPlayer"),l??=n?.querySelector('#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]'),n)n.addEventListener("wheel",b),console.log("Set up volume wheel control"),y=!0}function I(){N(),n?.removeEventListener("wheel",b)}var l,n,y=!1,N=j("favorites/SET_FAVORITE_IDS",c,!0);c();export{I as onUnload,M as Settings};
