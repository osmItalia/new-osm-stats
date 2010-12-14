(function(b){b.fn.ajaxSubmit=function(l){if(!this.length){a("ajaxSubmit: skipping submit process - no element selected");return this}if(typeof l=="function"){l={success:l}}var d=this.attr("action")||window.location.href;d=(d.match(/^([^#]+)/)||[])[1];d=d||"";l=b.extend({url:d,type:this.attr("method")||"GET"},l||{});var s={};this.trigger("form-pre-serialize",[this,l,s]);if(s.veto){a("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this}if(l.beforeSerialize&&l.beforeSerialize(this,l)===false){a("ajaxSubmit: submit aborted via beforeSerialize callback");return this}var m=this.formToArray(l.semantic);if(l.data){l.extraData=l.data;for(var g in l.data){if(l.data[g] instanceof Array){for(var h in l.data[g]){m.push({name:g,value:l.data[g][h]})}}else{m.push({name:g,value:l.data[g]})}}}if(l.beforeSubmit&&l.beforeSubmit(m,this,l)===false){a("ajaxSubmit: submit aborted via beforeSubmit callback");return this}this.trigger("form-submit-validate",[m,this,l,s]);if(s.veto){a("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this}var e=b.param(m);if(l.type.toUpperCase()=="GET"){l.url+=(l.url.indexOf("?")>=0?"&":"?")+e;l.data=null}else{l.data=e}var t=this,f=[];if(l.resetForm){f.push(function(){t.resetForm()})}if(l.clearForm){f.push(function(){t.clearForm()})}if(!l.dataType&&l.target){var p=l.success||function(){};f.push(function(j){b(l.target).html(j).each(p,arguments)})}else{if(l.success){f.push(l.success)}}l.success=function(q,n){for(var k=0,j=f.length;k<j;k++){f[k].apply(l,[q,n,t])}};var c=b("input:file",this).fieldValue();var r=false;for(var i=0;i<c.length;i++){if(c[i]){r=true}}if(l.iframe||r){if(l.closeKeepAlive){b.get(l.closeKeepAlive,o)}else{o()}}else{b.ajax(l)}this.trigger("form-submit-notify",[this,l]);return this;function o(){var q=t[0];if(b(":input[name=submit]",q).length){alert('Error: Form elements must not be named "submit".');return}var k=b.extend({},b.ajaxSettings,l);var F=b.extend(true,{},b.extend(true,{},b.ajaxSettings),k);var u="jqFormIO"+(new Date().getTime());var A=b('<iframe id="'+u+'" name="'+u+'" src="about:blank" />');var C=A[0];A.css({position:"absolute",top:"-1000px",left:"-1000px"});var E={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){this.aborted=1;A.attr("src","about:blank")}};var B=k.global;if(B&&!b.active++){b.event.trigger("ajaxStart")}if(B){b.event.trigger("ajaxSend",[E,k])}if(F.beforeSend&&F.beforeSend(E,F)===false){F.global&&b.active--;return}if(E.aborted){return}var D=0;var z=0;var j=q.clk;if(j){var v=j.name;if(v&&!j.disabled){l.extraData=l.extraData||{};l.extraData[v]=j.value;if(j.type=="image"){l.extraData[name+".x"]=q.clk_x;l.extraData[name+".y"]=q.clk_y}}}setTimeout(function(){var I=t.attr("target"),G=t.attr("action");q.setAttribute("target",u);if(q.getAttribute("method")!="POST"){q.setAttribute("method","POST")}if(q.getAttribute("action")!=k.url){q.setAttribute("action",k.url)}if(!l.skipEncodingOverride){t.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"})}if(k.timeout){setTimeout(function(){z=true;w()},k.timeout)}var H=[];try{if(l.extraData){for(var J in l.extraData){H.push(b('<input type="hidden" name="'+J+'" value="'+l.extraData[J]+'" />').appendTo(q)[0])}}A.appendTo("body");C.attachEvent?C.attachEvent("onload",w):C.addEventListener("load",w,false);q.submit()}finally{q.setAttribute("action",G);I?q.setAttribute("target",I):t.removeAttr("target");b(H).remove()}},10);var x=0;function w(){if(D++){return}C.detachEvent?C.detachEvent("onload",w):C.removeEventListener("load",w,false);var G=true;try{if(z){throw"timeout"}var H,J;J=C.contentWindow?C.contentWindow.document:C.contentDocument?C.contentDocument:C.document;if((J.body==null||J.body.innerHTML=="")&&!x){x=1;D--;setTimeout(w,100);return}E.responseText=J.body?J.body.innerHTML:null;E.responseXML=J.XMLDocument?J.XMLDocument:J;E.getResponseHeader=function(K){var L={"content-type":k.dataType};return L[K]};if(k.dataType=="json"||k.dataType=="script"){var n=J.getElementsByTagName("textarea")[0];E.responseText=n?n.value:E.responseText}else{if(k.dataType=="xml"&&!E.responseXML&&E.responseText!=null){E.responseXML=y(E.responseText)}}H=b.httpData(E,k.dataType)}catch(I){G=false;b.handleError(k,E,"error",I)}if(G){k.success(H,"success");if(B){b.event.trigger("ajaxSuccess",[E,k])}}if(B){b.event.trigger("ajaxComplete",[E,k])}if(B&&!--b.active){b.event.trigger("ajaxStop")}if(k.complete){k.complete(E,G?"success":"error")}setTimeout(function(){A.remove();E.responseXML=null},100)}function y(n,G){if(window.ActiveXObject){G=new ActiveXObject("Microsoft.XMLDOM");G.async="false";G.loadXML(n)}else{G=(new DOMParser()).parseFromString(n,"text/xml")}return(G&&G.documentElement&&G.documentElement.tagName!="parsererror")?G:null}}};b.fn.ajaxForm=function(c){return this.ajaxFormUnbind().bind("submit.form-plugin",function(){b(this).ajaxSubmit(c);return false}).each(function(){b(":submit,input:image",this).bind("click.form-plugin",function(f){var d=this.form;d.clk=this;if(this.type=="image"){if(f.offsetX!=undefined){d.clk_x=f.offsetX;d.clk_y=f.offsetY}else{if(typeof b.fn.offset=="function"){var g=b(this).offset();d.clk_x=f.pageX-g.left;d.clk_y=f.pageY-g.top}else{d.clk_x=f.pageX-this.offsetLeft;d.clk_y=f.pageY-this.offsetTop}}}setTimeout(function(){d.clk=d.clk_x=d.clk_y=null},10)})})};b.fn.ajaxFormUnbind=function(){this.unbind("submit.form-plugin");return this.each(function(){b(":submit,input:image",this).unbind("click.form-plugin")})};b.fn.formToArray=function(q){var p=[];if(this.length==0){return p}var d=this[0];var k=q?d.getElementsByTagName("*"):d.elements;if(!k){return p}for(var l=0,m=k.length;l<m;l++){var e=k[l];var g=e.name;if(!g){continue}if(q&&d.clk&&e.type=="image"){if(!e.disabled&&d.clk==e){p.push({name:g+".x",value:d.clk_x},{name:g+".y",value:d.clk_y})}continue}var r=b.fieldValue(e,true);if(r&&r.constructor==Array){for(var h=0,c=r.length;h<c;h++){p.push({name:g,value:r[h]})}}else{if(r!==null&&typeof r!="undefined"){p.push({name:g,value:r})}}}if(!q&&d.clk){var f=d.getElementsByTagName("input");for(var l=0,m=f.length;l<m;l++){var o=f[l];var g=o.name;if(g&&!o.disabled&&o.type=="image"&&d.clk==o){p.push({name:g+".x",value:d.clk_x},{name:g+".y",value:d.clk_y})}}}return p};b.fn.formSerialize=function(c){return b.param(this.formToArray(c))};b.fn.fieldSerialize=function(d){var c=[];this.each(function(){var h=this.name;if(!h){return}var f=b.fieldValue(this,d);if(f&&f.constructor==Array){for(var g=0,e=f.length;g<e;g++){c.push({name:h,value:f[g]})}}else{if(f!==null&&typeof f!="undefined"){c.push({name:this.name,value:f})}}});return b.param(c)};b.fn.fieldValue=function(g){for(var h=[],e=0,c=this.length;e<c;e++){var f=this[e];var d=b.fieldValue(f,g);if(d===null||typeof d=="undefined"||(d.constructor==Array&&!d.length)){continue}d.constructor==Array?b.merge(h,d):h.push(d)}return h};b.fieldValue=function(d,e){var f=d.name,p=d.type,q=d.tagName.toLowerCase();if(typeof e=="undefined"){e=true}if(e&&(!f||d.disabled||p=="reset"||p=="button"||(p=="checkbox"||p=="radio")&&!d.checked||(p=="submit"||p=="image")&&d.form&&d.form.clk!=d||q=="select"&&d.selectedIndex==-1)){return null}if(q=="select"){var k=d.selectedIndex;if(k<0){return null}var m=[],c=d.options;var h=(p=="select-one");var l=(h?k+1:c.length);for(var g=(h?k:0);g<l;g++){var j=c[g];if(j.selected){var o=j.value;if(!o){o=(j.attributes&&j.attributes.value&&!(j.attributes.value.specified))?j.text:j.value}if(h){return o}m.push(o)}}return m}return d.value};b.fn.clearForm=function(){return this.each(function(){b("input,select,textarea",this).clearFields()})};b.fn.clearFields=b.fn.clearInputs=function(){return this.each(function(){var d=this.type,c=this.tagName.toLowerCase();if(d=="text"||d=="password"||c=="textarea"){this.value=""}else{if(d=="checkbox"||d=="radio"){this.checked=false}else{if(c=="select"){this.selectedIndex=-1}}}})};b.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset()}})};b.fn.enable=function(c){if(c==undefined){c=true}return this.each(function(){this.disabled=!c})};b.fn.selected=function(c){if(c==undefined){c=true}return this.each(function(){var d=this.type;if(d=="checkbox"||d=="radio"){this.checked=c}else{if(this.tagName.toLowerCase()=="option"){var e=b(this).parent("select");if(c&&e[0]&&e[0].type=="select-one"){e.find("option").selected(false)}this.selected=c}}})};function a(){if(b.fn.ajaxSubmit.debug&&window.console&&window.console.log){window.console.log("[jquery.form] "+Array.prototype.join.call(arguments,""))}}})(jQuery);