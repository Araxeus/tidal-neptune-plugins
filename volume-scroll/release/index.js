import{actions as s,store as $}from"@neptune";import{html as b}from"@neptune/voby";import{html as x}from"@neptune/voby";import{html as f}from"@neptune/voby";var g=({children:t,tooltip:o})=>f`
	<div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${o}">${t}</div>
`;var n=({checked:t,onClick:o,title:i,tooltip:c})=>{return t??=!1,x`
		<${g} tooltip=${c}>
			<label for="switch-${i}" style="font-size: 1.2em;margin-bottom: 5px;">${i}</label>
			<input id="switch-${i}" class="neptune-switch-checkbox" type="checkbox" checked=${t} />
			<span onClick=${o} class="neptune-switch" />
		<//>
	`};import{storage as r}from"@plugin";var y=(t)=>{r.settings??={};for(let o of Object.keys(t))r.settings[o]??=t[o];return r.settings};var p=y({precise:!1}),k=()=>b`<div>
	<${n} checked=${p.precise} onClick=${()=>{p.precise=!p.precise}} title="Always use Tidal Fullscreen mode" />
</div>`;function T(t){if(!t.deltaY)return;t.preventDefault();const o=t.deltaY<0;if(p.precise)l(o);else h(o)}function h(t){t?s.playbackControls.increaseVolume():s.playbackControls.decreaseVolume()}function l(t){const o=$.getState().playbackControls.volume,i=Math.round(t?Math.min(o+1,100):Math.max(o-1,0));s.playbackControls.setVolume({volume:i})}function R(){S?.removeEventListener("wheel",T)}var S=document.querySelector('#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]');S?.addEventListener("wheel",T);export{R as onUnload,k as Settings};
