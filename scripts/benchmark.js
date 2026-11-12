// MazeMind deterministic, dependency-free benchmark. Requires Node.js.
// From the repo root: node scripts/benchmark.js [index.html] [episodes] [seeds]
// Example: ASSIST=1 node scripts/benchmark.js index.html 40 2026,77,99
// Trains on one fixed 13x13 maze per seed. Tests before/after on 50 generated
// layouts distinct from session training layouts, greedy only, 338-step cap.
// Reported mean steps includes timeouts. ASSIST=1 enables the visit heuristic
// in both training and evaluation; it is NOT evidence of neural generalization.
// It instruments a copy of the real script in a VM; no source files are edited.
// The insertion marker is version-specific and fails loudly if the app changes.
const path=require('path');
const fs=require('fs'),vm=require('vm');
const file=process.argv[2]||path.join(__dirname,'..','index.html');
const episodes=Number(process.argv[3]||40), seedList=(process.argv[4]||'2026,77,99').split(',').map(Number);
const match=fs.readFileSync(file,'utf8').match(/<script>([\s\S]*?)<\/script>/);
if(!match) throw new Error('App script not found');
let src=match[1];
const marker='seeded(2026);makeMaze();net=makeNet();';
if(!src.includes(marker)) throw new Error('App initialization marker changed; update benchmark instrumentation');
if(!Number.isInteger(episodes)||episodes<0||seedList.some(x=>!Number.isInteger(x))) throw new Error('Invalid episodes or seed list');
src=src.replace(marker,`log=()=>{};renderMetrics=()=>{};drawAll=()=>{};
 globalThis.api={init(seed){seenMazes=new Set();seeded(seed);makeMaze();net=makeNet();targetNet=copyNet(net);episode=0;episodeWins=0;steps=0;totalSteps=0;replay=[];learnStep=0;epsilon=1;episodeResults=[];rewardHistory=[];stepHistory=[];bestPath=null;randomMazeEachEpisode=false;if(typeof memoryAssist!=='undefined')memoryAssist=processAssist;resetAgent()},train(n){for(let i=0;i<n;i++){while(!episodeDone)stepAgent();nextEpisode()}},test(n,seed){const saved={maze,start,goal,agent,rngState,visits};seeded(seed);let wins=0,total=0,minDist=0,completed=0;const tests=new Set();for(let i=0;i<n;i++){let sig,tries=0;do{makeMaze(false);sig=JSON.stringify(maze);tries++}while((seenMazes.has(sig)||tests.has(sig))&&tries<100);if(seenMazes.has(sig)||tests.has(sig))break;tests.add(sig);agent={...start};visits={[key(agent.x,agent.y)]:1};let j=0,dist=size*2;while(j<size*size*2&&!(agent.x===goal.x&&agent.y===goal.y)){dist=Math.min(dist,Math.abs(goal.x-agent.x)+Math.abs(goal.y-agent.y));let q=forward(net,state()).out,best=typeof greedyAction==='function'?greedyAction(q):0;if(typeof greedyAction!=='function')for(let k=1;k<4;k++)if(q[k]>q[best])best=k;let a=ACTIONS[best],x=agent.x+a.x,y=agent.y+a.y;if(!wallAt(x,y))agent={x,y};visits[key(agent.x,agent.y)]=(visits[key(agent.x,agent.y)]||0)+1;j++}if(agent.x===goal.x&&agent.y===goal.y){wins++;dist=0}minDist+=dist;total+=j;completed++}maze=saved.maze;start=saved.start;goal=saved.goal;agent=saved.agent;rngState=saved.rngState;visits=saved.visits;return {wins,completed,meanSteps:total/completed,meanClosestDistance:minDist/completed}},stats(){return {trainWins:episodeWins,ep:episode,steps:totalSteps,loss:lastLoss}}};
 seeded(2026);makeMaze();net=makeNet();`);
const els={};const values={batch:'32',gamma:'90',lr:'5',exploreMode:'decay',seed:'2026'};
function element(id){return els[id]||(els[id]={value:values[id]||'',style:{},classList:{toggle(){},add(){},remove(){}},addEventListener(){},setAttribute(){},getContext(){return new Proxy({},{get:()=>()=>{}})},appendChild(){},removeChild(){},textContent:'',innerHTML:''})}
const context={processAssist:process.env.ASSIST==='1',document:{getElementById:element,createElementNS:()=>element('svgchild')},setTimeout(){},cancelAnimationFrame(){},requestAnimationFrame(){},console};vm.createContext(context);vm.runInContext(src,context);
for(const seed of seedList){let t=Date.now();context.api.init(seed);let before=context.api.test(50,seed^0x9e3779b9);context.api.train(episodes);let after=context.api.test(50,seed^0x9e3779b9);console.log(JSON.stringify({file,assist:context.processAssist,seed,episodes,before,after,stats:context.api.stats(),seconds:(Date.now()-t)/1000}));}
