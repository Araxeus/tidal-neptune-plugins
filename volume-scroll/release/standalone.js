/* {"name":"Volume Scroll","description":"Enable mousewheel volume control (v0.3.0)","author":"Araxeus","version":"0.3.0","hash":"574cc87e4c57b811b50b4e092e627789"} */
import{actions as g,store as w}from"@neptune";import{html as d}from"@neptune/voby";import{storage as s}from"@plugin";var u=(t)=>{s.settings??={};for(let e of Object.keys(t))s.settings[e]??=t[e];return s.settings};import{html as S,$ as h}from"@neptune/voby";import{html as y}from"@neptune/voby";var x=({children:t,tooltip:e})=>y`
	<div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${e}">${t}</div>
`;var v=({value:t,onValue:e,title:o,tooltip:c})=>{const n=h(t),a=(r)=>{const p=r.target.value;if(Number.isNaN(p)||parseInt(r.target.value)<1){r.target.value="1",n(1);return}if(parseInt(r.target.value)>20){r.target.value="20",n(20);return}e?.(r.target.value)},l=(r)=>{r.preventDefault();const p=r.deltaY<0?1:-1,m=Math.min(20,Math.max(1,n()+p));n(m),e?.(m.toString())};return S`
		<${x} tooltip=${c}>
			<label for="text-${o}" style="font-size: 1.2em;margin-right: 16px;">${o}</label>
			<input type="text" class="neptune-text-input" id="text-${o}" value=${n} onChange=${a} onwheel=${l} style="flex-grow: 1; max-width: 25px; margin-right: 8px; margin-top: 6px; text-align: center;" />
            <input type="range" min="0" max="20" id="range-${o}" value=${n} onChange=${a} onwheel=${l} style="flex-grow: 1; margin-top: 4px; accent-color: var(--wave-color-solid-accent-fill);" />
		<//>
	`};var i=u({steps:10}),N=()=>d`<div>
    	<${v}
		value=${i.steps}
		onValue=${(t)=>{i.steps=parseInt(t)}}
		title="Volume Steps"
		tooltip="The volume percentage to adjust by"
	/>
</div>`;function b(t){if(!t.deltaY)return;t.preventDefault();const e=t.deltaY<0;if(i.steps===10)M(e);else k(e);D()}function M(t){t?g.playbackControls.increaseVolume():g.playbackControls.decreaseVolume()}function k(t){const e=w.getState().playbackControls.volume,o=Math.round(t?Math.min(e+i.steps,100):Math.max(e-i.steps,0));g.playbackControls.setVolume({volume:o})}function D(){$?.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0})),setTimeout(()=>{$?.dispatchEvent(new MouseEvent("mouseout",{bubbles:!0}))},500)}function A(){T?.removeEventListener("wheel",b)}var f=document.querySelector("#footerPlayer"),$=f?.querySelector('#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]'),T=f;T?.addEventListener("wheel",b);export{A as onUnload,N as Settings};
