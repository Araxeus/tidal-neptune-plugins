/* {"name":"Volume Scroll","description":"Enable mousewheel volume control (v0.3.3)","author":"Araxeus","version":"0.3.3","hash":"104373522d31ecb35d4f020f7111d5a8"} */
import{actions as l,intercept as k,store as j}from"@neptune";import{html as M}from"@neptune/voby";import{$ as d,html as w}from"@neptune/voby";import{html as h}from"@neptune/voby";var $=({children:t,tooltip:r})=>h`
	<div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${r}">${t}</div>
`;var T=({value:t,onValue:r,title:o,tooltip:c})=>{const p=d(t),x=(i)=>{const g=i.target.value;if(!Number.isFinite(+g)||parseFloat(i.target.value)<1)i.target.value="1",p(1);else if(parseFloat(i.target.value)>20)i.target.value="20",p(20);r?.(i.target.value)},u=(i)=>{i.preventDefault();const g=i.deltaY<0?1:-1,v=Math.min(20,Math.max(1,p()+g));p(v),r?.(v.toString())};return w`
		<${$} tooltip=${c}>
			<label for="text-${o}" style="font-size: 1.2em;margin-right: 16px;">${o}</label>
			<input type="text" class="neptune-text-input" id="text-${o}" value=${p} onChange=${x} onwheel=${u} style="flex-grow: 1; max-width: 25px; margin-right: 8px; margin-top: 6px; text-align: center;" />
            <input type="range" min="0" max="20" id="range-${o}" value=${p} onChange=${x} onwheel=${u} style="flex-grow: 1; margin-top: 4px; accent-color: var(--wave-color-solid-accent-fill);" />
		<//>
	`};import{storage as s}from"@plugin";var f=(t)=>{s.settings??={};for(let r of Object.keys(t))s.settings[r]??=t[r];return s.settings};var e=f({steps:10}),N=()=>M`<div>
    	<${T}
		value=${e.steps}
		onValue=${(t)=>{e.steps=parseInt(t)}}
		title="Volume Steps"
		tooltip="The volume percentage to adjust by"
	/>
</div>`;function S(t){if(!t.deltaY)return;t.preventDefault();const r=t.deltaY<0;if(e.steps===10)H(r);else L(r);C()}function H(t){t?l.playbackControls.increaseVolume():l.playbackControls.decreaseVolume()}function L(t){const r=j.getState().playbackControls.volume,o=Math.round(t?Math.min(r+e.steps,100):Math.max(r-e.steps,0));l.playbackControls.setVolume({volume:o})}function C(){m?.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0})),setTimeout(()=>{m?.dispatchEvent(new MouseEvent("mouseout",{bubbles:!0}))},500)}function y(){if(b)return;if(a??=document.querySelector("#footerPlayer"),m??=a?.querySelector('#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]'),n??=a,n)n.addEventListener("wheel",S),console.log("Set up volume wheel control"),b=!0}function W(){D(),n?.removeEventListener("wheel",S)}var a,m,n,b=!1,D=k("playbackControls/SET_VOLUME",y,!0);y();export{W as onUnload,N as Settings};
