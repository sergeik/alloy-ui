AUI.add("aui-tree-data",function(P){var H=P.Lang,M=H.isArray,K=H.isObject,N=H.isString,D=H.isUndefined,Y="boundingBox",F="children",Q="container",S=".",I="id",W="index",V="nextSibling",a="node",E="ownerTree",G="parentNode",T="prevSibling",R="previousSibling",U="tree",C="tree-data",O=function(A){return P.get(A);},J=function(A){return(A instanceof P.TreeNode);},X=P.ClassNameManager.getClassName,B=X(U,a);function Z(A){Z.superclass.constructor.apply(this,arguments);}P.mix(Z,{NAME:C,ATTRS:{container:{setter:O},children:{value:[],validator:M,setter:function(A){return this._setChildren(A);}},index:{value:{}}}});P.extend(Z,P.Widget,{UI_EVENTS:{},initializer:function(){var A=this;A.publish("move");A.publish("collapseAll",{defaultFn:A._collapseAll});A.publish("expandAll",{defaultFn:A._expandAll});A.publish("append",{defaultFn:A._appendChild});A.publish("remove",{defaultFn:A._removeChild});Z.superclass.initializer.apply(this,arguments);},getNodeById:function(L){var A=this;return A.get(W)[L];},isRegistered:function(L){var A=this;return !!(A.get(W)[L.get(I)]);},updateReferences:function(c,d,g){var h=this;var f=c.get(G);var A=c.get(E);var e=f&&(f!=d);if(f){if(e){var L=f.get(F);P.Array.removeItem(L,h);f.set(F,L);}f.unregisterNode(c);}if(A){A.unregisterNode(c);}c.set(G,d);c.set(E,g);if(d){d.registerNode(c);}if(g){g.registerNode(c);}if(A!=g){c.eachChildren(function(i){h.updateReferences(i,i.get(G),g);});}if(e){var b=h.getEventOutputMap(c);b.tree.oldParent=f;b.tree.oldOwnerTree=A;h.bubbleEvent("move",b);}},refreshIndex:function(){var A=this;A.updateIndex({});A.eachChildren(function(L){A.registerNode(L);},true);},registerNode:function(c){var A=this;var b=c.get(I);var L=A.get(W);if(b){L[b]=c;}A.updateIndex(L);},updateIndex:function(L){var A=this;if(L){A.set(W,L);}},unregisterNode:function(b){var A=this;var L=A.get(W);delete L[b.get(I)];A.updateIndex(L);},collapseAll:function(){var A=this;var L=A.getEventOutputMap(A);A.fire("collapseAll",L);},_collapseAll:function(L){var A=this;A.eachChildren(function(b){b.collapse();},true);},expandAll:function(){var A=this;var L=A.getEventOutputMap(A);A.fire("expandAll",L);},_expandAll:function(L){var A=this;A.eachChildren(function(b){b.expand();},true);},selectAll:function(){var A=this;A.eachChildren(function(L){L.select();},true);},unselectAll:function(){var A=this;A.eachChildren(function(L){L.unselect();},true);},eachChildren:function(c,L){var A=this;var b=A.getChildren(L);P.Array.each(b,function(d){if(d){c.apply(A,arguments);}});},eachParent:function(b){var L=this;var A=L.get(G);while(A){if(A){b.apply(L,[A]);}A=A.get(G);}},bubbleEvent:function(d,c,e,b){var L=this;L.fire(d,c);if(!e){var A=L.get(G);c=c||{};if(D(b)){b=true;}c.stopActionPropagation=b;while(A){A.fire(d,c);A=A.get(G);}}},createNode:function(L){var A=this;var b=L.type;if(N(b)&&P.TreeNode.nodeTypes){b=P.TreeNode.nodeTypes[b];}if(!b){b=P.TreeNode;}return new b(L);},appendChild:function(c,b){var A=this;var L=A.getEventOutputMap(c);A.bubbleEvent("append",L,b);},_appendChild:function(g){if(g.stopActionPropagation){return false;}var A=this;var f=g.tree.node;var L=A.get(E);var d=A.get(F);A.updateReferences(f,A,L);var e=d.push(f);A.set(F,d);var c=e-2;var b=A.item(c);f.set(V,null);f.set(T,b);A.get(Q).append(f.get(Y));f.render();},item:function(L){var A=this;return A.get(F)[L];},indexOf:function(L){var A=this;return P.Array.indexOf(A.get(F),L);},hasChildNodes:function(){return(this.get(F).length>0);},getChildren:function(L){var A=this;var c=[];var b=A.get(F);c=c.concat(b);if(L){A.eachChildren(function(d){c=c.concat(d.getChildren(L));});}return c;},getEventOutputMap:function(L){var A=this;return{tree:{instance:A,node:L||A}};},removeChild:function(b){var A=this;var L=A.getEventOutputMap(b);A.bubbleEvent("remove",L);},_removeChild:function(d){if(d.stopActionPropagation){return false;}var A=this;var c=d.tree.node;var L=A.get(E);if(A.isRegistered(c)){c.set(G,null);A.unregisterNode(c);c.set(E,null);if(L){L.unregisterNode(c);}c.get(Y).remove();var b=A.get(F);P.Array.removeItem(b,c);A.set(F,b);}},empty:function(){var A=this;A.eachChildren(function(b){var L=b.get(G);if(L){L.removeChild(b);}});},insert:function(g,d,e){var j=this;d=d||this;if(d==g){return false;}var A=d.get(G);if(g&&A){var f=g.get(Y);var c=d.get(Y);var i=d.get(E);if(e=="before"){c.placeBefore(f);}else{if(e=="after"){c.placeAfter(f);}}var L=[];var h=A.get(Y).all("> ul > li");h.each(function(k){L.push(P.Widget.getByNode(k));});g.set(V,P.Widget.getByNode(f.get(V)));g.set(T,P.Widget.getByNode(f.get(R)));d.updateReferences(g,A,i);A.set(F,L);}g.render();var b=d.getEventOutputMap(g);b.tree.refTreeNode=d;d.bubbleEvent("insert",b);},insertAfter:function(L,A){A.insert(L,A,"after");},insertBefore:function(L,A){A.insert(L,A,"before");},getNodeByChild:function(b){var A=this;var L=b.ancestor(S+B);if(L){return A.getNodeById(L.attr(I));}return null;},_setChildren:function(L){var A=this;var b=[];P.Array.each(L,function(c){if(c){if(!J(c)&&K(c)){c=A.createNode(c);}if(!J(A)){c.set(E,A);}c.render();if(P.Array.indexOf(b,c)==-1){b.push(c);}}});return b;}});P.TreeData=Z;},"@VERSION@",{skinnable:false,requires:["aui-base"]});AUI.add("aui-tree-node",function(AD){var x=AD.Lang,Ag=x.isString,AX=x.isBoolean,An="alwaysShowHitArea",p="",T="boundingBox",H="children",Ac="clearfix",Z="collapsed",B="container",AB="content",X="contentBox",K="expanded",Q="helper",u="hidden",i="hitarea",G="hitAreaEl",t="icon",Am="iconEl",AR="id",AJ="label",v="labelEl",s="lastSelected",Ab="leaf",R="node",AL="over",y="ownerTree",F="parentNode",Aa="selected",U=" ",I="tree",j="tree-node",V=function(A){return AD.get(A);},Aj=function(){return Array.prototype.slice.call(arguments).join(U);},AO=function(A){return(A instanceof AD.TreeNode);},Ai=function(A){return(A instanceof AD.TreeView);},g=AD.ClassNameManager.getClassName,AG=g(Q,Ac),a=g(I,Z),C=g(I,B),Ao=g(I,K),W=g(I,u),AS=g(I,i),f=g(I,t),M=g(I,AJ),e=g(I,R,AB),AT=g(I,R,u,i),J=g(I,R,Ab),Af=g(I,R,AL),k=g(I,R,Aa),AC='<div class="'+AS+'"></div>',S='<div class="'+f+'"></div>',E='<div class="'+M+'"></div>',Al="<ul></ul>",Y="<li></li>",z='<div class="'+Aj(AG,e)+'"></div>';
function n(A){n.superclass.constructor.apply(this,arguments);}AD.mix(n,{NAME:j,ATTRS:{draggable:{value:true,validator:AX},ownerTree:{value:null},label:{value:p,validator:Ag},expanded:{value:false,validator:AX},id:{validator:Ag},leaf:{value:true,setter:function(A){if(A&&this.get(H).length){return false;}return A;},validator:AX},nextSibling:{value:null,validator:AO},prevSibling:{value:null,validator:AO},parentNode:{value:null,validator:function(A){return AO(A)||Ai(A);}},labelEl:{setter:V,valueFn:function(){var A=this.get(AJ);return AD.Node.create(E).html(A).unselectable();}},hitAreaEl:{setter:V,valueFn:function(){return AD.Node.create(AC);}},alwaysShowHitArea:{value:true,validator:AX},iconEl:{setter:V,valueFn:function(){return AD.Node.create(S);}},tabIndex:{value:null}}});AD.extend(n,AD.TreeData,{BOUNDING_TEMPLATE:Y,CONTENT_TEMPLATE:z,initializer:function(){var A=this;A._syncTreeNodeBBId();n.superclass.initializer.apply(this,arguments);},bindUI:function(){var A=this;A.publish("collapse",{defaultFn:A._collapse});A.publish("expand",{defaultFn:A._expand});A.after("childrenChange",AD.bind(A._afterSetChildren,A));A.after("idChange",A._afterSetId,A);},_renderUI:function(A){this._renderBoxClassNames();},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncHitArea(A.get(H));},_renderContentBox:function(As){var A=this;var L=A.get(X);if(A.isLeaf()){L.addClass(J);}else{var Ar=A.get(K);L.addClass(Ar?Ao:a);if(Ar){A.expand();}}return L;},_renderBoundingBox:function(){var A=this;var Ar=A.get(T);var L=A.get(X);var As=null;if(!A.isLeaf()){L.append(A.get(G));As=A._createNodeContainer();}L.append(A.get(Am));L.append(A.get(v));Ar.append(L);if(As){if(!A.get(K)){As.addClass(W);}Ar.append(As);}return Ar;},_createNodeContainer:function(){var A=this;var L=A.get(B)||AD.Node.create(Al);L.addClass(C);A.set(B,L);A.eachChildren(function(Ar){A.appendChild(Ar);});return L;},_syncHitArea:function(L){var A=this;if(A.get(An)||L.length){A.showHitArea();}else{A.hideHitArea();A.collapse();}},appendChild:function(){var A=this;if(!A.isLeaf()){n.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;if(A.get(K)){var L=A.getEventOutputMap(A);A.bubbleEvent("collapse",L);}},_collapse:function(As){if(As.stopActionPropagation){return false;}var A=this;if(!A.isLeaf()){var Ar=A.get(B);var L=A.get(X);L.replaceClass(Ao,a);if(Ar){Ar.addClass(W);}A.set(K,false);}},collapseAll:function(){var A=this;n.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(A){return A.isAncestor(this);},expand:function(){var A=this;if(!A.get(K)){var L=A.getEventOutputMap(A);A.bubbleEvent("expand",L);}},_expand:function(As){if(As.stopActionPropagation){return false;}var A=this;if(!A.isLeaf()){var Ar=A.get(B);var L=A.get(X);L.replaceClass(a,Ao);if(Ar){Ar.removeClass(W);}A.set(K,true);}},expandAll:function(){var A=this;n.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var Ar=0;var L=this;var A=L.get(F);while(A){++Ar;A=A.get(F);}return Ar;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&n.superclass.hasChildNodes.apply(this,arguments));},isSelected:function(){return this.get(X).hasClass(k);},isLeaf:function(){var A=this;return A.get(Ab);},isAncestor:function(Ar){var L=this;var A=L.get(F);while(A){if(A==Ar){return true;}A=A.get(F);}return false;},insertAfter:function(Ar,L){var A=this;n.superclass.insertAfter.apply(this,[Ar,A]);},insertBefore:function(L){var A=this;n.superclass.insertBefore.apply(this,[L,A]);},removeChild:function(L){var A=this;if(!A.isLeaf()){n.superclass.removeChild.apply(A,arguments);}},toggle:function(){var A=this;if(A.get(K)){A.collapse();}else{A.expand();}},select:function(){var A=this;var L=A.get(y);if(L){L.set(s,A);}A.get(X).addClass(k);A.fire("select");},unselect:function(){var A=this;A.get(X).removeClass(k);A.fire("unselect");},over:function(){this.get(X).addClass(Af);},out:function(){this.get(X).removeClass(Af);},showHitArea:function(){var A=this;var L=A.get(G);L.removeClass(AT);},hideHitArea:function(){var A=this;var L=A.get(G);L.addClass(AT);},_syncTreeNodeBBId:function(L){var A=this;A.get(T).attr(AR,A.get(AR));},_afterSetChildren:function(L){var A=this;A._syncHitArea(L.newVal);}});AD.TreeNode=n;var AV=x.isFunction,h=x.isObject,Ah="cache",AK="io",AY="limit",Ak="loaded",Ap="loading",AF="offset",AI="paginator",AQ="tree-node-io",D="paginatorClick",AW=g(I,R,AI),b=g(I,R,AK,Ap),AU='<a class="'+AW+'" href="javascript:void(0);">Load more results</a>';function m(A){m.superclass.constructor.apply(this,arguments);}AD.mix(m,{NAME:AQ,ATTRS:{io:{lazyAdd:false,value:null,setter:function(A){return this._setIO(A);}},loading:{value:false,validator:AX},loaded:{value:false,validator:AX},cache:{value:true,validator:AX},leaf:{value:false,validator:AX},paginator:{setter:function(A){return AD.merge({autoFocus:true,element:AD.Node.create(AU),limit:Infinity,limitParam:AY,offset:0,offsetParam:AF},A);},validator:h}}});AD.extend(m,AD.TreeNode,{renderUI:function(){var A=this;A._inheritOwnerTreeAttrs();m.superclass.renderUI.apply(this,arguments);},bindUI:function(){var A=this;m.superclass.bindUI.apply(this,arguments);A._bindPaginatorUI();A._createEvents();},_bindPaginatorUI:function(){var A=this;var Ar=A.get(AI);if(Ar){var L=AD.bind(A._handlePaginatorClickEvent,A);Ar.element.on("click",L);}},createNode:function(L){var A=this;AD.each(L,function(As){var Ar=m.superclass.createNode.apply(A,[As]);A.appendChild(Ar);});A._syncPaginatorUI();},expand:function(){var A=this;var L=A.get(Ah);var At=A.get(AK);var Ar=A.get(Ak);var As=A.get(Ap);if(!L){A.set(Ak,false);}if(!At||Ar){m.superclass.expand.apply(this,arguments);}else{if(!As){if(!L){A.empty();}A.initIO();}}},initIO:function(){var L=this;var Ar=L.get(AK);if(AV(Ar.cfg.data)){Ar.cfg.data=Ar.cfg.data.apply(L,[L]);}L._syncPaginatorIOData(Ar);if(AV(Ar.loader)){var A=AD.bind(Ar.loader,L);A(Ar.url,Ar.cfg,L);}else{AD.io(Ar.url,Ar.cfg);}},ioStartHandler:function(){var A=this;var L=A.get(X);A.set(Ap,true);
L.addClass(b);},ioCompleteHandler:function(){var A=this;var L=A.get(X);A.set(Ap,false);A.set(Ak,true);L.removeClass(b);},ioSuccessHandler:function(){var A=this;var Aw=A.get(AK);var Ar=Array.prototype.slice.call(arguments);var At=Ar.length;var L=Ar[0];if(At>=2){var Av=Ar[1];try{L=AD.JSON.parse(Av.responseText);}catch(Au){}}var As=Aw.formatter;if(As){L=As(L);}A.createNode(L);A.expand();},ioFailureHandler:function(){var A=this;A.set(Ap,false);A.set(Ak,false);},_createEvents:function(){var A=this;A.publish(D,{defaultFn:A._defPaginatorClickFn,prefix:AQ});},_defPaginatorClickFn:function(L){var A=this;var Ar=A.get(AI);Ar.offset+=Ar.limit;if(A.get(AK)){A.initIO();}},_handlePaginatorClickEvent:function(As){var A=this;var Ar=A.get(y);var L=A.getEventOutputMap(A);A.fire(D,L);if(Ar){Ar.fire(D,L);}As.halt();},_inheritOwnerTreeAttrs:function(){var L=this;var Ar=L.get(y);if(Ar){if(!L.get(AK)){L.set(AK,AD.clone(Ar.get(AK)));}if(!L.get(AI)){var A=Ar.get(AI);if(A&&A.element){A.element=A.element.cloneNode(true);}L.set(AI,A);}}},_setIO:function(Ar){var A=this;if(!Ar){return null;}else{if(Ag(Ar)){Ar={url:Ar};}}Ar=Ar||{};Ar.cfg=Ar.cfg||{};Ar.cfg.on=Ar.cfg.on||{};var L={start:AD.bind(A.ioStartHandler,A),complete:AD.bind(A.ioCompleteHandler,A),success:AD.bind(A.ioSuccessHandler,A),failure:AD.bind(A.ioFailureHandler,A)};AD.each(L,function(Au,As){var Av=Ar.cfg.on[As];if(AV(Av)){var At=function(){Au.apply(A,arguments);Av.apply(A,arguments);};Ar.cfg.on[As]=AD.bind(At,A);}else{Ar.cfg.on[As]=Au;}});return Ar;},_syncPaginatorIOData:function(As){var A=this;var L=As.cfg.data||{};var Ar=A.get(AI);if(Ar){L[Ar.limitParam]=Ar.limit;L[Ar.offsetParam]=Ar.offset;As.cfg.data=L;}},_syncPaginatorUI:function(){var A=this;var Ar=A.get(H);var At=A.get(AI);if(At){var L=At.limit+At.offset;if(Ar.length>=L){A.get(B).append(At.element.show());if(At.autoFocus){try{At.element.focus();}catch(As){}}}else{At.element.hide();}}}});AD.TreeNodeIO=m;var N="checkbox",P="checked",AA="checkContainerEl",Ad="checkEl",o="checkName",w=".",O="name",c="tree-node-check",AH=g(I,R,N),AN=g(I,R,N,B),AP=g(I,R,P),r='<div class="'+AN+'"></div>',AM='<input class="'+AH+'" type="checkbox" />';function AZ(A){AZ.superclass.constructor.apply(this,arguments);}AD.mix(AZ,{NAME:c,ATTRS:{checked:{value:false,validator:AX},checkName:{value:c,validator:Ag},checkContainerEl:{setter:V,valueFn:function(){return AD.Node.create(r);}},checkEl:{setter:V,valueFn:function(){var A=this.get(o);return AD.Node.create(AM).attr(O,A);}}}});AD.extend(AZ,AD.TreeNodeIO,{renderUI:function(){var L=this;AZ.superclass.renderUI.apply(L,arguments);var Ar=L.get(v);var A=L.get(Ad);var As=L.get(AA);A.hide();As.append(A);Ar.placeBefore(As);if(L.isChecked()){L.check();}},bindUI:function(){var A=this;var L=A.get(X);var Ar=A.get(v);AZ.superclass.bindUI.apply(A,arguments);A.publish("check");A.publish("uncheck");L.delegate("click",AD.bind(A.toggleCheck,A),w+AN);L.delegate("click",AD.bind(A.toggleCheck,A),w+M);Ar.swallowEvent("dblclick");},check:function(){var L=this;var Ar=L.get(X);var A=L.get(Ad);Ar.addClass(AP);L.set(P,true);A.attr(P,P);L.fire("check");},uncheck:function(){var L=this;var Ar=L.get(X);var A=L.get(Ad);Ar.removeClass(AP);L.set(P,false);A.attr(P,p);L.fire("uncheck");},toggleCheck:function(){var L=this;var A=L.get(Ad);var Ar=A.attr(P);if(!Ar){L.check();}else{L.uncheck();}},isChecked:function(){var A=this;return A.get(P);}});AD.TreeNodeCheck=AZ;var d="child",q="tree-node-task",l="unchecked",Ae=function(A){return A instanceof AD.TreeNodeCheck;},AE=g(I,R,d,l);function Aq(A){Aq.superclass.constructor.apply(this,arguments);}AD.mix(Aq,{NAME:q});AD.extend(Aq,AD.TreeNodeCheck,{check:function(As){var L=this;var A=L.get(F);var Ar=L.get(X);Aq.superclass.check.apply(this,arguments);if(!As){Ar.removeClass(AE);L.eachParent(function(At){if(Ae(At)){var Au=false;At.check(true);At.get(X).addClass(AE);At.eachChildren(function(Av){if(Ae(Av)&&!Av.isChecked()){Au=true;}},true);if(!Au){At.get(X).removeClass(AE);}}});if(!L.isLeaf()){L.eachChildren(function(At){if(Ae(At)){At.check();}});}}},uncheck:function(){var A=this;var L=A.get(X);Aq.superclass.uncheck.apply(this,arguments);L.removeClass(AE);A.eachParent(function(Ar){if(Ae(Ar)&&Ar.isChecked()){Ar.get(X).addClass(AE);}});if(!A.isLeaf()){A.eachChildren(function(Ar){if(Ar instanceof AD.TreeNodeCheck){Ar.uncheck();}});}}});AD.TreeNodeTask=Aq;AD.TreeNode.nodeTypes={task:AD.TreeNodeTask,check:AD.TreeNodeCheck,node:AD.TreeNode,io:AD.TreeNodeIO};},"@VERSION@",{skinnable:false,requires:["aui-tree-data","io","json"]});AUI.add("aui-tree-view",function(a){var S=a.Lang,T=S.isString,AO="boundingBox",g="children",I="container",AA="content",s="contentBox",o=".",AD="file",AL="hitarea",w="icon",AQ="label",C="lastSelected",V="leaf",AS="node",AI="ownerTree",AM="root",B=" ",AB="tree",i="tree-view",e="type",k="view",r=function(){return Array.prototype.slice.call(arguments).join(B);},x=function(A){return(A instanceof a.TreeNode);},Q=a.ClassNameManager.getClassName,d=Q(AB,AL),U=Q(AB,w),P=Q(AB,AQ),q=Q(AB,AS,AA),h=Q(AB,AM,I),K=Q(AB,k,AA);function X(A){X.superclass.constructor.apply(this,arguments);}a.mix(X,{NAME:i,ATTRS:{type:{value:AD,validator:T},lastSelected:{value:null,validator:x},io:{value:null},paginator:{value:null}}});a.extend(X,a.TreeData,{CONTENT_TEMPLATE:"<ul></ul>",bindUI:function(){var A=this;A._delegateDOM();},renderUI:function(){var A=this;A._renderElements();},syncUI:function(){var A=this;A.refreshIndex();},registerNode:function(L){var A=this;L.set(AI,A);X.superclass.registerNode.apply(this,arguments);},_createFromHTMLMarkup:function(L){var A=this;L.all("> li").each(function(AZ){var AX=AZ.one("> *").remove();var AW=AX.outerHTML();docFrag=null;var Aa=new a.TreeNode({boundingBox:AZ,label:AW});var AV=AZ.one("> ul");if(AV){Aa.set(V,false);Aa.set(I,AV);Aa.render();A._createFromHTMLMarkup(AV);}else{Aa.render();}var AU=AZ.get(W).get(W);var AY=a.Widget.getByNode(AU);AY.appendChild(Aa);});},_renderElements:function(){var A=this;var L=A.get(s);var AU=A.get(g);var AV=A.get(e);var AW=Q(AB,AV);
L.addClass(K);A.set(I,L);L.addClass(r(AW,h));if(AU.length){A.eachChildren(function(AX){A.appendChild(AX,true);});}else{A._createFromHTMLMarkup(L);}},_delegateDOM:function(){var A=this;var L=A.get(AO);L.delegate("click",a.bind(A._onClickHitArea,A),o+d);L.delegate("dblclick",a.bind(A._onClickHitArea,A),o+U);L.delegate("dblclick",a.bind(A._onClickHitArea,A),o+P);L.delegate("mouseenter",a.bind(A._onMouseEnterNodeEl,A),o+q);L.delegate("mouseleave",a.bind(A._onMouseLeaveNodeEl,A),o+q);L.delegate("click",a.bind(A._onClickNodeEl,A),o+q);},_onClickNodeEl:function(L){var A=this;var AV=A.getNodeByChild(L.currentTarget);if(AV&&!AV.isSelected()){var AU=A.get(C);if(AU){AU.unselect();}AV.select();}},_onMouseEnterNodeEl:function(L){var A=this;var AU=A.getNodeByChild(L.currentTarget);if(AU){AU.over();}},_onMouseLeaveNodeEl:function(L){var A=this;var AU=A.getNodeByChild(L.currentTarget);if(AU){AU.out();}},_onClickHitArea:function(L){var A=this;var AU=A.getNodeByChild(L.currentTarget);if(AU){AU.toggle();}}});a.TreeView=X;var AT=S.isNumber,f="above",Z="append",AE="below",c="block",AJ="body",H="clearfix",AG="default",E="display",t="down",n="drag",Y="draggable",AP="dragCursor",O="dragNode",D="expanded",AH="helper",AF="insert",z="offsetHeight",W="parentNode",v="scrollDelay",M="state",AC="tree-drag-drop",j="up",N=a.DD.DDM,R=Q(AH,H),AN=Q(w),p=Q(AB,n,AH),J=Q(AB,n,AH,AA),b=Q(AB,n,AH,AQ),G=Q(AB,n,AF,f),AR=Q(AB,n,AF,Z),m=Q(AB,n,AF,AE),y=Q(AB,n,M,Z),l=Q(AB,n,M,AF,f),AK=Q(AB,n,M,AF,AE),F='<div class="'+p+'">'+'<div class="'+[J,R].join(B)+'">'+'<span class="'+AN+'"></span>'+'<span class="'+b+'"></span>'+"</div>"+"</div>";function u(A){u.superclass.constructor.apply(this,arguments);}a.mix(u,{NAME:AC,ATTRS:{helper:{value:null},scrollDelay:{value:100,validator:AT}}});a.extend(u,a.TreeView,{direction:AE,dropAction:null,lastY:0,node:null,nodeContent:null,bindUI:function(){var A=this;u.superclass.bindUI.apply(this,arguments);A._bindDragDrop();},renderUI:function(){var A=this;u.superclass.renderUI.apply(this,arguments);var L=a.Node.create(F).hide();a.get(AJ).append(L);A.set(AH,L);N.set(AP,AG);},_createDrag:function(AV){var L=this;if(!L.dragTimers){L.dragTimers=[];}if(!N.getDrag(AV)){var A=L.dragTimers;var AU=50*A.length;var AW=setTimeout(function(){if(!N.getDrag(AV)){var AX=new a.DD.Drag({bubbleTargets:L,node:AV,target:true}).plug(a.Plugin.DDProxy,{moveOnEnd:false,positionProxy:false,borderStyle:null}).plug(a.Plugin.DDNodeScroll,{scrollDelay:L.get(v),node:L.get(AO)});}a.Array.removeItem(A,AW);},AU);A.push(AW);}},_bindDragDrop:function(){var A=this;var L=A.get(AO);A._createDragInitHandler=a.bind(function(){A.eachChildren(function(AU){if(AU.get(Y)){A._createDrag(AU.get(s));}},true);L.detach("mouseover",A._createDragInitHandler);},A);L.on("mouseover",A._createDragInitHandler);A.after("insert",a.bind(A._afterAppend,A));A.after("append",a.bind(A._afterAppend,A));A.on("drag:align",A._onDragAlign);A.on("drag:start",A._onDragStart);A.on("drop:exit",A._onDropExit);A.on("drop:hit",A._onDropHit);A.on("drop:over",A._onDropOver);},_appendState:function(L){var A=this;A.dropAction=Z;A.get(AH).addClass(y);L.addClass(AR);},_goingDownState:function(L){var A=this;A.dropAction=AE;A.get(AH).addClass(AK);L.addClass(m);},_goingUpState:function(L){var A=this;A.dropAction=f;A.get(AH).addClass(l);L.addClass(G);},_resetState:function(L){var A=this;var AU=A.get(AH);AU.removeClass(y);AU.removeClass(l);AU.removeClass(AK);if(L){L.removeClass(G);L.removeClass(AR);L.removeClass(m);}},_updateNodeState:function(A){var Ad=this;var AZ=A.drag;var AW=A.drop;var L=AW.get(AS);var Ac=L.get(W);var AY=AZ.get(AS).get(W);var AV=a.Widget.getByNode(Ac);Ad._resetState(Ad.nodeContent);if(!AY.contains(Ac)){var Ae=L.get(z)/3;var AU=L.getY();var Ab=AU+Ae*1;var Aa=AU+Ae*2;var AX=AZ.mouseXY[1];if((AX>AU)&&(AX<Ab)){Ad._goingUpState(L);}else{if(AX>Aa){Ad._goingDownState(L);}else{if((AX>Ab)&&(AX<Aa)){if(AV&&!AV.isLeaf()){Ad._appendState(L);}else{if(Ad.direction==j){Ad._goingUpState(L);}else{Ad._goingDownState(L);}}}}}}Ad.nodeContent=L;},_afterAppend:function(L){var A=this;var AU=L.tree.node;if(AU.get(Y)){A._createDrag(AU.get(s));}},_onDragAlign:function(AU){var A=this;var L=A.lastY;var AV=AU.target.lastXY[1];if(AV!=L){A.direction=(AV<L)?j:t;}A.lastY=AV;},_onDragStart:function(AX){var A=this;var AV=AX.target;var AZ=AV.get(AS).get(W);var AU=a.Widget.getByNode(AZ);var AY=A.get(C);if(AY){AY.unselect();}AU.select();var AW=A.get(AH);var L=AW.query(o+b);AW.setStyle(E,c).show();L.html(AU.get(AQ));AV.set(O,AW);},_onDropOver:function(L){var A=this;A._updateNodeState(L);},_onDropHit:function(AW){var A=this;var AY=A.dropAction;var AX=AW.drag.get(AS).get(W);var AU=AW.drop.get(AS).get(W);var AZ=a.Widget.getByNode(AU);var AV=a.Widget.getByNode(AX);var L=A.getEventOutputMap(A);L.tree.dropNode=AZ;L.tree.dragNode=AV;if(AY==f){AZ.insertBefore(AV);A.bubbleEvent("dropInsert",L);}else{if(AY==AE){AZ.insertAfter(AV);A.bubbleEvent("dropInsert",L);}else{if(AY==Z){if(AZ&&!AZ.isLeaf()){AZ.appendChild(AV);if(!AZ.get(D)){AZ.expand();}A.bubbleEvent("dropAppend",L);}}}}A._resetState(A.nodeContent);A.bubbleEvent("drop",L);},_onDropExit:function(){var A=this;A.dropAction=null;A._resetState(A.nodeContent);}});a.TreeViewDD=u;},"@VERSION@",{skinnable:true,requires:["aui-tree-node","dd"]});AUI.add("aui-tree",function(B){},"@VERSION@",{use:["aui-tree-data","aui-tree-node","aui-tree-view"],skinnable:true});