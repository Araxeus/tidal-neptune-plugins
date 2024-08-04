import{actions as s,store as c}from"@neptune";import{html as T}from"@neptune/voby";import{storage as p}from"@plugin";var a=(t)=>{p.settings??={};for(let o of Object.keys(t))p.settings[o]??=t[o];return p.settings};import{html as h,$ as S}from"@neptune/voby";import{html as b}from"@neptune/voby";var x=({children:t,tooltip:o})=>b`
	<div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${o}">${t}</div>
`;var $=({value:t,onValue:o,title:e,tooltip:v})=>{const r=S(t),g=(n)=>{if(r()<1)r(1);o?.(n.target.value)},m=(n)=>{n.preventDefault();const y=n.deltaY<0?1:-1,l=Math.min(20,Math.max(1,r()+y));r(l),o?.(l.toString())};return h`
		<${x} tooltip=${v}>
			<label for="text-${e}" style="font-size: 1.2em;margin-right: 16px;">${e}</label>
			<input type="number" min="1" max="20" id="text-${e}" value=${r} onChange=${g} onwheel=${m} style="flex-grow: 1; max-width: 35px; margin-right: 8px;" />
            <input type="range" min="0" max="20" id="range-${e}" value=${r} onChange=${g} onwheel=${m} style="flex-grow: 1;" />
		<//>
	`};var i=a({steps:10}),d=()=>T`<div>
    	<${$}
		value=${i.steps}
		onValue=${(t)=>{i.steps=parseInt(t)}}
		title="Volume Steps"
		tooltip="The volume percentage to adjust by"
	/>
</div>`;function u(t){if(!t.deltaY)return;t.preventDefault();const o=t.deltaY<0;if(i.steps===10)k(o);else w(o)}function k(t){t?s.playbackControls.increaseVolume():s.playbackControls.decreaseVolume()}function w(t){const o=c.getState().playbackControls.volume,e=Math.round(t?Math.min(o+i.steps,100):Math.max(o-i.steps,0));s.playbackControls.setVolume({volume:e})}function q(){f?.removeEventListener("wheel",u)}var f=document.querySelector('#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]');f?.addEventListener("wheel",u);export{q as onUnload,d as Settings};
