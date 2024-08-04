import{actions as s,store as c}from"@neptune";import{html as T}from"@neptune/voby";import{storage as p}from"@plugin";var a=(t)=>{p.settings??={};for(let e of Object.keys(t))p.settings[e]??=t[e];return p.settings};import{html as h,$ as S}from"@neptune/voby";import{html as b}from"@neptune/voby";var x=({children:t,tooltip:e})=>b`
	<div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${e}">${t}</div>
`;var u=({value:t,onValue:e,title:o,tooltip:v})=>{const i=S(t),g=(r)=>{if(parseInt(r.target.value)<1){r.target.value="1";return}e?.(r.target.value)},m=(r)=>{r.preventDefault();const y=r.deltaY<0?1:-1,l=Math.min(20,Math.max(1,i()+y));i(l),e?.(l.toString())};return h`
		<${x} tooltip=${v}>
			<label for="text-${o}" style="font-size: 1.2em;margin-right: 16px;">${o}</label>
			<input type="number" min="1" max="20" id="text-${o}" value=${i} onChange=${g} onwheel=${m} style="flex-grow: 1; max-width: 35px; margin-right: 8px;" />
            <input type="range" min="0" max="20" id="range-${o}" value=${i} onChange=${g} onwheel=${m} style="flex-grow: 1;" />
		<//>
	`};var n=a({steps:10}),d=()=>T`<div>
    	<${u}
		value=${n.steps}
		onValue=${(t)=>{n.steps=parseInt(t)}}
		title="Volume Steps"
		tooltip="The volume percentage to adjust by"
	/>
</div>`;function f(t){if(!t.deltaY)return;t.preventDefault();const e=t.deltaY<0;if(n.steps===10)k(e);else w(e)}function k(t){t?s.playbackControls.increaseVolume():s.playbackControls.decreaseVolume()}function w(t){const e=c.getState().playbackControls.volume,o=Math.round(t?Math.min(e+n.steps,100):Math.max(e-n.steps,0));s.playbackControls.setVolume({volume:o})}function E(){$?.removeEventListener("wheel",f)}var $=document.querySelector('#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]');$?.addEventListener("wheel",f);export{E as onUnload,d as Settings};
