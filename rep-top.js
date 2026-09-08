(()=>{
  const repLayout={...layoutBase,margin:{l:170,r:22,t:12,b:45},showlegend:false};
  function repCustomerAgg(rep){
    const m=new Map();
    for(const r of filtered){
      const d=r.__d;
      if(rep&&rep!=='All Sales Reps'&&d.rep!==rep)continue;
      const key=d.name;
      let x=m.get(key);
      if(!x){x={name:d.name,s25:0,s26:0};m.set(key,x)}
      if(d.year===2025)x.s25+=d.sales;else x.s26+=d.sales;
    }
    return [...m.values()].map(x=>({...x,growth:x.s25?((x.s26-x.s25)/x.s25*100):null}));
  }
  function syncRepSelector(){
    const el=$('repRankRep');if(!el)return;
    const reps=[...new Set(filtered.map(r=>r.__d.rep))].sort((a,b)=>a.localeCompare(b));
    const mainSelected=filterState?.fRep?[...filterState.fRep]:[];
    const old=el.value;
    el.innerHTML=['All Sales Reps',...reps].map(r=>`<option value="${esc(r)}">${esc(r)}</option>`).join('');
    if(mainSelected.length===1&&reps.includes(mainSelected[0]))el.value=mainSelected[0];
    else if(reps.includes(old))el.value=old;
    else el.value='All Sales Reps';
  }
  function hbar(id,a,valueKey,color,textFn){
    Plotly.react(id,[{
      y:a.map(x=>x.name).reverse(),x:a.map(x=>x[valueKey]).reverse(),type:'bar',orientation:'h',
      text:a.map(textFn).reverse(),textposition:'auto',marker:{color},hovertemplate:'%{y}<br>%{x:,.0f}<extra></extra>'
    }],repLayout,plotCfg);
  }
  function renderRepTop10(){
    const el=$('repRankRep');if(!el||!filtered.length)return;
    const rep=el.value||'All Sales Reps';
    const a=repCustomerAgg(rep);
    const sales=[...a].sort((x,y)=>y.s26-x.s26).slice(0,10);
    const growth=a.filter(x=>x.s25>0&&x.growth>=10).sort((x,y)=>y.growth-x.growth).slice(0,10);
    const decline=a.filter(x=>x.s25>0&&x.growth<=-10).sort((x,y)=>x.growth-y.growth).slice(0,10);
    hbar('repSalesChart',sales,'s26','#39e7f2',x=>fmt(x.s26));
    hbar('repGrowthChart',growth,'growth','#45e6a9',x=>pct(x.growth));
    hbar('repDeclineChart',decline,'growth','#ff7085',x=>pct(x.growth));
    const label=$('repRankLabel');if(label)label.textContent=rep==='All Sales Reps'?'All Sales Reps':rep;
  }
  const originalRenderDashboard=renderDashboard;
  renderDashboard=async function(seq){
    await originalRenderDashboard(seq);
    if(seq!==applySeq)return;
    syncRepSelector();
    await nextFrame();
    renderRepTop10();
  };
  document.addEventListener('DOMContentLoaded',()=>{
    const el=$('repRankRep');if(el)el.addEventListener('change',renderRepTop10);
  });
})();
