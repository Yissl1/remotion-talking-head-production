import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, Sequence, Video, interpolate, spring, useCurrentFrame} from 'remotion';

export type TimedProps = {startFrame:number; endFrame:number};
export type SafeRect = {left:number; top:number; width:number; height:number};

const clamp = {extrapolateLeft:'clamp', extrapolateRight:'clamp'} as const;
const INK = '#111315';
const WHITE = '#F7F8FA';
const WHITE_SOFT = 'rgba(247,248,250,.72)';
const RED = '#FF5B4D';
const YELLOW = '#F6C744';
const BLUE = '#2E8CFF';
const PALETTE = [RED, YELLOW, BLUE] as const;
const WHITE_GLOW = '0 0 12px rgba(247,248,250,.20), 0 0 24px rgba(247,248,250,.08)';
const BACKDROP_GLOW = '0 0 10px rgba(247,248,250,.28), 0 0 24px rgba(247,248,250,.10)';

export const enterExit = (frame:number,startFrame:number,endFrame:number,delay=0) => {
  const enter=spring({frame:Math.max(0,frame-startFrame-delay),fps:30,config:{damping:19,stiffness:185,mass:.72}});
  const exit=interpolate(endFrame-frame,[0,12],[0,1],clamp);
  return {opacity:enter*exit,transform:`translateY(${16*(1-enter)+8*(1-exit)}px) scale(${.975+.025*enter-.012*(1-exit)})`};
};

