import{actions as a,store as d}from"@neptune";import{html as S}from"@neptune/voby";import{storage as s}from"@plugin";var u=(t)=>{s.settings??={};for(let e of Object.keys(t))s.settings[e]??=t[e];return s.settings};import{html as b,$ as h}from"@neptune/voby";import{html as T}from"@neptune/voby";var x=({children:t,tooltip:e})=>T`
	<div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${e}">${t}</div>
`;var f=({value:t,onValue:e,title:r,tooltip:y})=>{const n=h(t),g=(o)=>{const p=o.target.value;if(Number.isNaN(p)||parseInt(o.target.value)<1){o.target.value="1",n(1);return}if(parseInt(o.target.value)>20){o.target.value="20",n(20);return}e?.(o.target.value)},l=(o)=>{o.preventDefault();const p=o.deltaY<0?1:-1,m=Math.min(20,Math.max(1,n()+p));n(m),e?.(m.toString())};return b`
		<${x} tooltip=${y}>
			<label for="text-${r}" style="font-size: 1.2em;margin-right: 16px;">${r}</label>
			<input type="text" class="neptune-text-input" min="1" max="20" id="text-${r}" value=${n} onChange=${g} onwheel=${l} style="flex-grow: 1; max-width: 25px; margin-right: 8px; margin-top: 6px;" />
            <input type="range" min="0" max="20" id="range-${r}" value=${n} onChange=${g} onwheel=${l} style="flex-grow: 1; margin-top: 4px; accent-color: var(--wave-color-solid-accent-fill);" />
		<//>
	`};var i=u({steps:10}),c=()=>S`<div>
    	<${f}
		value=${i.steps}
		onValue=${(t)=>{i.steps=parseInt(t)}}
		title="Volume Steps"
		tooltip="The volume percentage to adjust by"
	/>
</div>`;function $(t){if(!t.deltaY)return;t.preventDefault();const e=t.deltaY<0;if(i.steps===10)N(e);else w(e)}function N(t){t?a.playbackControls.increaseVolume():a.playbackControls.decreaseVolume()}function w(t){const e=d.getState().playbackControls.volume,r=Math.round(t?Math.min(e+i.steps,100):Math.max(e-i.steps,0));a.playbackControls.setVolume({volume:r})}function z(){v?.removeEventListener("wheel",$)}var v=document.querySelector('#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]');v?.addEventListener("wheel",$);export{z as onUnload,c as Settings};
