"use strict";(self.webpackChunkkkbox_podcast_demo=self.webpackChunkkkbox_podcast_demo||[]).push([[696],{982:(e,s,o)=>{o.r(s),o.d(s,{default:()=>b});var t=o(6252),i=o(3577);const l={class:"m-l-xl m-b-xs"},n={class:"fz-16"},d={class:"fz-30 fz-bold"},a=(0,t._)("p",{class:"fz-20 fz-bold"},"本集介紹",-1),c=["innerHTML"];var p=o(2262),r=o(8810),u=o(894),m=o(8903),f=o(5722);var y=o(6093);const g={name:"Button",props:{svgIconName:{type:String,default:""},text:{type:String,default:""}},components:{Icon:y.Z}};var _=o(3744);const I={$style:{btn:"Button_btn-Ej2j7","btn-primary":"Button_btn-primary-z2Y54"}},v=(0,_.Z)(g,[["render",function(e,s,o,l,n,d){const a=(0,t.up)("Icon");return(0,t.wg)(),(0,t.iD)("div",{class:(0,i.C_)([e.$style.btn,e.$style["btn-primary"],"p-x-lg p-y-xs d-flex align-items-center justify-content-centet fz-16"])},[o.svgIconName?((0,t.wg)(),(0,t.j4)(a,{key:0,name:o.svgIconName,svgClass:"m-r-xs"},null,8,["name"])):(0,t.kq)("",!0),(0,t.Uk)(" "+(0,i.zw)(o.text),1)],2)}],["__cssModules",I]]),E={name:"EpisodeContainer",components:{LazyLoadImage:f.Z,Button:v},setup(){const e=(0,r.yj)(),s=(0,u.oR)(),o=(0,p.iH)(!1),i=(0,p.iH)(null),l=(0,p.iH)({title:"",desc:"",imgSrc:""}),n=(0,p.Fl)((()=>s.state.episodeList)),d=(0,p.Fl)((()=>s.state.episodeInfo)),a=()=>{const s=n.value.get(e.params.id);l.value=s;const o=Array.from(n.value).find((s=>s[0]==e.params.id))[1].title;window.document.title=`${o} | KKBOX podcast`};(0,t.bv)((()=>{document.body.scrollTop=0,(0,m.Sr)({target:i.value,callback:e=>{o.value=!(e[0].intersectionRatio>.5)},options:{root:null,threshold:.5}}),n.value&&(a(),c.value=d.value.episodeId===e.params.id)})),(0,t.YP)(n,(()=>{a()}));const c=(0,p.iH)(!1);return(0,t.YP)((()=>d.value.episodeId),(()=>{c.value=d.value.episodeId===e.params.id})),{episodeInfoRef:i,shouldEpisodeInfoSticky:o,currentEpisodeInfo:l,channelInfo:(0,p.Fl)((()=>s.state.channelInfo)),isCurrentEpisode:c,onTogglePlay:()=>{c.value?s.commit("SET_IS_RESTART",!0):(s.commit("SET_EPISODE_INFO",{...l.value,episodeId:e.params.id}),c.value=d.value.episodeId===e.params.id)}}}},k={$style:{observer:"Episode_observer-MbMh1","episode-section":"Episode_episode-section-gJQHR","episode-section-small":"Episode_episode-section-small-W2U81","episode-logo":"Episode_episode-logo-Ckmm0","episode-logo-small":"Episode_episode-logo-small-dYbF8","desc-section-sticky":"Episode_desc-section-sticky-c36EK"}},b=(0,_.Z)(E,[["render",function(e,s,o,p,r,u){const m=(0,t.up)("LazyLoadImage"),f=(0,t.up)("Button");return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t._)("div",{class:(0,i.C_)([e.$style.observer,"position-absolute"]),ref:"episodeInfoRef"},null,2),(0,t._)("section",{class:(0,i.C_)([e.$style["episode-section"],"p-md d-flex",p.shouldEpisodeInfoSticky?[e.$style["episode-section-small"],"position-sticky p-t-md align-items-center"]:["align-items-end"]])},[(0,t._)("div",{class:(0,i.C_)([e.$style["episode-logo"],p.shouldEpisodeInfoSticky?[e.$style["episode-logo-small"]]:[]])},[(0,t.Wm)(m,{src:p.currentEpisodeInfo.imgSrc,alt:p.currentEpisodeInfo.title,width:p.shouldEpisodeInfoSticky?75:150,height:p.shouldEpisodeInfoSticky?75:150},null,8,["src","alt","width","height"])],2),(0,t._)("div",l,[(0,t._)("p",n,(0,i.zw)(p.channelInfo.name),1),(0,t._)("p",d,(0,i.zw)(p.currentEpisodeInfo.title),1)]),(0,t.Wm)(f,{text:p.isCurrentEpisode?"重新播放":"播放",svgIconName:"play-svgo",class:(0,i.C_)([p.shouldEpisodeInfoSticky?"m-t-md":"m-b-sm","m-l-xl"]),onClick:p.onTogglePlay},null,8,["text","class","onClick"])],2),(0,t._)("section",{class:(0,i.C_)([p.shouldEpisodeInfoSticky?e.$style["desc-section-sticky"]:"","p-y-md"])},[a,(0,t._)("article",{class:"m-t-lg",innerHTML:p.currentEpisodeInfo.desc},null,8,c)],2)],64)}],["__cssModules",k]])}}]);