export const SubtitleLayer:React.FC<{text:string;keywords?:string[];accent?:string} & TimedProps>=({text,keywords=[],accent=BLUE,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const enter=interpolate(frame,[startFrame,startFrame+5],[0,1],clamp);
  const exit=interpolate(endFrame-frame,[0,6],[0,1],clamp);
  const escapeRegExp=(value:string)=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const pattern=keywords.length?new RegExp(`(${keywords.map(escapeRegExp).join('|')})`,'g'):null;
  const pieces=pattern?text.split(pattern):[text];
  return <div style={{position:'absolute',left:250,right:250,bottom:52,zIndex:140,display:'flex',justifyContent:'center',pointerEvents:'none',opacity:enter*exit,transform:`translateY(${6*(1-enter)+3*(1-exit)}px)`}}>
    <div style={{position:'relative',display:'inline-block',maxWidth:1140,padding:'7px 14px 8px',color:WHITE,fontSize:38,lineHeight:1.14,fontWeight:950,textAlign:'center',letterSpacing:'.006em',background:'rgba(6,8,10,.58)',borderRadius:2,boxShadow:'0 5px 18px rgba(0,0,0,.24)',WebkitTextStroke:'1px rgba(0,0,0,.92)',paintOrder:'stroke fill',textShadow:'0 2px 3px rgba(0,0,0,1),0 0 7px rgba(0,0,0,.92)'}}>
      {pieces.map((part,index)=><span key={`${part}-${index}`} style={{color:WHITE,fontWeight:950}}>{part}</span>)}
    </div>
  </div>;
};

export const TechCard:React.FC<{kicker:string;title:string;detail?:string;color?:string;accent?:string;boxed?:boolean;edgeGlow?:boolean;rect:SafeRect;align?:'left'|'right'} & TimedProps>=({kicker,title,detail,color=WHITE,accent=BLUE,boxed=false,edgeGlow=false,rect,align='left',startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const group=enterExit(frame,startFrame,endFrame);
  const titleMotion=enterExit(frame,startFrame,endFrame,5);
  const detailMotion=enterExit(frame,startFrame,endFrame,10);
  return <div style={{position:'absolute',...rect,zIndex:90,color:WHITE,textAlign:align,...group}}>
    {boxed&&<div style={{position:'absolute',inset:-12,background:'rgba(12,14,17,.42)',border:`1px solid ${accent}`,borderRadius:8,boxShadow:edgeGlow?`0 0 12px ${accent}55`:'0 10px 28px rgba(0,0,0,.28)'}}/>}
    <div style={{position:'relative',fontSize:14,letterSpacing:'.16em',fontWeight:900,color:accent}}>{kicker}</div>
    <div style={{position:'relative',marginTop:8,fontSize:38,lineHeight:1.08,fontWeight:950,...titleMotion}}>{title}</div>
    {detail&&<div style={{position:'relative',marginTop:10,fontSize:18,lineHeight:1.35,color:'rgba(247,248,250,.74)',...detailMotion}}>{detail}</div>}
    {edgeGlow&&<div style={{position:'absolute',inset:-7,pointerEvents:'none',border:`1px solid ${accent}88`,boxShadow:`0 0 13px ${accent}55`,opacity:.75}}/>}
  </div>;
};


type IconName='ai'|'cut'|'mic'|'layers'|'flow'|'compare'|'warning'|'spark'|'download'|'user'|'check';

const IconGlyph:React.FC<{name:IconName;size?:number}>=({name,size=54})=>{
  const common={fill:'none',stroke:'currentColor',strokeWidth:2.2,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  const paths:Record<IconName,React.ReactNode>={
    ai:<><rect x="12" y="12" width="24" height="24" rx="5" {...common}/><path d="M18 21h12M18 27h12M21 18v12M27 18v12M8 18h4M8 30h4M36 18h4M36 30h4M18 8v4M30 8v4M18 36v4M30 36v4" {...common}/></>,
    cut:<><circle cx="15" cy="15" r="5" {...common}/><circle cx="15" cy="33" r="5" {...common}/><path d="M19 18l21 17M19 30L40 13M25 24l6 5" {...common}/></>,
    mic:<><rect x="18" y="8" width="12" height="24" rx="6" {...common}/><path d="M13 25a11 11 0 0 0 22 0M24 36v6M18 42h12" {...common}/></>,
    layers:<><path d="M24 7L6 17l18 10 18-10L24 7zM8 25l16 9 16-9M8 33l16 9 16-9" {...common}/></>,
    flow:<><circle cx="10" cy="24" r="4" {...common}/><circle cx="38" cy="12" r="4" {...common}/><circle cx="38" cy="36" r="4" {...common}/><path d="M14 24h8c7 0 7-12 12-12M22 24c7 0 7 12 12 12" {...common}/></>,
    compare:<><path d="M8 15h28M30 9l6 6-6 6M40 33H12M18 27l-6 6 6 6" {...common}/></>,
    warning:<><path d="M24 7L44 41H4L24 7zM24 18v10M24 35h.01" {...common}/></>,
    spark:<><path d="M24 5l3.5 12.5L40 21l-12.5 3.5L24 37l-3.5-12.5L8 21l12.5-3.5L24 5zM39 5v8M35 9h8" {...common}/></>,
    download:<><path d="M24 7v24M15 23l9 9 9-9M9 41h30" {...common}/></>,
    user:<><circle cx="24" cy="16" r="7" {...common}/><path d="M10 41c1.8-8 6.5-12 14-12s12.2 4 14 12" {...common}/></>,
    check:<><path d="M9 25l9 9L39 13" {...common}/><circle cx="24" cy="24" r="19" {...common}/></>,
  };
  return <svg viewBox="0 0 48 48" width={size} height={size}>{paths[name]}</svg>;
};

export const EditorialHeadline:React.FC<{
  kicker:string;headline:string;subline?:string;accentText?:string;accent?:string;rect:SafeRect;
  align?:'left'|'right';headlineSize?:number;
} & TimedProps>=({kicker,headline,subline,accentText,accent=BLUE,rect,align='left',headlineSize=74,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const group=enterExit(frame,startFrame,endFrame);
  const head=enterExit(frame,startFrame,endFrame,4);
  const sub=enterExit(frame,startFrame,endFrame,9);
  const parts=accentText&&headline.includes(accentText)?headline.split(accentText):[headline];
  return <div style={{position:'absolute',...rect,zIndex:94,color:WHITE,textAlign:align,...group}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:align==='right'?'flex-end':'flex-start',gap:10,color:accent,fontSize:16,fontWeight:950,letterSpacing:'.17em'}}>
      {align==='left'&&<span style={{width:5,height:24,background:accent,boxShadow:`0 0 10px ${accent}55`}}/>}{kicker}{align==='right'&&<span style={{width:5,height:24,background:accent,boxShadow:`0 0 10px ${accent}55`}}/>}
    </div>
    <div style={{marginTop:9,fontSize:headlineSize,lineHeight:.96,fontWeight:950,letterSpacing:'-.045em',textShadow:'0 5px 18px rgba(0,0,0,.55)',...head}}>
      {accentText&&headline.includes(accentText)?<>{parts[0]}<span style={{color:accent}}>{accentText}</span>{parts.slice(1).join(accentText)}</>:headline}
    </div>
    {subline&&<div style={{marginTop:12,fontSize:23,lineHeight:1.3,fontWeight:800,color:'rgba(247,248,250,.82)',letterSpacing:'.02em',...sub}}>{subline}</div>}
  </div>;
};

export const LineIconBadge:React.FC<{
  icon:IconName;label:string;detail?:string;accent?:string;rect:SafeRect;align?:'left'|'right';compact?:boolean;micro?:boolean;
  boxed?:boolean;edgeGlow?:boolean;radius?:number;
} & TimedProps>=({icon,label,detail,accent=YELLOW,rect,align='left',compact=false,micro=false,boxed=false,edgeGlow=false,radius=18,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const enter=spring({frame:Math.max(0,frame-startFrame),fps:30,config:{damping:16,stiffness:210,mass:.68}});
  const exit=interpolate(endFrame-frame,[0,10],[0,1],clamp);
  const opacity=enter*exit;
  const reverse=align==='right';
  const circle=micro?50:(compact?76:96);
  return <div style={{position:'absolute',...rect,zIndex:95,display:'flex',flexDirection:reverse?'row-reverse':'row',alignItems:'center',gap:micro?9:18,color:WHITE,opacity,transform:`translateX(${(reverse?1:-1)*24*(1-enter)}px) scale(${.96+.04*enter})`}}>
    {boxed&&<div style={{position:'absolute',inset:-10,borderRadius:radius,background:'rgba(17,19,21,.34)',border:`1px solid ${accent}88`,boxShadow:edgeGlow?`0 0 18px ${accent}44,0 12px 32px rgba(0,0,0,.28)`:'0 12px 32px rgba(0,0,0,.24)',pointerEvents:'none'}}/>}
    <div style={{position:'relative',width:circle,height:circle,flex:'0 0 auto',borderRadius:'50%',display:'grid',placeItems:'center',color:accent,border:`2px solid ${accent}`,background:'rgba(12,14,17,.38)',boxShadow:edgeGlow?`0 0 14px ${accent}55`:'0 0 10px rgba(0,0,0,.18)'}}><IconGlyph name={icon} size={micro?26:(compact?39:50)}/></div>
    <div style={{position:'relative',minWidth:0,flex:1,textAlign:reverse?'right':'left'}}>
      <div style={{fontSize:micro?20:(compact?29:38),lineHeight:1.04,fontWeight:950,letterSpacing:'-.025em',textShadow:micro?'0 2px 10px rgba(0,0,0,.92)':undefined}}>{label}</div>
      {detail&&<div style={{marginTop:micro?4:(compact?7:10),fontSize:micro?12:(compact?16:19),lineHeight:1.25,fontWeight:800,color:'rgba(247,248,250,.86)',textShadow:micro?'0 2px 8px rgba(0,0,0,.92)':undefined}}>{detail}</div>}
    </div>
  </div>;
};

type DataBarItem={label:string;detail?:string;extent:number;accent?:string};
export const DataBars:React.FC<{
  kicker?:string;title?:string;items:DataBarItem[];rect:SafeRect;align?:'left'|'right';
} & TimedProps>=({kicker,title,items,rect,align='left',startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const reverse=align==='right';
  return <div style={{position:'absolute',...rect,zIndex:95,color:WHITE,textAlign:align}}>
    {kicker&&<div style={{fontSize:15,fontWeight:950,letterSpacing:'.17em',color:BLUE,...enterExit(frame,startFrame,endFrame)}}>{kicker}</div>}
    {title&&<div style={{marginTop:7,fontSize:36,lineHeight:1.05,fontWeight:950,...enterExit(frame,startFrame+3,endFrame)}}>{title}</div>}
    <div style={{marginTop:18,display:'grid',gap:15}}>{items.map((item,index)=>{
      const reveal=startFrame+5+index*6;
      if(frame<reveal)return null;
      const grow=interpolate(frame,[reveal,reveal+16],[0,Math.max(.12,Math.min(1,item.extent))],clamp);
      const out=interpolate(endFrame-frame,[0,10],[0,1],clamp);
      const color=item.accent??PALETTE[index%PALETTE.length];
      const motion = enterExit(frame,reveal,endFrame);
      return <div key={`${item.label}-${index}`} style={{opacity:out*motion.opacity,transform:motion.transform}}>
        <div style={{display:'flex',justifyContent:'space-between',flexDirection:reverse?'row-reverse':'row',gap:14,alignItems:'baseline'}}>
          <span style={{fontSize:19,fontWeight:950}}>{item.label}</span>
          {item.detail&&<span style={{fontSize:14,fontWeight:850,color:'rgba(247,248,250,.62)'}}>{item.detail}</span>}
        </div>
        <div style={{marginTop:7,height:12,borderRadius:999,background:'rgba(247,248,250,.10)',overflow:'hidden'}}><div style={{height:'100%',width:`${grow*100}%`,marginLeft:reverse?'auto':0,background:`linear-gradient(90deg,${color}aa,${color})`,boxShadow:`0 0 12px ${color}44`,borderRadius:999}}/></div>
      </div>;
    })}</div>
  </div>;
};

export const ProcessRail:React.FC<{
  steps:{label:string;icon:IconName;accent?:string}[];rect:SafeRect;boxed?:boolean;
} & TimedProps>=({steps,rect,boxed=true,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  return <div style={{position:'absolute',...rect,zIndex:95,display:'flex',alignItems:'center',justifyContent:'space-between',color:WHITE}}>
    {steps.map((step,index)=>{
      const reveal=startFrame+index*7;
      if(frame<reveal)return null;
      const motion=enterExit(frame,reveal,endFrame);
      const line=index?interpolate(frame,[reveal,reveal+12],[0,1],clamp):0;
      const accent=step.accent??PALETTE[index%PALETTE.length];
      return <React.Fragment key={`${step.label}-${index}`}>
        {index>0&&<div style={{height:2,flex:1,maxWidth:68,margin:'0 10px',background:'rgba(247,248,250,.16)',overflow:'hidden'}}><div style={{height:'100%',width:`${line*100}%`,background:accent,boxShadow:`0 0 8px ${accent}66`}}/></div>}
        <div style={{width:148,textAlign:'center',...motion}}>
          <div style={{width:70,height:70,margin:'0 auto',borderRadius:'50%',display:'grid',placeItems:'center',color:accent,border:`2px solid ${accent}`,background:boxed?'rgba(12,14,17,.42)':'transparent',boxShadow:`0 0 14px ${accent}33`}}><IconGlyph name={step.icon} size={36}/></div>
          <div style={{marginTop:10,fontSize:20,fontWeight:950,lineHeight:1.1,textShadow:boxed?'0 2px 8px rgba(0,0,0,.8)':`0 0 10px ${accent}44`}}>{step.label}</div>
        </div>
      </React.Fragment>;
    })}
  </div>;
};

export const DemoBackdrop:React.FC<{themePhrase:string;color?:string;instant?:boolean} & TimedProps>=({themePhrase,startFrame,endFrame,instant=false})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const opacity=instant?1:interpolate(frame,[startFrame,startFrame+12,endFrame-12,endFrame],[0,1,1,0],clamp);
  const phrase=themePhrase.replace(/\s+/g,' ').trim();
  const repeated=`${phrase}　${phrase}　${phrase}`;
  const rows=[
    {top:74,left:-130,size:108,outline:false,opacity:.38}, {top:198,left:54,size:100,outline:true,opacity:.52},
    {top:322,left:-84,size:108,outline:false,opacity:.32}, {top:446,left:84,size:100,outline:true,opacity:.44},
    {top:570,left:-122,size:108,outline:false,opacity:.29}, {top:694,left:42,size:100,outline:true,opacity:.40},
    {top:818,left:-92,size:108,outline:false,opacity:.24}, {top:942,left:72,size:100,outline:true,opacity:.34},
  ] as const;
  const sheen=instant?38:interpolate(frame,[startFrame,endFrame],[-25,125],clamp);
  return <AbsoluteFill style={{background:'linear-gradient(135deg,#24272a 0%,#171a1d 46%,#292c30 100%)',overflow:'hidden',zIndex:0,opacity}}>
    <AbsoluteFill style={{opacity:.16,backgroundImage:'linear-gradient(rgba(247,248,250,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(247,248,250,.055) 1px,transparent 1px)',backgroundSize:'92px 92px'}}/>
    <AbsoluteFill style={{background:'radial-gradient(circle at 68% 42%,rgba(46,140,255,.07) 0%,transparent 38%),radial-gradient(circle at 18% 78%,rgba(255,91,77,.045),transparent 30%)'}}/>
    {rows.map((row,index)=><div key={index} style={{position:'absolute',left:row.left,top:row.top,width:2450,fontSize:row.size,fontWeight:950,letterSpacing:'-.055em',whiteSpace:'nowrap',lineHeight:.92,color:row.outline?'transparent':`rgba(247,248,250,${row.opacity})`,WebkitTextStroke:row.outline?`2px rgba(247,248,250,${row.opacity})`:'0 transparent',textShadow:row.outline?`0 0 8px rgba(247,248,250,.10)`:BACKDROP_GLOW}}>{repeated}</div>)}
    <div style={{position:'absolute',left:`${sheen}%`,top:-300,width:360,height:1600,transform:'rotate(18deg)',background:'linear-gradient(90deg,transparent,rgba(247,248,250,.07),transparent)',filter:'blur(18px)',opacity:.42}}/>
  </AbsoluteFill>;
};

export const DemoPanel:React.FC<{src:string;rect?:SafeRect;fit?:'contain'|'cover';sourceStartFrame?:number;color?:string;edgeGlow?:boolean;instant?:boolean} & TimedProps>=({src,rect={left:500,top:140,width:1335,height:820},fit='cover',sourceStartFrame=0,edgeGlow=false,instant=false,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const enter=instant?1:spring({frame:Math.max(0,frame-startFrame),fps:30,config:{damping:22,stiffness:170,mass:.78}});
  const exit=interpolate(endFrame-frame,[0,13],[0,1],clamp);
  const clip=instant?0:interpolate(enter,[0,1],[52,0],clamp);
  const opacity=instant?exit:enter*exit;
  const transform=instant?'none':`translate3d(${54*(1-enter)-18*(1-exit)}px,0,0) scale(${.985+.015*enter})`;
  const clipPath=instant?'none':`inset(0 ${clip}% 0 0 round 4px)`;
  return <div style={{position:'absolute',...rect,zIndex:95,opacity,transform,clipPath,overflow:'hidden',background:'transparent',border:instant?'none':'1px solid rgba(247,248,250,.68)',boxShadow:edgeGlow?`0 24px 75px rgba(0,0,0,.62),${WHITE_GLOW}`:'0 24px 75px rgba(0,0,0,.62)'}}>
    <Sequence from={startFrame} durationInFrames={Math.max(1,endFrame-startFrame)}><OffthreadVideo src={src} muted startFrom={sourceStartFrame} pauseWhenBuffering={false} style={{width:'100%',height:'100%',objectFit:fit,display:'block'}}/></Sequence>
  </div>;
};

export const SpeakerBubble:React.FC<{src:string;rect?:SafeRect;color?:string;edgeGlow?:boolean;objectPosition?:string;sourceStartFrame?:number} & TimedProps>=({src,rect={left:54,top:690,width:270,height:270},color=BLUE,edgeGlow=false,objectPosition='50% 42%',startFrame,endFrame,sourceStartFrame=startFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const style=enterExit(frame,startFrame,endFrame);
  return <div style={{position:'absolute',...rect,border:`2px solid ${color}`,borderRadius:'50%',overflow:'hidden',zIndex:101,boxShadow:edgeGlow?`0 0 0 3px rgba(247,248,250,.10),0 0 22px ${color}55,0 14px 32px rgba(0,0,0,.34)`:'0 10px 28px rgba(0,0,0,.28)',...style}}>
    <Sequence from={startFrame} durationInFrames={Math.max(1,endFrame-startFrame)}>
      <OffthreadVideo src={src} muted startFrom={sourceStartFrame} pauseWhenBuffering={false} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition,display:'block',transform:'scale(1.33)'}}/>
    </Sequence>
  </div>;
};

export const MetricCard:React.FC<{value:number;fromValue?:number;prefix?:string;suffix?:string;decimals?:number;label?:string;rect:SafeRect;boxed?:boolean;edgeGlow?:boolean} & TimedProps>=({value,fromValue=0,prefix='',suffix='',decimals=0,label,rect,boxed=false,edgeGlow=false,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const enter=enterExit(frame,startFrame,endFrame);
  const countFrames=Math.min(24,Math.max(10,endFrame-startFrame-4));
  const progress=interpolate(frame-startFrame,[0,countFrames],[0,1],clamp);
  const eased=progress*progress*(3-2*progress);
  const current=fromValue+(value-fromValue)*eased;
  const number=current.toFixed(decimals);
  return <div style={{position:'absolute',...rect,zIndex:92,color:WHITE,...enter}}>
    {boxed&&<div style={{position:'absolute',inset:-18,background:'rgba(17,19,21,.42)',border:'1px solid rgba(247,248,250,.38)',boxShadow:edgeGlow?WHITE_GLOW:'none'}}/>}
    <div style={{position:'relative',fontSize:14,letterSpacing:'.15em',fontWeight:900,color:WHITE,textShadow:edgeGlow?WHITE_GLOW:'none'}}>{label}</div>
    <div style={{position:'relative',marginTop:8,fontSize:72,lineHeight:1,fontWeight:950,letterSpacing:'-.04em',fontVariantNumeric:'tabular-nums',textShadow:edgeGlow?WHITE_GLOW:'none'}}>{prefix}{number}{suffix}</div>
  </div>;
};

export const SceneTransition:React.FC<{color?:string} & TimedProps>=({startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const local=frame-startFrame;
  const duration=endFrame-startFrame;
  const opacity=interpolate(local,[0,Math.max(1,duration*.45),duration],[0,.18,0],clamp);
  const wipe=interpolate(local,[0,duration],[-18,118],clamp);
  return <AbsoluteFill style={{zIndex:130,pointerEvents:'none',background:`linear-gradient(105deg,transparent ${wipe-12}%,rgba(247,248,250,${opacity}) ${wipe}%,transparent ${wipe+12}%)`}}/>;
};



export const KeywordChip:React.FC<{text:string;rect:SafeRect;boxed?:boolean;edgeGlow?:boolean;accent?:string;align?:'left'|'right'|'center'} & TimedProps>=({text,rect,boxed=false,edgeGlow=false,accent=BLUE,align='left',startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const motion=enterExit(frame,startFrame,endFrame);
  return <div style={{position:'absolute',...rect,zIndex:93,display:'flex',justifyContent:align==='right'?'flex-end':align==='center'?'center':'flex-start',...motion}}>
    <div style={{position:'relative',padding:boxed?'9px 14px':'0',fontSize:boxed?22:28,lineHeight:1.12,fontWeight:900,letterSpacing:'.035em',color:WHITE,background:boxed?'rgba(12,14,17,.92)':'transparent',border:boxed?`1px solid ${accent}`:'none',borderRadius:boxed?6:0,boxShadow:edgeGlow?`0 0 12px ${accent}55`:'none',textShadow:'0 3px 14px rgba(0,0,0,.78)'}}>
      <>{!boxed && <span style={{position:'absolute',left:0,top:-8,width:34,height:3,background:accent}} />}{text}</>
    </div>
  </div>;
};

export const StepFlow:React.FC<{steps:string[];reveals:number[];rect:SafeRect;activeIndex?:number;edgeGlow?:boolean} & TimedProps>=({steps,reveals,rect,activeIndex,edgeGlow=false,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  return <div style={{position:'absolute',...rect,zIndex:94,display:'flex',alignItems:'center',gap:14,color:WHITE}}>
    {steps.map((step,index)=>{
      const reveal=reveals[index]??startFrame+index*8;
      if(frame<reveal)return null;
      const motion=enterExit(frame,reveal,endFrame);
      const active=activeIndex===index;
      const lineProgress=index===0?0:interpolate(frame,[reveal,reveal+10],[0,1],clamp);
      return <React.Fragment key={`${step}-${index}`}>
        {index>0&&<div style={{width:54,height:2,transform:`scaleX(${lineProgress})`,transformOrigin:'left',background:'rgba(247,248,250,.62)',boxShadow:edgeGlow?WHITE_GLOW:'none'}}/>}
        <div style={{minWidth:120,padding:'14px 18px',background:active?'rgba(247,248,250,.12)':'rgba(17,19,21,.82)',border:'1px solid rgba(247,248,250,.62)',boxShadow:active||edgeGlow?WHITE_GLOW:'none',fontSize:22,fontWeight:900,textAlign:'center',...motion}}>{step}</div>
      </React.Fragment>;
    })}
  </div>;
};

export const ComparePanel:React.FC<{leftTitle:string;leftItems:string[];rightTitle:string;rightItems:string[];rect:SafeRect;conclusion?:string;conclusionFrame?:number} & TimedProps>=({leftTitle,leftItems,rightTitle,rightItems,rect,conclusion,conclusionFrame,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const group=enterExit(frame,startFrame,endFrame);
  const column=(title:string,items:string[],offset:number)=><div style={{flex:1,padding:'24px 28px',border:'1px solid rgba(247,248,250,.42)',background:'rgba(17,19,21,.42)'}}>
    <div style={{fontSize:30,fontWeight:950,color:WHITE}}>{title}</div>
    <div style={{marginTop:18,display:'grid',gap:12}}>{items.map((item,index)=>frame>=startFrame+offset+index*6?<div key={item} style={{fontSize:21,lineHeight:1.35,color:WHITE_SOFT,...enterExit(frame,startFrame+offset+index*6,endFrame)}}>— {item}</div>:null)}</div>
  </div>;
  const showConclusion=conclusion&&frame>=(conclusionFrame??endFrame-24);
  return <div style={{position:'absolute',...rect,zIndex:94,color:WHITE,...group}}>
    <div style={{display:'flex',gap:18}}>{column(leftTitle,leftItems,4)}{column(rightTitle,rightItems,8)}</div>
    {showConclusion&&<div style={{marginTop:18,fontSize:34,fontWeight:950,textAlign:'center',textShadow:WHITE_GLOW,...enterExit(frame,conclusionFrame??endFrame-24,endFrame)}}>{conclusion}</div>}
  </div>;
};

export const EvidenceFrame:React.FC<{src:string;mediaType?:'video'|'image';label:string;rect:SafeRect;fit?:'contain'|'cover';sourceStartFrame?:number;edgeGlow?:boolean} & TimedProps>=({src,mediaType='video',label,rect,fit='cover',sourceStartFrame=0,edgeGlow=false,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const motion=enterExit(frame,startFrame,endFrame);
  return <div style={{position:'absolute',...rect,zIndex:96,background:'transparent',border:'1px solid rgba(247,248,250,.7)',boxShadow:edgeGlow?`0 24px 70px rgba(0,0,0,.62),${WHITE_GLOW}`:'0 24px 70px rgba(0,0,0,.62)',overflow:'hidden',...motion}}>
    {mediaType==='image'?<Img src={src} style={{width:'100%',height:'100%',objectFit:fit}}/>:<Video src={src} muted startFrom={sourceStartFrame} style={{width:'100%',height:'100%',objectFit:fit}}/>}
    <div style={{position:'absolute',left:18,top:18,padding:'8px 12px',background:'rgba(17,19,21,.86)',border:'1px solid rgba(247,248,250,.42)',fontSize:16,fontWeight:900,letterSpacing:'.08em',color:WHITE}}>{label}</div>
  </div>;
};

export const DecisionMatrix:React.FC<{items:string[];reveals:number[];winnerIndex:number;rect:SafeRect;winnerFrame:number} & TimedProps>=({items,reveals,winnerIndex,rect,winnerFrame,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  return <div style={{position:'absolute',...rect,zIndex:94,display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:14}}>
    {items.map((item,index)=>{
      const reveal=reveals[index]??startFrame+index*7;
      if(frame<reveal)return null;
      const decided=frame>=winnerFrame;
      const winner=index===winnerIndex;
      const motion=enterExit(frame,reveal,endFrame);
      const decisionOpacity=decided && !winner ? .32 : 1;
      return <div key={item} style={{padding:'18px 22px',fontSize:24,fontWeight:900,color:WHITE,background:winner&&decided?'rgba(247,248,250,.12)':'rgba(17,19,21,.86)',border:`1px solid rgba(247,248,250,${winner && decided ? .9 : .42})`,boxShadow:winner&&decided?WHITE_GLOW:'none',...motion,opacity:motion.opacity*decisionOpacity}}>{item}</div>;
    })}
  </div>;
};



/** A single still/image evidence item. Default placement is the right side of the speaker. */
export const SingleImageEvidence:React.FC<{
  src:string;
  rect?:SafeRect;
  label?:string;
  fit?:'contain'|'cover';
  edgeGlow?:boolean;
  reveal?:'slide-right'|'rise'|'fade';
} & TimedProps>=({src,rect={left:1110,top:170,width:700,height:650},label,fit='contain',edgeGlow=false,reveal='slide-right',startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const p=interpolate(frame,[startFrame,startFrame+16],[0,1],clamp);
  const exit=interpolate(endFrame-frame,[0,12],[0,1],clamp);
  const x=reveal==='slide-right'?(1-p)*54:0;
  const y=reveal==='rise'?(1-p)*28:0;
  const scale=reveal==='fade'?1:.985+.015*p;
  const opacity=Math.min(p,exit);
  return <div style={{position:'absolute',...rect,zIndex:96,overflow:'hidden',opacity,transform:`translate(${x}px,${y}px) scale(${scale})`,background:'transparent',border:'1px solid rgba(247,248,250,.72)',boxShadow:edgeGlow?`0 24px 70px rgba(0,0,0,.62),${WHITE_GLOW}`:'0 24px 70px rgba(0,0,0,.62)'}}>
    <Img src={src} style={{width:'100%',height:'100%',objectFit:fit,display:'block'}}/>
    {label&&<div style={{position:'absolute',left:16,bottom:16,padding:'7px 11px',background:'rgba(17,19,21,.42)',color:WHITE,fontSize:16,fontWeight:900,letterSpacing:'.06em',...enterExit(frame,startFrame+8,endFrame)}}>{label}</div>}
  </div>;
};

type SpreadVariant='stack-spread'|'fan-spread'|'grid-reveal'|'orbit-spread';
type SpreadImage={src:string;label?:string;fit?:'contain'|'cover'};

/** Multi-image evidence: each image reveals separately; groups must use different variants in one timeline. */
export const ImageSpread:React.FC<{
  images:SpreadImage[]; rect?:SafeRect; variant?:SpreadVariant; reveals?:number[]; edgeGlow?:boolean; accent?:string;
} & TimedProps>=({images,rect={left:1010,top:160,width:830,height:700},variant='stack-spread',reveals=[],edgeGlow=false,accent=BLUE,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame||images.length===0)return null;
  const count=images.length;
  const cardW=Math.min(610,Math.max(300,(rect.width-42)/2));
  const cardH=Math.min(235,Math.max(150,rect.height/3.1));
  const centerX=(rect.width-cardW)/2;
  const centerY=(rect.height-cardH)/2;
  const target=(index:number)=>{
    if(variant==='grid-reveal'){
      const cols=Math.min(2,count), rows=Math.ceil(count/cols), gap=22;
      const w=(rect.width-gap*(cols-1))/cols, h=Math.min(cardH,(rect.height-gap*(rows-1))/rows);
      return {left:(index%cols)*(w+gap),top:Math.floor(index/cols)*(h+gap),width:w,height:h,rotate:0};
    }
    const gap=24, col=index%2, row=Math.floor(index/2), totalW=2*cardW+gap;
    return {left:(rect.width-totalW)/2+col*(cardW+gap),top:Math.max(0,centerY-120)+row*(cardH+gap),width:cardW,height:cardH,rotate:variant==='fan-spread'?(index%2?2:-2):0};
  };
  return <div style={{position:'absolute',...rect,zIndex:96,overflow:'visible'}}>
    {images.map((image,index)=>{
      const reveal=reveals[index]??startFrame+index*10;
      if(frame<reveal)return null;
      const progress=interpolate(frame,[reveal,reveal+18],[0,1],clamp);
      const out=interpolate(endFrame-frame,[0,12],[0,1],clamp);
      const t=target(index), isStack=variant==='stack-spread';
      const left=isStack?centerX+(t.left-centerX)*progress:t.left;
      const top=isStack?centerY+(t.top-centerY)*progress:t.top;
      const rotate=isStack?(index%2?2:-2)+(t.rotate-(index%2?2:-2))*progress:t.rotate;
      const scale=isStack?(.94+.06*progress):(.98+.02*progress);
      const labelMotion=enterExit(frame,reveal+10,endFrame);
      return <div key={`${image.src}-${index}`} style={{position:'absolute',left,top,width:t.width,height:t.height,opacity:Math.min(progress,out),transform:`rotate(${rotate}deg) scale(${scale})`,transformOrigin:'center center',background:'rgba(12,14,17,.42)',border:`1px solid ${accent}99`,boxShadow:edgeGlow?`0 20px 56px rgba(0,0,0,.62),0 0 12px ${accent}55`:'0 20px 56px rgba(0,0,0,.62)',overflow:'hidden'}}>
        <Img src={image.src} style={{width:'100%',height:'100%',objectFit:image.fit??'contain',display:'block',padding:14}}/>
        {image.label&&<div style={{position:'absolute',left:12,bottom:10,padding:'5px 8px',background:accent,color:'#101214',fontSize:13,fontWeight:950,...labelMotion}}>{image.label}</div>}
      </div>;
    })}
  </div>;
};

type TrackPoint={frame:number;x:number;y:number;zoom?:number};
const sampleTrack=(frame:number,points:TrackPoint[])=>{
  if(!points.length)return {x:.5,y:.5,zoom:1};
  if(frame<=points[0].frame)return {x:points[0].x,y:points[0].y,zoom:points[0].zoom??1};
  const last=points[points.length-1];
  if(frame>=last.frame)return {x:last.x,y:last.y,zoom:last.zoom??1};
  for(let i=0;i<points.length-1;i++){
    const a=points[i],b=points[i+1];
    if(frame>=a.frame&&frame<=b.frame){
      const p=interpolate(frame,[a.frame,b.frame],[0,1],clamp);
      return {x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p,zoom:(a.zoom??1)+((b.zoom??1)-(a.zoom??1))*p};
    }
  }
  return {x:.5,y:.5,zoom:1};
};

/** Operation-only evidence panel with intentional focus zoom and a non-blocking cursor marker. */
export const OperationDemoPanel:React.FC<{
  src:string;
  rect?:SafeRect;
  sourceStartFrame?:number;
  trackPoints?:TrackPoint[];
  showCursor?:boolean;
  showFocusRing?:boolean;
  fit?:'contain'|'cover';
  edgeGlow?:boolean;
  label?:string;
  focusLabel?:string;
} & TimedProps>=({src,rect={left:1030,top:130,width:820,height:760},sourceStartFrame=0,trackPoints=[],showCursor=true,showFocusRing=true,fit='cover',edgeGlow=false,label,focusLabel,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const enter=interpolate(frame,[startFrame,startFrame+16],[0,1],clamp);
  const exit=interpolate(endFrame-frame,[0,12],[0,1],clamp);
  const track=sampleTrack(frame,trackPoints);
  const tx=(.5-track.x)*(track.zoom-1)*100;
  const ty=(.5-track.y)*(track.zoom-1)*100;
  const focusOpacity=track.zoom>1.02?interpolate(track.zoom,[1.02,1.1],[0,.94],clamp):0;
  const focusSize=interpolate(track.zoom,[1.02,1.30],[78,154],clamp);
  const focusLeft=Math.min(86,Math.max(6,track.x*100));
  const focusTop=Math.min(86,Math.max(10,track.y*100));
  return <div style={{position:'absolute',...rect,zIndex:97,overflow:'hidden',opacity:Math.min(enter,exit),transform:`translateY(${(1-enter)*24+(1-exit)*8}px) scale(${.985+.015*enter})`,background:'transparent',border:'1px solid rgba(247,248,250,.76)',boxShadow:edgeGlow?`0 24px 70px rgba(0,0,0,.62),${WHITE_GLOW}`:'0 24px 70px rgba(0,0,0,.62)'}}>
    <Sequence from={startFrame} durationInFrames={Math.max(1,endFrame-startFrame)}>
      <Video src={src} muted startFrom={sourceStartFrame} pauseWhenBuffering={false} style={{width:'100%',height:'100%',objectFit:fit,display:'block',transformOrigin:'center center',transform:`translate(${tx}%,${ty}%) scale(${track.zoom})`}}/>
    </Sequence>
    {showFocusRing&&focusOpacity>0&&<div style={{position:'absolute',left:`${focusLeft}%`,top:`${focusTop}%`,width:focusSize,height:Math.max(54,focusSize*.56),marginLeft:-focusSize/2,marginTop:-Math.max(54,focusSize*.56)/2,border:'2px solid rgba(247,248,250,.95)',borderRadius:10,boxShadow:`${WHITE_GLOW}, inset 0 0 18px rgba(247,248,250,.08)`,opacity:focusOpacity,pointerEvents:'none'}}/>}
    {focusLabel&&focusOpacity>0&&<div style={{position:'absolute',right:16,top:16,padding:'6px 9px',background:'rgba(17,19,21,.92)',border:'1px solid rgba(247,248,250,.82)',color:WHITE,fontSize:13,fontWeight:950,letterSpacing:'.08em',opacity:focusOpacity,pointerEvents:'none',boxShadow:WHITE_GLOW,whiteSpace:'nowrap'}}>{focusLabel}</div>}
    {showCursor&&<div style={{position:'absolute',left:`${track.x*100}%`,top:`${track.y*100}%`,width:18,height:18,marginLeft:-9,marginTop:-9,border:'2px solid #111315',background:WHITE,borderRadius:'50%',boxShadow:'0 0 0 5px rgba(247,248,250,.25)',opacity:.92,pointerEvents:'none'}}/>}
    {label&&<div style={{position:'absolute',left:16,top:16,padding:'7px 11px',background:'rgba(17,19,21,.42)',color:WHITE,fontSize:15,fontWeight:900,letterSpacing:'.06em'}}>{label}</div>}
  </div>;
};





/** Compact reusable icon + label component for colorful editorial annotations. */
export const IconLabelChip:React.FC<{icon:IconName;label:string;accent?:string;rect:SafeRect;boxed?:boolean;edgeGlow?:boolean;detail?:string} & TimedProps>=({icon,label,accent=BLUE,rect,boxed=false,edgeGlow=false,detail,startFrame,endFrame})=>{
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const group=enterExit(frame,startFrame,endFrame);
  return <div style={{position:'absolute',...rect,zIndex:95,display:'flex',alignItems:'center',gap:10,padding:boxed?'8px 12px':'0',borderRadius:boxed?10:0,background:boxed?'rgba(12,14,17,.78)':'transparent',border:boxed?`1px solid ${accent}88`:'none',boxShadow:edgeGlow?`0 0 16px ${accent}44`:'none',color:WHITE,...group}}>
    <div style={{width:34,height:34,borderRadius:'50%',display:'grid',placeItems:'center',color:accent,border:`1px solid ${accent}`,background:'rgba(12,14,17,.38)',flex:'0 0 auto'}}><IconGlyph name={icon} size={22}/></div>
    <div style={{minWidth:0}}><div style={{fontSize:20,fontWeight:950,lineHeight:1.05,whiteSpace:'nowrap'}}>{label}</div>{detail&&<div style={{marginTop:3,fontSize:11,fontWeight:800,letterSpacing:'.08em',color:'rgba(247,248,250,.68)',whiteSpace:'nowrap'}}>{detail}</div>}</div>
  </div>;
};

/** Persistent upper-left editorial rail. Keep it unchanged across every scene. */
export const PersistentEditorialBar: React.FC<{
  leftLabel: string;
  rightLabel?: string;
  accent?: string;
  rect?: SafeRect;
} & TimedProps> = ({leftLabel, rightLabel, accent = '#B8A1FF', rect = {left: 72, top: 28, width: 520, height: 30}, startFrame = 0, endFrame = Number.POSITIVE_INFINITY}) => {
  const frame = useCurrentFrame();
  if (frame < startFrame || frame >= endFrame) return null;
  return <div style={{position: 'absolute', ...rect, zIndex: 150, display: 'flex', alignItems: 'center', gap: 18, pointerEvents: 'none'}}>
    <div style={{fontSize: 13, fontWeight: 900, letterSpacing: '.18em', color: accent, whiteSpace: 'nowrap', textShadow: `0 0 12px ${accent}44`}}>{leftLabel}</div>
    <div style={{height: 1, flex: 1, background: `linear-gradient(90deg, ${accent}88, rgba(247,248,250,.24) 52%, transparent)`, boxShadow: `0 0 8px ${accent}33`}} />
    {rightLabel && <div style={{fontSize: 12, fontWeight: 850, letterSpacing: '.12em', color: 'rgba(247,248,250,.72)', whiteSpace: 'nowrap'}}>{rightLabel}</div>}
  </div>;
};

/** Bilingual subtitle treatment inspired by the supplied reference: separate translucent rows. */
export const BilingualSubtitle: React.FC<{
  text: string;
  english?: string;
} & TimedProps> = ({text, english, startFrame, endFrame}) => {
  const frame = useCurrentFrame();
  if (frame < startFrame || frame >= endFrame) return null;
  const enter = interpolate(frame, [startFrame, startFrame + 4], [0, 1], clamp);
  const exit = interpolate(endFrame - frame, [0, 6], [0, 1], clamp);
  const displayText = text.replace(/[，。！？、；：,.!?;:…]+$/u, '');
  const displayEnglish = english?.replace(/[，。！？、；：,.!?;:…]+$/u, '');
  return <div style={{position: 'absolute', left: 240, right: 240, bottom: 43, zIndex: 140, display: 'flex', justifyContent: 'center', pointerEvents: 'none', opacity: enter * exit, transform: `translateY(${(1 - enter) * 6}px)`}}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, maxWidth: 1400}}>
      <div style={{display: 'inline-block', maxWidth: 1320, padding: '5px 16px 7px', background: 'rgba(0,0,0,.64)', color: WHITE, fontSize: 42, lineHeight: 1.06, fontWeight: 950, textAlign: 'center', letterSpacing: '.01em', whiteSpace: 'pre-line', textShadow: '0 2px 4px rgba(0,0,0,.9)'}}>{displayText}</div>
      {displayEnglish && <div style={{display: 'inline-block', maxWidth: 1100, padding: '4px 14px 5px', background: 'rgba(0,0,0,.64)', color: WHITE, fontSize: 28, lineHeight: 1.05, fontWeight: 800, textAlign: 'center', letterSpacing: '.015em', whiteSpace: 'pre-line', textShadow: '0 2px 4px rgba(0,0,0,.9)'}}>{displayEnglish}</div>}
    </div>
  </div>;
};


/** Shared reveal helper for reference-derived components. Items are revealed in reading order. */
const sequentialReveal = (frame:number, startFrame:number, endFrame:number, index:number, stagger=8) => {
  const itemStart = startFrame + index * stagger;
  if (frame < itemStart) return null;
  return enterExit(frame, itemStart, endFrame);
};

export type MetricHeroTag = {label:string; detail?:string; icon?:IconName};
export type MetricHeroProps = {
  value:string|number;
  prefix?:string;
  suffix?:string;
  label?:string;
  detail?:string;
  tags?:MetricHeroTag[];
  notes?:string[];
  accent?:string;
  emphasis?:string;
  rect:SafeRect;
} & TimedProps;

/** Large amount/metric treatment: dark, compact, and intentionally free of a large white card. */
export const MetricHero:React.FC<MetricHeroProps> = ({value,prefix='',suffix='',label,detail,tags=[],notes=[],accent=YELLOW,emphasis=accent,rect,startFrame,endFrame}) => {
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const group=enterExit(frame,startFrame,endFrame);
  return <div style={{position:'absolute',...rect,zIndex:96,color:WHITE,...group,pointerEvents:'none'}}>
    {label&&<div style={{fontSize:15,fontWeight:900,letterSpacing:'.18em',color:accent,textTransform:'uppercase'}}>{label}</div>}
    <div style={{display:'flex',alignItems:'baseline',gap:8,marginTop:label?8:0,whiteSpace:'nowrap'}}>
      {prefix&&<span style={{fontSize:38,fontWeight:900,color:emphasis}}>{prefix}</span>}
      <span style={{fontSize:82,lineHeight:.95,fontWeight:1000,letterSpacing:'-.035em',color:emphasis,textShadow:`0 0 18px ${emphasis}44`}}>{value}</span>
      {suffix&&<span style={{fontSize:26,fontWeight:900,color:WHITE_SOFT}}>{suffix}</span>}
    </div>
    {detail&&<div style={{marginTop:10,fontSize:18,fontWeight:800,color:WHITE_SOFT}}>{detail}</div>}
    {tags.length>0&&<div style={{display:'flex',gap:14,flexWrap:'wrap',marginTop:18}}>{tags.map((tag,i)=>{const motion=sequentialReveal(frame,startFrame,endFrame,i,8); if(!motion)return null; return <div key={`${tag.label}-${i}`} style={{display:'flex',alignItems:'center',gap:9,padding:'8px 14px',border:`1px solid ${accent}cc`,borderRadius:12,background:'rgba(8,10,13,.72)',...motion}}>{tag.icon&&<span style={{color:accent,display:'grid',placeItems:'center'}}><IconGlyph name={tag.icon} size={24}/></span>}<span><span style={{display:'block',fontSize:21,fontWeight:950,lineHeight:1.05}}>{tag.label}</span>{tag.detail&&<span style={{display:'block',marginTop:3,fontSize:11,fontWeight:850,letterSpacing:'.14em',color:accent}}>{tag.detail}</span>}</span></div>})}</div>}
    {notes.length>0&&<div style={{display:'grid',gap:5,marginTop:16}}>{notes.map((note,i)=>{const motion=sequentialReveal(frame,startFrame,endFrame,i,6); if(!motion)return null; return <div key={`${note}-${i}`} style={{fontSize:15,fontWeight:750,color:'rgba(247,248,250,.74)',...motion}}><span style={{color:accent,marginRight:8}}>•</span>{note}</div>})}</div>}
  </div>;
};

export type SponsorCardProps = {name:string;category?:string;date?:string;logo?:React.ReactNode;accent?:string;rect:SafeRect} & TimedProps;
/** Compact sponsor/ecosystem card with a small light logo strip rather than a full white panel. */
export const SponsorCard:React.FC<SponsorCardProps> = ({name,category,date,logo,accent=BLUE,rect,startFrame,endFrame}) => {
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const group=enterExit(frame,startFrame,endFrame);
  return <div style={{position:'absolute',...rect,zIndex:94,overflow:'hidden',borderRadius:14,background:'rgba(12,14,17,.9)',border:`1px solid ${accent}66`,boxShadow:`0 10px 24px rgba(0,0,0,.24),0 0 16px ${accent}22`,color:WHITE,...group}}>
    <div style={{height:Math.min(66,Math.max(44,rect.height*.36)),display:'flex',alignItems:'center',gap:10,padding:'0 14px',background:'rgba(247,248,250,.9)',color:INK}}><div style={{fontSize:18,fontWeight:950,letterSpacing:'.02em'}}>{logo??name.slice(0,1)}</div></div>
    <div style={{padding:'11px 14px 13px'}}><div style={{fontSize:21,fontWeight:950,lineHeight:1.05,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{name}</div><div style={{display:'flex',gap:8,marginTop:6,fontSize:11,fontWeight:850,letterSpacing:'.12em',color:'rgba(247,248,250,.62)',whiteSpace:'nowrap'}}>{category&&<span>{category}</span>}{date&&<span>• {date}</span>}</div></div>
  </div>;
};

export type SponsorCardGridProps = {cards:Array<Omit<SponsorCardProps,'rect'|'startFrame'|'endFrame'>>;columns?:2|3;gap?:number;accent?:string;rect:SafeRect} & TimedProps;
export const SponsorCardGrid:React.FC<SponsorCardGridProps> = ({cards,columns=2,gap=18,accent=BLUE,rect,startFrame,endFrame}) => {
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const cardWidth=(rect.width-gap*(columns-1))/columns;
  const cardHeight=(rect.height-gap*(Math.ceil(cards.length/columns)-1))/Math.ceil(cards.length/columns);
  return <div style={{position:'absolute',...rect,zIndex:94,display:'grid',gridTemplateColumns:`repeat(${columns},${cardWidth}px)`,gridAutoRows:cardHeight,gap,pointerEvents:'none'}}>{cards.map((card,i)=>{const motion=sequentialReveal(frame,startFrame,endFrame,i,8); if(!motion)return null; return <SponsorCard key={`${card.name}-${i}`} {...card} accent={card.accent??accent} rect={{left:0,top:0,width:cardWidth,height:cardHeight}} startFrame={startFrame+i*8} endFrame={endFrame}/>})}</div>;
};

export type EntityCategoryCardProps = {icon:IconName;title:string;english:string;accent?:string;rect:SafeRect} & TimedProps;
export const EntityCategoryCard:React.FC<EntityCategoryCardProps> = ({icon,title,english,accent=BLUE,rect,startFrame,endFrame}) => {
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const group=enterExit(frame,startFrame,endFrame);
  return <div style={{position:'absolute',...rect,zIndex:94,display:'flex',alignItems:'center',gap:14,padding:'12px 18px',border:`1px solid ${accent}`,borderRadius:13,background:'rgba(9,12,16,.7)',boxShadow:`0 0 14px ${accent}25`,color:WHITE,...group}}><div style={{width:38,height:38,borderRadius:'50%',display:'grid',placeItems:'center',color:accent,border:`1px solid ${accent}aa`,background:'rgba(46,140,255,.08)',flex:'0 0 auto'}}><IconGlyph name={icon} size={23}/></div><div><div style={{fontSize:24,fontWeight:950,lineHeight:1.02}}>{title}</div><div style={{marginTop:4,fontSize:12,fontWeight:900,letterSpacing:'.19em',color:accent}}>{english}</div></div></div>;
};

export type EntityCategoryGridProps = {items:Omit<EntityCategoryCardProps,'rect'|'startFrame'|'endFrame'>[];columns?:2|3;gap?:number;rect:SafeRect} & TimedProps;
export const EntityCategoryGrid:React.FC<EntityCategoryGridProps> = ({items,columns=2,gap=18,rect,startFrame,endFrame}) => {
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const rows=Math.ceil(items.length/columns); const width=(rect.width-gap*(columns-1))/columns; const height=(rect.height-gap*(rows-1))/rows;
  return <div style={{position:'absolute',...rect,zIndex:94,display:'grid',gridTemplateColumns:`repeat(${columns},${width}px)`,gridAutoRows:height,gap,pointerEvents:'none'}}>{items.map((item,i)=>{const s=startFrame+i*8; if(frame<s)return null; return <EntityCategoryCard key={`${item.title}-${i}`} {...item} rect={{left:0,top:0,width,height}} startFrame={s} endFrame={endFrame}/>})}</div>;
};

export type MetricProgressBarProps = {label:string;period?:string;value:string|number;progress:number;accent?:string;rect:SafeRect} & TimedProps;
export const MetricProgressBar:React.FC<MetricProgressBarProps> = ({label,period,value,progress,accent=BLUE,rect,startFrame,endFrame}) => {
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const group=enterExit(frame,startFrame,endFrame); const p=Math.max(0,Math.min(1,progress))*interpolate(frame,[startFrame,startFrame+18],[0,1],clamp);
  return <div style={{position:'absolute',...rect,zIndex:94,color:WHITE,...group}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',fontSize:20,fontWeight:900}}><span>{label}{period&&<span style={{marginLeft:10,color:WHITE_SOFT,fontSize:14,letterSpacing:'.08em'}}>{period}</span>}</span><span style={{fontSize:28,fontWeight:1000,color:accent}}>{value}</span></div><div style={{height:14,marginTop:9,borderRadius:999,background:'rgba(247,248,250,.18)',overflow:'hidden',boxShadow:'inset 0 1px 2px rgba(0,0,0,.35)'}}><div style={{width:`${p*100}%`,height:'100%',borderRadius:999,background:`linear-gradient(90deg,${accent}99,${accent})`,boxShadow:`0 0 12px ${accent}66`}}/></div></div>;
};

export type ComparisonBarsProps = {items:MetricProgressBarProps[];gap?:number;rect:SafeRect} & TimedProps;
export const ComparisonBars:React.FC<ComparisonBarsProps> = ({items,gap=22,rect,startFrame,endFrame}) => {
  const rowHeight=(rect.height-gap*(items.length-1))/Math.max(1,items.length);
  return <div style={{position:'absolute',...rect,zIndex:94,pointerEvents:'none'}}>{items.map((item,i)=><MetricProgressBar key={`${item.label}-${i}`} {...item} rect={{left:0,top:i*(rowHeight+gap),width:rect.width,height:rowHeight}} startFrame={startFrame+i*10} endFrame={endFrame}/>)}</div>;
};

export type DotMatrixMetricProps = {rows?:number;columns?:number;value:string|number;label:string;detail?:string;accent?:string;rect:SafeRect} & TimedProps;
export const DotMatrixMetric:React.FC<DotMatrixMetricProps> = ({rows=9,columns=18,value,label,detail,accent=BLUE,rect,startFrame,endFrame}) => {
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const group=enterExit(frame,startFrame,endFrame); const total=rows*columns; const revealed=Math.floor(interpolate(frame,[startFrame,startFrame+Math.min(30,total)],[0,total],clamp));
  return <div style={{position:'absolute',...rect,zIndex:94,color:WHITE,...group,pointerEvents:'none'}}><div style={{display:'grid',gridTemplateColumns:`repeat(${columns}, 1fr)`,gap:7,width:'62%',minWidth:330}}>{Array.from({length:total},(_,i)=><span key={i} style={{width:7,height:7,borderRadius:'50%',background:accent,opacity:i<revealed?.95:.08,boxShadow:i<revealed?`0 0 8px ${accent}88`:'none'}}/>)}</div><div style={{marginTop:18,fontSize:76,fontWeight:1000,lineHeight:.95,color:accent,textShadow:`0 0 18px ${accent}55`}}>{value}</div><div style={{marginTop:8,fontSize:24,fontWeight:950}}>{label}</div>{detail&&<div style={{marginTop:6,fontSize:14,fontWeight:800,letterSpacing:'.12em',color:WHITE_SOFT}}>{detail}</div>}</div>;
};

export type StepListPanelProps = {steps:string[];activeIndex?:number;accent?:string;rect:SafeRect} & TimedProps;
export const StepListPanel:React.FC<StepListPanelProps> = ({steps,activeIndex=-1,accent=BLUE,rect,startFrame,endFrame}) => {
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  return <div style={{position:'absolute',...rect,zIndex:94,display:'grid',gap:10,pointerEvents:'none'}}>{steps.map((step,i)=>{const motion=sequentialReveal(frame,startFrame,endFrame,i,8); if(!motion)return null; const active=i===activeIndex; return <div key={`${step}-${i}`} style={{display:'flex',alignItems:'center',gap:12,color:active?WHITE:'rgba(247,248,250,.55)',...motion}}><div style={{width:30,height:30,borderRadius:'50%',display:'grid',placeItems:'center',fontSize:12,fontWeight:950,color:active?INK:accent,background:active?accent:'transparent',border:`1px solid ${accent}`,flex:'0 0 auto'}}>{String(i+1).padStart(2,'0')}</div><div style={{fontSize:20,fontWeight:900}}>{step}</div></div>})}</div>;
};

export type ArticleEvidencePanelProps = {title:string;kicker?:string;detail?:string;imgSrc:string;fit?:'contain'|'cover';accent?:string;rect:SafeRect} & TimedProps;
/** Editorial split: narrative on the left, clear evidence screenshot on the right. */
export const ArticleEvidencePanel:React.FC<ArticleEvidencePanelProps> = ({title,kicker,detail,imgSrc,fit='contain',accent=BLUE,rect,startFrame,endFrame}) => {
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const group=enterExit(frame,startFrame,endFrame); const textMotion=enterExit(frame,startFrame+5,endFrame,0); const imageMotion=enterExit(frame,startFrame+10,endFrame,0);
  return <div style={{position:'absolute',...rect,zIndex:93,display:'grid',gridTemplateColumns:'42% 58%',gap:22,color:WHITE,...group,pointerEvents:'none'}}><div style={{paddingTop:18,...textMotion}}>{kicker&&<div style={{fontSize:14,fontWeight:950,letterSpacing:'.18em',color:accent}}>{kicker}</div>}<div style={{marginTop:10,fontSize:34,lineHeight:1.08,fontWeight:1000}}>{title}</div>{detail&&<div style={{marginTop:12,fontSize:17,lineHeight:1.35,fontWeight:750,color:WHITE_SOFT}}>{detail}</div>}</div><div style={{height:rect.height,overflow:'hidden',borderRadius:16,background:'rgba(247,248,250,.92)',boxShadow:'0 14px 30px rgba(0,0,0,.28)',...imageMotion}}><Img src={imgSrc} style={{width:'100%',height:'100%',objectFit:fit,display:'block'}}/></div></div>;
};export const RoundedInfoCard: React.FC<{
  kicker?: string;
  title: string;
  detail?: string;
  left: number;
  top: number;
  maxWidth?: number;
  accent?: string;
  compact?: boolean;
} & TimedProps> = ({kicker, title, detail, left, top, maxWidth=500, accent='#67E8F9', compact=false, startFrame, endFrame}) => {
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const group=enterExit(frame,startFrame,endFrame);
  const titleMotion=enterExit(frame,startFrame,endFrame,4);
  const detailMotion=detail?enterExit(frame,startFrame,endFrame,8):undefined;
  return <div style={{position:'absolute',left,top,zIndex:96,maxWidth,width:'max-content',color:WHITE,...group}}>
    <div style={{display:'inline-block',padding:compact?'12px 16px':'16px 20px 17px',borderRadius:22,background:'linear-gradient(135deg, rgba(21,27,34,.92), rgba(10,14,19,.78))',border:`1px solid ${accent}99`,boxShadow:`0 12px 30px rgba(0,0,0,.24), 0 0 20px ${accent}20`}}>
      {kicker&&<div style={{fontSize:12,letterSpacing:'.16em',fontWeight:900,color:accent,marginBottom:8}}>{kicker}</div>}
      <div style={{fontSize:compact?26:34,lineHeight:1.08,fontWeight:950,whiteSpace:'nowrap',...titleMotion}}>{title}</div>
      {detail&&<div style={{marginTop:9,fontSize:17,lineHeight:1.35,color:WHITE_SOFT,whiteSpace:'normal',...detailMotion}}>{detail}</div>}
    </div>
  </div>;
};

export const RoundedPill: React.FC<{
  text: string;
  left: number;
  top: number;
  accent?: string;
  icon?: string;
} & TimedProps> = ({text,left,top,accent='#67E8F9',icon,startFrame,endFrame}) => {
  const frame=useCurrentFrame();
  if(frame<startFrame||frame>=endFrame)return null;
  const motion=enterExit(frame,startFrame,endFrame);
  return <div style={{position:'absolute',left,top,zIndex:97,...motion}}>
    <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'9px 14px',borderRadius:999,background:'rgba(13,18,24,.82)',border:`1px solid ${accent}99`,color:WHITE,fontSize:18,fontWeight:900,letterSpacing:'.025em',boxShadow:`0 8px 20px rgba(0,0,0,.2), 0 0 14px ${accent}25`,whiteSpace:'nowrap'}}>
      {icon&&<span style={{display:'inline-block',width:7,height:7,borderRadius:999,background:accent,boxShadow:`0 0 10px ${accent}`}}/>}
      {text}
    </div>
  </div>;
};


