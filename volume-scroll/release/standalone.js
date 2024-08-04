/* {"name":"Volume Scroll","description":"Enable mousewheel volume control (v0.3.1)","author":"Araxeus","version":"0.3.1","hash":"10ef84035e46249d2cdc9b97cd5a66ae"} */
import{actions as a,store as M}from"@neptune";import{html as d}from"@neptune/voby";import{storage as s}from"@plugin";var u=(t)=>{s.settings??={};for(let e of Object.keys(t))s.settings[e]??=t[e];return s.settings};import{html as S,$ as h}from"@neptune/voby";import{html as y}from"@neptune/voby";var x=({children:t,tooltip:e})=>y`
	<div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${e}">${t}</div>
`;var v=({value:t,onValue:e,title:r,tooltip:c})=>{const i=h(t),g=(o)=>{const p=o.target.value;if(!Number.isFinite(+p)||parseFloat(o.target.value)<1)o.target.value="1",i(1);else if(parseFloat(o.target.value)>20)o.target.value="20",i(20);e?.(o.target.value)},l=(o)=>{o.preventDefault();const p=o.deltaY<0?1:-1,m=Math.min(20,Math.max(1,i()+p));i(m),e?.(m.toString())};return S`
		<${x} tooltip=${c}>
			<label for="text-${r}" style="font-size: 1.2em;margin-right: 16px;">${r}</label>
			<input type="text" class="neptune-text-input" id="text-${r}" value=${i} onChange=${g} onwheel=${l} style="flex-grow: 1; max-width: 25px; margin-right: 8px; margin-top: 6px; text-align: center;" />
            <input type="range" min="0" max="20" id="range-${r}" value=${i} onChange=${g} onwheel=${l} style="flex-grow: 1; margin-top: 4px; accent-color: var(--wave-color-solid-accent-fill);" />
		<//>
	`};var n=u({steps:10}),w=()=>d`<div>
    	<${v}
		value=${n.steps}
		onValue=${(t)=>{n.steps=parseInt(t)}}
		title="Volume Steps"
		tooltip="The volume percentage to adjust by"
	/>
</div>`;function b(t){if(!t.deltaY)return;t.preventDefault();const e=t.deltaY<0;if(n.steps===10)N(e);else k(e);D()}function N(t){t?a.playbackControls.increaseVolume():a.playbackControls.decreaseVolume()}function k(t){const e=M.getState().playbackControls.volume,r=Math.round(t?Math.min(e+n.steps,100):Math.max(e-n.steps,0));a.playbackControls.setVolume({volume:r})}function D(){$?.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0})),setTimeout(()=>{$?.dispatchEvent(new MouseEvent("mouseout",{bubbles:!0}))},500)}function q(){T?.removeEventListener("wheel",b)}var f=document.querySelector("#footerPlayer"),$=f?.querySelector('#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]'),T=f;T?.addEventListener("wheel",b);export{q as onUnload,w as Settings};
