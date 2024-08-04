import{actions as p,store as T}from"@neptune";import{html as f}from"@neptune/voby";import{storage as i}from"@plugin";var g=(t)=>{i.settings??={};for(let o of Object.keys(t))i.settings[o]??=t[o];return i.settings};import{html as $,$ as b}from"@neptune/voby";import{html as v}from"@neptune/voby";var m=({children:t,tooltip:o})=>v`
	<div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${o}">${t}</div>
`;var l=({value:t,onValue:o,title:r,tooltip:a})=>{const n=b(t),s=(u)=>o?.(u.target.value);return $`
		<${m} tooltip=${a}>
			<label for="text-${r}" style="font-size: 1.2em;margin-right: 16px;">${r}</label>
			<input type="number" min="1" max="20" id="text-${r}" value=${n} onChange=${s} style="flex-grow: 1;" />
            <input type="range" min="1" max="20" id="range-${r}" value=${n} onChange=${s} style="flex-grow: 1;" />
		<//>
	`};var e=g({steps:10}),S=()=>f`<div>
    	<${l}
		value=${e.steps}
		onValue=${(t)=>{e.steps=parseInt(t)}}
		title="Volume Steps"
		tooltip="The volume percentage to adjust by"
	/>
</div>`;function y(t){if(!t.deltaY)return;t.preventDefault();const o=t.deltaY<0;if(e.steps===10)h(o);else d(o)}function h(t){t?p.playbackControls.increaseVolume():p.playbackControls.decreaseVolume()}function d(t){const o=T.getState().playbackControls.volume,r=Math.round(t?Math.min(o+e.steps,100):Math.max(o-e.steps,0));p.playbackControls.setVolume({volume:r})}function J(){x?.removeEventListener("wheel",y)}var x=document.querySelector('#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]');x?.addEventListener("wheel",y);export{J as onUnload,S as Settings};
