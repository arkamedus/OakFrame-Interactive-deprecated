!function(t){var e={};function s(i){if(e[i])return e[i].exports;var h=e[i]={i:i,l:!1,exports:{}};return t[i].call(h.exports,h,h.exports,s),h.l=!0,h.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=26)}([function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class i{constructor(){return this.x=0,this.y=0,this.z=0,this}clear(){return this.x=0,this.y=0,this.z=0,this}set(t,e,s){return this.x=t,this.y=e,this.z=s,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}mul(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}div(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}mulI(t){return this.x*=t,this.y*=t,this.z*=t,this}divI(t){return this.x/=t,this.y/=t,this.z/=t,this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}rotX(t){return n.y=this.y*Math.cos(t)-this.z*Math.sin(t),n.z=this.y*Math.sin(t)+this.z*Math.cos(t),this.y=n.y,this.z=n.z,this}rotY(t){return n.x=this.x*Math.cos(t)-this.z*Math.sin(t),n.z=this.x*Math.sin(t)+this.z*Math.cos(t),this.x=n.x,this.z=n.z,this}rotZ(t){return t*=Math.PI/180,n.x=this.x*Math.cos(t)-this.y*Math.sin(t),n.y=this.x*Math.sin(t)+this.y*Math.cos(t),this.x=n.x,this.y=n.y,this}flipX(){return this.x*=-1,this}flipY(){return this.y*=-1,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}pointTo(t){return this.sub(t).normalize(),this}dist(t){return Math.sqrt((this.x-t.x)*(this.x-t.x)+(this.y-t.y)*(this.y-t.y)+(this.z-t.z)*(this.z-t.z))}mag(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}normalize(){return h=this.mag(),this.x/=h,this.y/=h,this.z/=h,this}clone(){return(new i).set(this.x,this.y,this.z)}invert(){return this.x*=-1,this.y*=-1,this.z*=-1,this}toArray(){return[this.x,this.y,this.z]}toString(){return JSON.stringify(this)}static fromValues(t,e,s){return(new i).set(t,e,s)}}e.Vec3=i;let h=0,n=new i},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0);e.FormField=class{constructor(t,e){switch(this.element=document.createElement("div"),t.type){case"text":let s=document.createElement("input");for(let e in t)s[e]=t[e];s.onkeyup=function(){e(s.value)},this.element.appendChild(s);break;case"position":let h=document.createElement("div"),n=document.createElement("input");n.type="range",n.min=t.min||"-8",n.max=t.max||"8",n.step=t.step||"0.25",n.value=t.value.x;let o=document.createElement("input");o.type="range",o.min=t.min||"-8",o.max=t.max||"8",o.step=t.step||"0.25",o.value=t.value.y;let r=document.createElement("h5");r.innerText=t.placeholder,h.appendChild(r),h.appendChild(n),h.appendChild(o),n.onchange=n.onmousemove=function(){e((new i.Vec3).set(parseFloat(n.value),parseFloat(o.value),0))},o.onchange=o.onmousemove=function(){e((new i.Vec3).set(parseFloat(n.value),parseFloat(o.value),0))},this.element.appendChild(h);break;case"object":let a=document.createElement("select");for(let e in t);console.log("PROPS STATE",t.state),t.state&&t.state.room&&t.state.room.getObjects().forEach(function(e){let s=document.createElement("option");s.value=e.id||e._tmp,s.innerText=e.getName(),console.log(t,e),(e.id&&t.value===e.id||t.value===e._tmp)&&(s.selected=!0,console.log("hit",t.value,e)),a.appendChild(s)}),a.onchange=function(){e(parseInt(a.options[a.selectedIndex].value)),console.log("ob selected")},this.element.appendChild(a);break;case"select":this.element.className="select-wrapper";let c=document.createElement("select");t.options&&t.options.forEach(function(e){let s=document.createElement("option");s.value=e.value,s.innerText=e.text,(e.value&&t.value===e.value||t.value===e.value)&&(s.selected=!0),c.appendChild(s)}),c.onchange=function(){e(parseInt(c.options[c.selectedIndex].value))},this.element.appendChild(c)}}getElement(){return this.element}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class i{constructor(){this.x=0,this.y=0}clear(){return this.x=0,this.y=0,this}set(t,e){return this.x=t,this.y=e,this}add(t){return this.x+=t.x,this.y+=t.y,this}addI(t,e){return this.x+=t,this.y+=e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subI(t,e){return this.x-=t,this.y-=e,this}mul(t){return this.x*=t.x,this.y*=t.y,this}mulI(t){return this.x*=t,this.y*=t,this}divI(t){return this.x/=t,this.y/=t,this}pointTo(t){return this.sub(t).normalize(),this}div(t){return this.x/=t.x,this.y/=t.y,this}rotate(t){return t*=Math.PI/180,this.set(this.x*Math.cos(t)-this.y*Math.sin(t),this.x*Math.sin(t)+this.y*Math.cos(t)),this}toDeg(){let t=this.clone().normalize();return(Math.atan2(t.x,t.y+1e-7)/Math.PI*180+180)%360}toRad(){let t=this.clone().normalize();return Math.atan2(t.x,t.y+1e-7)}normalize(){let t=this.mag();return this.x/=t,this.y/=t,this}random(){return this.x=Math.random(),this.y=Math.random(),this}flipY(){return this.y*=-1,this}flipX(){return this.x*=-1,this}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}dot(t){return this.x*t.x+this.y*t.y}clone(){return(new i).set(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}dist(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))}distEuclid(t,e){return Math.sqrt(Math.pow(this.x-t,2)+Math.pow(this.y-e,2))}toArray(){return[this.x,this.y]}toString(){return JSON.stringify(this)}}e.Vec2=i},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(1);e.TimelineEventType={EMPTY:0,LOG:1,BARK:2,FIND:3,WAIT:4,WALK:5};e.TimelineEvent=class{constructor(t){this.type=e.TimelineEventType.EMPTY,this.timeout=1e3,this.d={},t&&(this.timeout=t.timeout||this.timeout,this.data=t.data,this.type=t.type)}findItems(t,e){let s=[];return t.forEach(function(t){-1!==t.tags.indexOf(e)&&s.push(t)}),s}arrayRandom(t){return t[Math.floor(Math.random()*t.length)]}pathToTag(t,e,s){let i=this.findItems(t.getObjects(),s);if(i.length){let t=this.arrayRandom(i);return!!t&&(e.path.copy(t.position),e.action=null,e.bark="",!0)}return!1}update(t,s,i){switch(this.type){case e.TimelineEventType.EMPTY:case e.TimelineEventType.LOG:i();break;case e.TimelineEventType.BARK:this.d.interval||(s.bark=this.data,this.d.interval=!0,window.setTimeout(function(){i()},this.timeout||1e3));break;case e.TimelineEventType.FIND:if(!this.d.set){this.d.set=!0;let e=this.findItems(t.getObjects(),this.data);if(!e.length)return void i();s.path=this.arrayRandom(e).position}s.position.dist(s.path)<4&&i();break;case e.TimelineEventType.WAIT:this.d.wait||(this.d.wait=!0,window.setTimeout(function(){i()},this.timeout||1e3))}}render(t,s){let h=this,n=document.createElement("div"),o=new i.FormField({type:"select",placeholder:"Event Type",value:this.type||e.TimelineEventType.EMPTY,options:[{text:"Empty",value:e.TimelineEventType.EMPTY},{text:"Log",value:e.TimelineEventType.LOG},{text:"Bark",value:e.TimelineEventType.BARK},{text:"Move",value:e.TimelineEventType.FIND}]},function(t){h.type=t,s&&s(),console.log("selected",t)});if(n.appendChild(o.getElement()),this.type!==e.TimelineEventType.EMPTY){let t=new i.FormField({type:"select",placeholder:"Event Speed",value:this.timeout||0,options:[{text:"Instant",value:0},{text:"Realtime",value:-1},{text:"1 Second",value:1},{text:"5 Second",value:5},{text:"15 Second",value:15}]},function(t){h.timeout=t,s&&s(),console.log("selected",t)});n.appendChild(t.getElement())}switch(this.type){case e.TimelineEventType.LOG:let o=new i.FormField({type:"text",placeholder:"Message",value:(this.data||"").toString()},function(t){h.data=t});n.appendChild(o.getElement());break;case e.TimelineEventType.BARK:h.data&&(h.data.object||h.data.text)||(h.data={object:0,text:""});let r=new i.FormField({type:"object",placeholder:"Object",value:h.data.object?h.data.object:0,state:t},function(t){h.data.object=t,s&&s(),console.log("selected",t)}),a=new i.FormField({type:"text",placeholder:"Message",value:(h.data.text||"").toString()},function(t){h.data.text=t});n.appendChild(r.getElement()),n.appendChild(a.getElement())}return n}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),h=s(1),n=s(6);e.RoomObject=class{constructor(t){this.name="Default Object",this.position=new i.Vec3,this.scale=new i.Vec3,this.scale.set(1,1,1),this.velocity=new i.Vec3,this.game_object=null,this.decal=!1,this.mesh=null,this.depth=0,this.path=new i.Vec3,this.actions=[],this.tags=[],this.bark="",this.action=null,this.timeline_index=0,this.timeline=null,this.task_manager=new n.TaskManager,this.entity_behavior=new n.EntityBehavior,this._tmp=1e9*Math.random()|0,t&&(this.task_manager=t.task_manager||new n.TaskManager,this.entity_behavior=t.entity_behavior||new n.EntityBehavior,this.bark=t.bark||"",this.action=t.action||null,this.actions=t.actions||[],this.decal=t.decal||!1,this.mesh=t.mesh||!1,this._tmp=t._tmp,this.tags=t.tags||[],this.name=t.name,this.timeline=t.timeline||null,t.position&&this.position.copy(t.position),t.scale&&this.scale.copy(t.scale),t.game_object&&(this.game_object=parseInt(""+t.game_object)),t.sprite&&(this.sprite=t.sprite))}setSprite(t){this.sprite=t}getTags(){return this.tags}getSprite(){return this.sprite}getId(){return this._tmp}setNextInteraction(t){this.task_manager.setNextInteraction(t)}getBehavior(){return this.entity_behavior}getName(){return this.name}getPosition(){return this.position}render(t,e){let s=this,i=document.createElement("div"),n=new h.FormField({type:"text",placeholder:"Object Name",value:this.name,state:t},function(t){s.name=t,e&&e()}),o=new h.FormField({type:"object",placeholder:"Object",value:this.game_object,state:t},function(t){s.game_object=t,e&&e(),console.log("selected",t)}),r=new h.FormField({type:"position",placeholder:"Position",value:this.position,state:t},function(t){s.position=t,e&&e()}),a=new h.FormField({type:"position",placeholder:"Scale",value:this.scale,min:.1,max:20,step:.1,state:t},function(t){s.scale=t,e&&e()});return i.appendChild(n.getElement()),i.appendChild(o.getElement()),i.appendChild(r.getElement()),i.appendChild(a.getElement()),i}getBark(){return this.bark}getScale(){return this.scale}getTimelineEvent(){return!!this.timeline&&this.timeline.getEvents()[this.timeline_index]}getTaskManager(){return this.task_manager}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(7),h=s(9),n=s(8);e.Project=class{constructor(t){let e=this;this.rooms=[],this.timelines=[],this.objects=[],t&&(this.name=t.name,t.rooms.forEach(function(t){e.rooms.push(new i.Room(t))}),t.objects.forEach(function(t){e.objects.push(new h.Prefab(t))}),t.timelines.forEach(function(t){e.timelines.push(new n.Timeline(t))}))}setName(t){this.name=t}getName(){return this.name}getObjects(){return this.objects}createRoom(t){let e=new i.Room(t);return this.rooms.push(e),e}getRooms(){return this.rooms}getTimelines(){return this.timelines}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(3);e.EntityBehavior=class{constructor(){this.hunger=Math.random(),this.hygiene=Math.random(),this.social=Math.random(),this.energy=Math.random(),this.environment=Math.random(),this.entertained=Math.random()}update(){this.hunger-=1e-4,this.hygiene-=1e-4,this.social-=1e-4,this.energy-=1e-4,this.environment-=1e-4,this.entertained-=1e-4}getHunger(){return this.hunger}getHygiene(){return this.hygiene}getSocial(){return this.social}getEnergy(){return this.energy}getEnvironment(){return this.environment}getEntertained(){return this.entertained}giveSocial(){this.social+=.25}giveFood(){this.hunger+=.25}giveEnergy(){this.energy+=1.25}};class h{constructor(t){let e=this;this.name="Default Timeline",this.events=[],this.index=0,this.remove=!1,this.priority_function=null,t&&(this.name=t.name,t.events.forEach(function(t){e.events.push(new n(t))}))}setPriorityFunction(t){this.priority_function=t}getPriority(t,e){return this.priority_function?this.priority_function(t,e):.5}update(t,e){this.getCurrentTask()&&this.getCurrentTask().update(t,e,this)}getDone(){return this.nextTask}setName(t){this.name=t}getName(){return this.name}getEvents(){return this.events}getRemove(){return this.remove}nextTask(){return this.events[this.index].isDone()&&(this.events.shift(),0===this.events.length)?(this.remove=!0,!1):this.events[this.index]}getCurrentTask(){return this.events[this.index]}}e.Interaction=h;e.TaskManager=class{constructor(){this.queue=[],this.next_action=null,this.active_actions=[],this.layers=[]}update(t,e){this.queue.length>0&&(this.next_action||(this.next_action=new h(this.queue.shift())));let s=0;this.active_actions.forEach(function(t){s++}),0===s&&(this.active_actions.push(this.next_action),this.next_action=null),this.active_actions.forEach(function(s,i){s&&s.update(t,e)}),this.active_actions=this.active_actions.filter(function(t){return t&&0==t.getRemove()})}compareConstraints(t,e,s){}setNextInteraction(t){this.next_action=t}getNextAction(){return this.next_action}getCurrentTasks(){return this.active_actions}getQueue(){return this.queue}addQueue(t){this.queue.push(t)}};class n{constructor(t){this.type=i.TimelineEventType.EMPTY,this.timeout=1e3,this.d={},this.done=!1,this.ticks=0,this.on_complete=null,t&&(this.on_complete=t.on_complete||null,this.timeout=t.timeout||this.timeout,this.data=t.data,this.type=t.type)}setDone(t){this.done=t}isDone(){return this.done}findItems(t,e){let s=[];return t.forEach(function(t){-1!==t.tags.indexOf(e)&&s.push(t)}),s}arrayRandom(t){return t[Math.floor(Math.random()*t.length)]}pathToTag(t,e,s){let i=this.findItems(t.getObjects(),s);if(i.length){let t=this.arrayRandom(i);return!!t&&(e.path.copy(t.position),e.action=null,e.bark="",!0)}return!1}update(t,e,s){let h=this;switch(this.ticks++,this.type){case i.TimelineEventType.EMPTY:h.complete(s);break;case i.TimelineEventType.LOG:s.nextTask();break;case i.TimelineEventType.BARK:this.d.interval||(e.bark=this.data,this.d.interval=!0,window.setTimeout(function(){h.complete(s)},this.timeout||1e3));break;case i.TimelineEventType.FIND:if(this.d.set)e.path=this.d.set.position,e.position.dist(e.path)<4&&h.complete(s);else{let i=this.findItems(t.getObjects(),this.data);if(!i.length)return void h.complete(s);{let t=this.arrayRandom(i);t.getId()!==e.getId()&&(this.d.set=t,e.path=this.d.set.position)}}break;case i.TimelineEventType.WAIT:this.d.wait||(this.d.wait=!0,window.setTimeout(function(){h.complete(s)},this.timeout||1e3));break;case i.TimelineEventType.WALK:this.d.path||(this.d.path=!0,e.path=this.data),e.position.dist(e.path)<4&&h.complete(s)}this.ticks>1200&&(console.error("TASK FAILED TO COMPLETE WITHIN TIME"),this.complete(s))}complete(t){return!this.isDone()&&(this.on_complete&&this.on_complete(t),this.setDone(!0),t.nextTask(),!0)}getConstraints(){return this.constraints}getPriority(){return 0}}e.Task=n;e.Constraint=class{constructor(){}getType(){return this.type}meetsConstraint(t,e){return!1}};e.Vec3DistanceConstraint=class{constructor(t,e){this.position=t,this.distance=e,this.type="distance"}getType(){return this.type}meetsConstraint(t,e){return this.position.dist(t.position)<=this.distance}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(4),h=s(0);e.Room=class{constructor(t){let e=this;this.name="Default Room",this.objects=[],this.position=new h.Vec3,this.size=new h.Vec3,this.size.x=24,this.size.y=16,t&&(this.name=t.name,this.position.copy(t.position),this.size.copy(t.size),t.objects.forEach(function(t){e.objects.push(new i.RoomObject(t))}))}getName(){return this.name}setName(t){this.name=t}getObjects(){return this.objects}addObject(t){this.objects.push(t)}createObject(t){this.objects.push(new i.RoomObject(t))}findItems(t){let e=[];return this.objects.forEach(function(s){-1!==s.getTags().indexOf(t)&&e.push(s)}),e}depthSort(t){let e=new h.Vec3;for(var s=0;s<this.objects.length;s++)e.copy(t.from).z=0,this.objects[s].depth=e.dist(this.objects[s].position),this.objects[s].decal&&(this.objects[s].depth+=1e6,this.objects[s].depth+=this.objects[s].scale.mag());var i=!0,n=0,o=null;do{i=!1;for(var r=0;r<this.objects.length-(1+n);r++)this.objects[r].depth<this.objects[r+1].depth&&(o=this.objects[r],this.objects[r]=this.objects[r+1],this.objects[r+1]=o,i=!0);n++}while(i)}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(3);e.Timeline=class{constructor(t){let e=this;this.name="Default Timeline",this.events=[],t&&(this.name=t.name,t.events.forEach(function(t){e.events.push(new i.TimelineEvent(t))}))}getName(){return this.name}getEvents(){return this.events}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(1);e.Prefab=class{constructor(t){this.name="Default Name",this._tmp=1e9*Math.random()|0,t&&(t._tmp&&(this._tmp=t._tmp),t.name&&(this.name=t.name))}getName(){return this.name}render(t,e){let s=this,h=document.createElement("div"),n=new i.FormField({type:"text",placeholder:"Object Name",value:this.name},function(t){s.name=t,e&&e()});return h.appendChild(n.getElement()),h}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Sprite=class{constructor(t){this.src=[],this.images=[],t&&(!t.src||(this.src=t.src))}getImage(){this.image_index=Date.now()/250|0,this.image_index=this.image_index%this.src.length;let t=this.images[this.image_index];if(!t){let t=new Image;return t.src=this.src[this.image_index],t.isReady=!1,t.onload=function(){t.isReady=!0},this.images.push(t),!1}return!(!t||!t.isReady)&&t}toString(){return JSON.stringify({src:this.src})}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),h=s(2),n=s(12);class o{constructor(){this.pos1=new i.Vec3,this.uv1=new h.Vec2,this.pos2=new i.Vec3,this.uv2=new h.Vec2,this.pos3=new i.Vec3,this.uv3=new h.Vec2,this.color1=new n.RGB,this.color2=new n.RGB,this.color3=new n.RGB,this.center=new i.Vec3,this.normal=new i.Vec3,this._cullvec=new i.Vec3,this._dotvec=new i.Vec3,this._depth=9999}set(t,e,s,i,h,n,o,r,a,c,p,m,l,u,d,_,y,g,x,f,v,w,b,T){return this.pos1.set(t,e,s),this.uv1.set(i,h),this.pos2.set(n,o,r),this.uv2.set(a,c),this.pos3.set(p,m,l),this.uv3.set(u,d),this.center.copy(this.pos1).add(this.pos2).add(this.pos3).divI(3),this.getnormal(),this.color1.set(_,y,g),this.color2.set(x,f,v),this.color3.set(w,b,T),this}getcenter(){return(new i.Vec3).set((this.pos1.x+this.pos2.x+this.pos3.x)/3,(this.pos1.y+this.pos2.y+this.pos3.y)/3,(this.pos1.z+this.pos2.z+this.pos3.z)/3)}recalc(){return this.center.set((this.pos1.x+this.pos2.x+this.pos3.x)/3,(this.pos1.y+this.pos2.y+this.pos3.y)/3,(this.pos1.z+this.pos2.z+this.pos3.z)/3),this}getnormal(){var t,e,s,i,h,n,o,r,a,c;return t=this.pos2.x-this.pos1.x,e=this.pos2.y-this.pos1.y,s=this.pos2.z-this.pos1.z,i=this.pos3.x-this.pos1.x,h=this.pos3.y-this.pos1.y,o=e*(n=this.pos3.z-this.pos1.z)-h*s,r=s*i-n*t,a=t*h-i*e,c=Math.sqrt(o*o+r*r+a*a),this.normal.set(o/c,r/c,a/c)}clone(){return(new o).set(this.pos1.x,this.pos1.y,this.pos1.z,this.uv1.x,this.uv1.y,this.pos2.x,this.pos2.y,this.pos2.z,this.uv2.x,this.uv2.y,this.pos3.x,this.pos3.y,this.pos3.z,this.uv3.x,this.uv3.y,this.color1.r,this.color1.g,this.color1.b,this.color2.r,this.color2.g,this.color2.b,this.color3.r,this.color3.g,this.color3.b)}copy(t){return this.pos1.copy(t.pos1),this.pos2.copy(t.pos2),this.pos3.copy(t.pos3),this.color1.copy(t.color1),this.color2.copy(t.color2),this.color3.copy(t.color3),this}flipX(){return this}translate(t){return this.pos1.add(t),this.pos2.add(t),this.pos3.add(t),this}rotate(t,e,s){return this.pos1.rotX(t),this.pos2.rotX(t),this.pos3.rotX(t),this.pos1.rotY(e),this.pos2.rotY(e),this.pos3.rotY(e),this.pos1.rotZ(s),this.pos2.rotZ(s),this.pos3.rotZ(s),this}rotX(t){return this.pos1.rotX(t),this.pos2.rotX(t),this.pos3.rotX(t),this}rotY(t){return this.pos1.rotY(t),this.pos2.rotY(t),this.pos3.rotY(t),this}rotZ(t){return this.pos1.rotZ(t),this.pos2.rotZ(t),this.pos3.rotZ(t),this}scale(t){return this.pos1.mul(t),this.pos2.mul(t),this.pos3.mul(t),this}size(){var t={},e={},s={};return t.x=this.pos2.x-this.pos1.x,t.y=this.pos2.y-this.pos1.y,t.z=this.pos2.z-this.pos1.z,e.x=this.pos3.x-this.pos1.x,e.y=this.pos3.y-this.pos1.y,e.z=this.pos3.z-this.pos1.z,s.x=t.y*e.z-t.z*e.y,s.y=t.z*e.x-t.x*e.z,s.z=t.x*e.y-t.y*e.x,.5*Math.sqrt(s.x*s.x+s.y*s.y+s.z*s.z)}}e.Face3=o;class r{constructor(){this._children=[],this._bounds=[0,0,0,0,0,0],this._tmpv=new i.Vec3,this._tmpr=new i.Vec3,this.sortmeta={co:0,sw:0,index:0,loop:0,val:{},times:0}}clear(){return this._children=[],this._bounds=[0,0,0,0,0,0],this}clone(){let t=new r;return this._children.forEach(function(e){t._children.push(e.clone().recalc())}),t}join(t,e){var s=this;return t._children.forEach(function(t){s._children.push(t.clone().scale(e.scale).rotY(e.rotation.y).rotX(e.rotation.x).rotZ(e.rotation.z).translate(e.position).recalc())}),this}draw(t,e,s){return this._children.forEach(function(s){e.drawFace3(t,s.pos1,s.pos2,s.pos3,s.color1.toHex())}),this}scale(t){return this._children.forEach(function(e){e.scale(t)}),this}rotate(t,e,s){return this._children.forEach(function(i){i.rotate(t,e,s)}),this}drawUV(t,e,s,i,h){return this._children.forEach(function(n){e.drawFace(t,n,s,i,h)}),this}sort(t,e){for(this.sortmeta.co=0,this.sortmeta.sw=0,this.sortmeta.index=0;this.sortmeta.index<this._children.length;this.sortmeta.index++)this._children[this.sortmeta.index]._depth=this._tmpv.copy(t).sub(e.position).dist(this._tmpr.copy(this._children[this.sortmeta.index].center).mul(e.scale).rotY(e.rotation.y).rotX(e.rotation.x).rotZ(e.rotation.z));this.sortmeta.loop=!0,this.sortmeta.times=0;do{this.sortmeta.loop=!1;for(var s=0;s<this._children.length-(1+this.sortmeta.times);s++)this._children[s]._depth<this._children[s+1]._depth&&(this.sortmeta.val=this._children[s],this._children[s]=this._children[s+1],this._children[s+1]=this.sortmeta.val,this.sortmeta.loop=!0);this.sortmeta.times++}while(this.sortmeta.loop);return this}sortQ(t,e){for(this.sortmeta.co=0,this.sortmeta.sw=0,this.sortmeta.index=0;this.sortmeta.index<this._children.length;this.sortmeta.index++)this._children[this.sortmeta.index]._depth=this._tmpv.copy(t).dist(this._tmpr.copy(this._children[this.sortmeta.index].center))+this._children[this.sortmeta.index].size()/2;this.sortmeta.loop=!0,this.sortmeta.times=0;do{this.sortmeta.loop=!1;for(var s=0;s<this._children.length-(1+this.sortmeta.times);s++)this._children[s]._depth<this._children[s+1]._depth&&(this.sortmeta.val=this._children[s],this._children[s]=this._children[s+1],this._children[s+1]=this.sortmeta.val,this.sortmeta.loop=!0);this.sortmeta.times++}while(this.sortmeta.loop);return this}}e.Mesh=r},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.RGB=class{constructor(){this.r=0,this.g=0,this.b=0,this.r=0,this.g=0,this.b=0}set(t,e,s){return this.r=t,this.g=e,this.b=s,this}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}toHex(){return"#"+((1<<24)+(this.r<<16)+(this.g<<8)+this.b).toString(16).slice(1)}hexToColor(t){return t=t.replace("#",""),this.r=parseInt(t.substring(0,2),16),this.g=parseInt(t.substring(2,4),16),this.b=parseInt(t.substring(4,6),16),this}};e.RGBA=class{constructor(){this.r=0,this.g=0,this.b=0,this.a=5,this.r=0,this.g=0,this.b=0,this.a=0}set(t,e,s,i){return this.r=t,this.g=e,this.b=s,this.a=i,this}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this.a=t.a,this}toHex(){return"#"+((1<<24)+(this.r<<16)+(this.g<<8)+this.b).toString(16).slice(1)}hexToColor(t,e){return t=t.replace("#",""),this.r=parseInt(t.substring(0,2),16),this.g=parseInt(t.substring(2,4),16),this.b=parseInt(t.substring(4,6),16),this.a=255*(e||1)|0,this}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),h=s(2);e.Projection=class{constructor(){this.d=new i.Vec3,this.u=new i.Vec3,this.v=new i.Vec3,this.mm=0,this.p=new i.Vec3,this.s=new h.Vec2,this.tfov=1,this.tfovpower=1,this.tfovpoweraspect=1}set(t){this.d.copy(t.to).sub(t.from),this.mm=Math.sqrt(this.d.x*this.d.x+this.d.y*this.d.y+this.d.z*this.d.z),this.d.divI(this.mm),this.u.copy(t.up),this.mm=this.u.dot(this.d),this.u.x-=this.mm*this.d.x,this.u.y-=this.mm*this.d.y,this.u.z-=this.mm*this.d.z,this.mm=Math.sqrt(this.u.x*this.u.x+this.u.y*this.u.y+this.u.z*this.u.z),this.u.divI(this.mm),this.tfov=Math.tan(t.fov*Math.PI/360),this.tfovpower=this.tfov*this.tfov,this.tfovpoweraspect=t.aspect*this.tfov*(t.aspect*this.tfov),this.u.mulI(this.tfov),this.v.set(this.u.y*this.d.z-this.d.y*this.u.z,this.u.z*this.d.x-this.d.z*this.u.x,this.u.x*this.d.y-this.d.x*this.u.y).mulI(t.aspect)}toWorld(t,e,s,i){this.s.x=2*e.x/t._width-1,this.s.y=1-2*e.y/t._height,this.p.x=this.d.x+this.u.x*this.s.y+this.v.x*this.s.x,this.p.y=this.d.y+this.u.y*this.s.y+this.v.y*this.s.x,this.p.z=this.d.z+this.u.z*this.s.y+this.v.z*this.s.x,0!=this.p.z?i.set(s.x-s.z*this.p.x/this.p.z,s.y-s.z*this.p.y/this.p.z,0):i.set(s.x-s.z*this.p.x,s.y-s.z*this.p.y,0)}toScreen(t,e,s,i){this.p.set(e.x-s.x,e.y-s.y,e.z-s.z),this.mm=this.p.dot(this.d),this.mm>0?(this.p.divI(this.mm),this.mm=this.p.dot(this.v)/this.tfovpoweraspect,i.x=(this.mm+1)/2*t._width,this.mm=this.p.dot(this.u)/this.tfovpower,i.y=(1-this.mm)/2*t._height):i.set(-99,-99)}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),h=s(13),n=s(2);e.Camera=class{constructor(){this.from=(new i.Vec3).set(0,100,30),this.to=new i.Vec3,this.up=(new i.Vec3).set(0,0,1),this.tmpv=new i.Vec3,this.fov=45,this.zoom=1,this.aspect=1,this.projection=new h.Projection,this.animation={active:!1,startfrom:new i.Vec3,startto:new i.Vec3,pos:0,gain:.5,speed:1,finishfrom:new i.Vec3,finishto:new i.Vec3},this._tmp={v1:new i.Vec3,v2:new i.Vec3,v3:new i.Vec3,v4:new i.Vec3,p1:new n.Vec2,p2:new n.Vec2,p3:new n.Vec2,drawntris:0,culltris:0,_t:[],sx:0,sy:0,sr:0,sh:0,sc:0,vx:0,vy:0,lightingvec:0}}getProjection(){return this.projection}animate(t,e,s,i,h,n){this.animation.active=!0,this.animation.startfrom.copy(t),this.animation.finishfrom.copy(e),this.animation.startto.copy(s),this.animation.finishto.copy(i),this.animation.gain=n,this.animation.pos=0,this.animation.speed=h}update(){}drawActor(t,e){let s=Date.now()/16;if(this.projection.toScreen(t,e.position,this.from,this._tmp.p1),this._tmp.v2.copy(this.from).z=0,this._tmp.v1.copy(e.position).pointTo(this._tmp.v2),this._tmp.v1.rotZ(90).add(e.position),this.projection.toScreen(t,this._tmp.v1,this.from,this._tmp.p2),this._tmp.sx=this._tmp.p2.dist(this._tmp.p1)/24,this._tmp.sy=this._tmp.sx,this._tmp.sr=Math.sin(s/6+e.rand)*(500*Math.pow(e.velocity.mag(),2))*1.5,this._tmp.sh=1,this._tmp.sc=e.scale.x||1,this._tmp.vx=this._tmp.p1.x-e.getSprite().getImage().width/2*this._tmp.sx*this._tmp.sc,this._tmp.vy=this._tmp.p1.y-e.getSprite().getImage().height*this._tmp.sy*this._tmp.sc-this._tmp.sh-(1+Math.sin(s/3))*Math.pow(e.velocity.mag(),2)*500.5*(this._tmp.sx/2),this._tmp.p1.x-e.getSprite().getImage().width*this._tmp.sx*this._tmp.sc/2>t._width||this._tmp.p1.x+e.getSprite().getImage().width*this._tmp.sx*this._tmp.sc/2<0||this._tmp.p1.y<0||this._tmp.p1.y-e.getSprite().getImage().height*this._tmp.sy*this._tmp.sc>t._height)return!1;if(t.context.save(),t.context.translate(.5+this._tmp.vx+e.getSprite().getImage().width*this._tmp.sx*this._tmp.sc/2,.5+this._tmp.vy+e.getSprite().getImage().height*this._tmp.sy*this._tmp.sc/2),t.context.rotate(this._tmp.sr),t.context.drawImage(e.getSprite().getImage(),.5-e.getSprite().getImage().width*this._tmp.sc*this._tmp.sx/2,-(.5+e.getSprite().getImage().height*this._tmp.sc*this._tmp.sy/2),e.getSprite().getImage().width*this._tmp.sx*this._tmp.sc,e.getSprite().getImage().height*this._tmp.sy*this._tmp.sc),t.fillStyle="#fff",-1!==e.tags.indexOf("npc")){let t=[];e.getTaskManager().getCurrentTasks().forEach(function(e){t.push(e.getName())}),e.getTaskManager().getCurrentTasks().length&&(e.getTaskManager().getCurrentTasks()[0].getName(),e.getTaskManager().getCurrentTasks()[0].events[0].type)}e.bark&&t.drawText(0,-40,e.bark),t.context.restore()}drawFace3(t,e,s,i,h){var n,o,r,a,c,p,m,l,u;this.projection.toScreen(t,e,this.from,this._tmp.p1),this.projection.toScreen(t,s,this.from,this._tmp.p2),this.projection.toScreen(t,i,this.from,this._tmp.p3),n=s.x-e.x,o=s.y-e.y,r=s.z-e.z,a=i.x-e.x,c=i.y-e.y,m=o*(p=i.z-e.z)-c*r,l=r*a-p*n,u=n*c-a*o,Math.sqrt(m*m+l*l+u*u),t.context.fillStyle=h||"#000",t.context.beginPath(),t.context.moveTo(this._tmp.p1.x,this._tmp.p1.y),t.context.lineTo(this._tmp.p2.x,this._tmp.p2.y),t.context.lineTo(this._tmp.p3.x,this._tmp.p3.y),t.context.fill(),t.context.strokeStyle=h||"#f00",t.context.stroke()}drawFace(t,e,s,i,h,o=1){if(this.projection.toScreen(t,this._tmp.v1.copy(s.position).divI(1).add(this._tmp.v4.copy(e.pos1).mulI(h)),this.from,this._tmp.p1),this.projection.toScreen(t,this._tmp.v2.copy(s.position).divI(1).add(this._tmp.v4.copy(e.pos2).mulI(h)),this.from,this._tmp.p2),this.projection.toScreen(t,this._tmp.v3.copy(s.position).divI(1).add(this._tmp.v4.copy(e.pos3).mulI(h)),this.from,this._tmp.p3),function(t,e,s,i){var h=new n.Vec2;h.x=(t.x+e.x+s.x)/3,h.y=(t.y+e.y+s.y)/3;var o=new n.Vec2;t.sub(o.copy(h).pointTo(t).mulI(i)),e.sub(o.copy(h).pointTo(e).mulI(i)),s.sub(o.copy(h).pointTo(s).mulI(i))}(this._tmp.p1,this._tmp.p2,this._tmp.p3,1),t.context.beginPath(),t.context.moveTo(.5+this._tmp.p1.x,.5+this._tmp.p1.y),t.context.lineTo(.5+this._tmp.p2.x,.5+this._tmp.p2.y),t.context.lineTo(.5+this._tmp.p3.x,.5+this._tmp.p3.y),this._tmp._t[20]=0,this._tmp._t[21]=0,this._tmp._t[22]=i.width,this._tmp._t[23]=i.height,this._tmp._t[8]=this._tmp.p1.x,this._tmp._t[9]=this._tmp.p1.y,this._tmp._t[10]=this._tmp.p2.x,this._tmp._t[11]=this._tmp.p2.y,this._tmp._t[12]=this._tmp.p3.x,this._tmp._t[13]=this._tmp.p3.y,this._tmp._t[14]=(e.uv1.x+this._tmp._t[20])*this._tmp._t[22],this._tmp._t[15]=(e.uv1.y+this._tmp._t[21])*this._tmp._t[23],this._tmp._t[16]=(e.uv2.x+this._tmp._t[20])*this._tmp._t[22],this._tmp._t[17]=(e.uv2.y+this._tmp._t[21])*this._tmp._t[23],this._tmp._t[18]=(e.uv3.x+this._tmp._t[20])*this._tmp._t[22],this._tmp._t[19]=(e.uv3.y+this._tmp._t[21])*this._tmp._t[23],this._tmp._t[10]-=this._tmp._t[8],this._tmp._t[11]-=this._tmp._t[9],this._tmp._t[12]-=this._tmp._t[8],this._tmp._t[13]-=this._tmp._t[9],this._tmp._t[16]-=this._tmp._t[14],this._tmp._t[17]-=this._tmp._t[15],this._tmp._t[18]-=this._tmp._t[14],this._tmp._t[19]-=this._tmp._t[15],this._tmp._t[6]=this._tmp._t[16]*this._tmp._t[19]-this._tmp._t[18]*this._tmp._t[17],0===this._tmp._t[6])return!1;this._tmp._t[7]=1/this._tmp._t[6],this._tmp._t[0]=(this._tmp._t[19]*this._tmp._t[10]-this._tmp._t[17]*this._tmp._t[12])*this._tmp._t[7],this._tmp._t[1]=(this._tmp._t[19]*this._tmp._t[11]-this._tmp._t[17]*this._tmp._t[13])*this._tmp._t[7],this._tmp._t[2]=(this._tmp._t[16]*this._tmp._t[12]-this._tmp._t[18]*this._tmp._t[10])*this._tmp._t[7],this._tmp._t[3]=(this._tmp._t[16]*this._tmp._t[13]-this._tmp._t[18]*this._tmp._t[11])*this._tmp._t[7],this._tmp._t[4]=this._tmp._t[8]-this._tmp._t[0]*this._tmp._t[14]-this._tmp._t[2]*this._tmp._t[15],this._tmp._t[5]=this._tmp._t[9]-this._tmp._t[1]*this._tmp._t[14]-this._tmp._t[3]*this._tmp._t[15],t.context.save(),t.context.clip(),t.context.transform(this._tmp._t[0],this._tmp._t[1],this._tmp._t[2],this._tmp._t[3],this._tmp._t[4],this._tmp._t[5]),t.context.drawImage(i,0,0),t.context.restore()}}},,,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Surface=class{constructor(){return this.element=document.createElement("canvas"),this.element.getContext&&this.element.getContext("2d")||console.error("canvas is not supported."),this._set_size=!1,this.context=this.element.getContext("2d"),this._width=this.context.width||300,this._height=this.context.height||150,this._scaling=1,this.context.font=20*this._scaling+"px DM Sans",this}drawText(t,e,s){this.context.font=20*this._scaling+"px DM Sans",this.context.fillStyle="#000",this.context.fillText(s,t,e)}resize(t,e){if("100%"==t){let e=this.getElement().parentNode;t=e.offsetWidth-(parseInt(e.style.paddingRight||"0",10)+parseInt(e.style.paddingLeft||"0",10)+parseInt(e.style.borderLeftWidth||"0",10))||1}let s=t*this._scaling,i=e*this._scaling;return i=Math.min(i,window.innerHeight*this._scaling),s=Math.min(s,window.innerWidth*this._scaling),this.element.width=s,this._width=s,this.element.height=i,this._height=i,this.context.width=s*this._scaling,this.context.height=i*this._scaling,this}maximize(){let t=this.getElement().parentNode;if(t){let e=t.offsetWidth-(parseInt(t.style.paddingRight||"0",10)+parseInt(t.style.paddingLeft||"0",10)+parseInt(t.style.borderLeftWidth||"0",10))||1,s=t.offsetHeight||this.getHeight()||1;console.log(e,s),this._width===e*this._scaling&&this._height===s*this._scaling||this.resize(e,s)}}setSize(t,e){this._set_size=!0,this.resize(t,e)}attach(t,e){return document.body.appendChild(this.element),this.element.style.position="fixed",this.element.style.left=t+"px",this.element.style.top=e+"px",this}detach(){this.element.parentElement.removeChild(this.element)}fill(t){return this._set_size||this.maximize(),this.context.beginPath(),this.context.fillStyle=t,this.context.rect(0,0,this._width,this._height),this.context.fill(),this}clear(){return this.context.clearRect(0,0,this._width,this._height),this}getElement(){return this.element}getContext(){return this.context}getScaling(){return this._scaling}getWidth(){return this._width}getHeight(){return this._height}}},,,,,,,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(18),h=s(0),n=s(2),o=s(10),r=s(11),a=s(5),c=s(4),p=s(14);let m={getContext:function(){return window.OakContext||(window.OakContext={}),window.OakContext},getContainer:function(){return window.Oak.container||document.body},Math:{Vec3:h.Vec3,Vec2:n.Vec2,Mesh:r.Mesh,Face3:r.Face3},Surface:i.Surface,Sprite:o.Sprite,Project:a.Project,RoomObject:c.RoomObject,Camera:p.Camera,Utils:{Object:{rollup:function(t){for(var e in t)if("object"==typeof t[e]){for(var s in t[e])t[s]=t[e][s];delete t[e]}return t}},Array:{max:function(t){let e;return t.forEach(function(t){(!e||t>e)&&(e=t)}),e},normalizeProperties(t,e=2){let s=[],i=[];return t.forEach(function(t){for(var e in t)s[e]||(s[e]=[]),s[e].push(t[e])}),t.forEach(function(t){let h={};for(var n in t)isNaN(t[n])?h[n]=t[n]:h[n]=(t[n]/window.Oak.Utils.Array.max(s[n])).toFixed(e);i.push(h)}),i}},HTML:{arrayToTable(t,e){e=e||{};let s=[],i=[];return t.forEach(function(t){(function(t){let e=[];for(var s in t)e.push(s);return e})(t).forEach(function(t){-1==i.indexOf(t)&&i.push(t)})}),s.push(`<table class='${e.class||""}'>`),i.length?(s.push("<tr>"),i.forEach(function(t){s.push("<td><strong><em>"),s.push(t),s.push("</em></strong></td>")}),s.push("</tr>"),t.forEach(function(t){s.push("<tr>"),i.forEach(function(e){s.push("<td>"),s.push("number"==typeof t[e]?t[e].toFixed(2):t[e]),s.push("</td>")}),s.push("</tr>")})):t.forEach(function(t){s.push("<tr>"),s.push("<td>"),s.push("number"==typeof t?t.toFixed(2):t),s.push("</td>"),s.push("</tr>")}),s.push("</table>"),s.join("")}}}};window.Oak=m}]);