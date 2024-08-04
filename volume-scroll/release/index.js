import{actions as s,store as d}from"@neptune";import{html as T}from"@neptune/voby";import{storage as p}from"@plugin";var m=(t)=>{p.settings??={};for(let e of Object.keys(t))p.settings[e]??=t[e];return p.settings};import{html as h,$ as S}from"@neptune/voby";import{html as b}from"@neptune/voby";var x=({children:t,tooltip:e})=>b`
	<div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${e}">${t}</div>
`;var u=({value:t,onValue:e,title:o,tooltip:$})=>{const i=S(t),g=(r)=>{if(parseInt(r.target.value)<1){r.target.value="1",i(1);return}e?.(r.target.value)},l=(r)=>{r.preventDefault();const y=r.deltaY<0?1:-1,a=Math.min(20,Math.max(1,i()+y));i(a),e?.(a.toString())};return h`
		<${x} tooltip=${$}>
			<label for="text-${o}" style="font-size: 1.2em;margin-right: 16px;">${o}</label>
			<input type="number" class="neptune-text-input" min="1" max="20" id="text-${o}" value=${i} onChange=${g} onwheel=${l} style="flex-grow: 1; max-width: 25px; margin-right: 8px; margin-top: 6px;" />
            <input type="range" min="0" max="20" id="range-${o}" value=${i} onChange=${g} onwheel=${l} style="flex-grow: 1; margin-top: 4px; accent-color: var(--wave-color-solid-accent-fill);" />
		<//>
	`};var n=m({steps:10}),c=()=>T`<div>
    	<${u}
		value=${n.steps}
		onValue=${(t)=>{n.steps=parseInt(t)}}
		title="Volume Steps"
		tooltip="The volume percentage to adjust by"
	/>
</div>`;function f(t){if(!t.deltaY)return;t.preventDefault();const e=t.deltaY<0;if(n.steps===10)w(e);else k(e)}function w(t){t?s.playbackControls.increaseVolume():s.playbackControls.decreaseVolume()}function k(t){const e=d.getState().playbackControls.volume,o=Math.round(t?Math.min(e+n.steps,100):Math.max(e-n.steps,0));s.playbackControls.setVolume({volume:o})}function E(){v?.removeEventListener("wheel",f)}var v=document.querySelector('#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]');v?.addEventListener("wheel",f);export{E as onUnload,c as Settings};
