import{actions as a,store as d}from"@neptune";import{html as h}from"@neptune/voby";import{storage as s}from"@plugin";var u=(t)=>{s.settings??={};for(let e of Object.keys(t))s.settings[e]??=t[e];return s.settings};import{html as b,$ as c}from"@neptune/voby";import{html as T}from"@neptune/voby";var x=({children:t,tooltip:e})=>T`
	<div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${e}">${t}</div>
`;var f=({value:t,onValue:e,title:o,tooltip:y})=>{const n=c(t),g=(r)=>{const p=r.target.value;if(Number.isNaN(p)||parseInt(r.target.value)<1){r.target.value="1",n(1);return}if(parseInt(r.target.value)>20){r.target.value="20",n(20);return}e?.(r.target.value)},l=(r)=>{r.preventDefault();const p=r.deltaY<0?1:-1,m=Math.min(20,Math.max(1,n()+p));n(m),e?.(m.toString())};return b`
		<${x} tooltip=${y}>
			<label for="text-${o}" style="font-size: 1.2em;margin-right: 16px;">${o}</label>
			<input type="text" class="neptune-text-input" id="text-${o}" value=${n} onChange=${g} onwheel=${l} style="flex-grow: 1; max-width: 25px; margin-right: 8px; margin-top: 6px; text-align: center;" />
            <input type="range" min="0" max="20" id="range-${o}" value=${n} onChange=${g} onwheel=${l} style="flex-grow: 1; margin-top: 4px; accent-color: var(--wave-color-solid-accent-fill);" />
		<//>
	`};var i=u({steps:10}),S=()=>h`<div>
    	<${f}
		value=${i.steps}
		onValue=${(t)=>{i.steps=parseInt(t)}}
		title="Volume Steps"
		tooltip="The volume percentage to adjust by"
	/>
</div>`;function $(t){if(!t.deltaY)return;t.preventDefault();const e=t.deltaY<0;if(i.steps===10)N(e);else w(e)}function N(t){t?a.playbackControls.increaseVolume():a.playbackControls.decreaseVolume()}function w(t){const e=d.getState().playbackControls.volume,o=Math.round(t?Math.min(e+i.steps,100):Math.max(e-i.steps,0));a.playbackControls.setVolume({volume:o})}function z(){v?.removeEventListener("wheel",$)}var v=document.querySelector('#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]');v?.addEventListener("wheel",$);export{z as onUnload,S as Settings};
