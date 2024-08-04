import{actions as l,intercept as j,store as k}from"@neptune";import{html as M}from"@neptune/voby";import{storage as a}from"@plugin";var $=(t)=>{a.settings??={};for(let r of Object.keys(t))a.settings[r]??=t[r];return a.settings};import{html as d,$ as w}from"@neptune/voby";import{html as h}from"@neptune/voby";var f=({children:t,tooltip:r})=>h`
	<div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${r}">${t}</div>
`;var b=({value:t,onValue:r,title:i,tooltip:S})=>{const o=w(t),x=(e)=>{const s=e.target.value;if(!Number.isFinite(+s)||parseFloat(e.target.value)<1)e.target.value="1",o(1);else if(parseFloat(e.target.value)>20)e.target.value="20",o(20);r?.(e.target.value)},u=(e)=>{e.preventDefault();const s=e.deltaY<0?1:-1,v=Math.min(20,Math.max(1,o()+s));o(v),r?.(v.toString())};return d`
		<${f} tooltip=${S}>
			<label for="text-${i}" style="font-size: 1.2em;margin-right: 16px;">${i}</label>
			<input type="text" class="neptune-text-input" id="text-${i}" value=${o} onChange=${x} onwheel=${u} style="flex-grow: 1; max-width: 25px; margin-right: 8px; margin-top: 6px; text-align: center;" />
            <input type="range" min="0" max="20" id="range-${i}" value=${o} onChange=${x} onwheel=${u} style="flex-grow: 1; margin-top: 4px; accent-color: var(--wave-color-solid-accent-fill);" />
		<//>
	`};var p=$({steps:10}),N=()=>M`<div>
    	<${b}
		value=${p.steps}
		onValue=${(t)=>{p.steps=parseInt(t)}}
		title="Volume Steps"
		tooltip="The volume percentage to adjust by"
	/>
</div>`;function c(t){if(!t.deltaY)return;t.preventDefault();const r=t.deltaY<0;if(p.steps===10)H(r);else D(r);F()}function H(t){t?l.playbackControls.increaseVolume():l.playbackControls.decreaseVolume()}function D(t){const r=k.getState().playbackControls.volume,i=Math.round(t?Math.min(r+p.steps,100):Math.max(r-p.steps,0));l.playbackControls.setVolume({volume:i})}function F(){m?.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0})),setTimeout(()=>{m?.dispatchEvent(new MouseEvent("mouseout",{bubbles:!0}))},500)}function y(){if(T)return;if(g??=document.querySelector("#footerPlayer"),m??=g?.querySelector('#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]'),n??=g,n)n.addEventListener("wheel",c),console.log("Set up volume wheel control"),T=!0}function Z(){L(),n?.removeEventListener("wheel",c)}var g,m,n,T=!1,L=j("page/IS_DONE_LOADING",()=>void setTimeout(y,1000),!0);y();export{Z as onUnload,N as Settings};
