(function(){
var Z={sitges:{n:'Sitges',occHigh:.75,occLow:.52,adrHigh:160,adrLow:104},garraf:{n:'Garraf / Vilanova',occHigh:.62,occLow:.41,adrHigh:110,adrLow:58},ribes:{n:'Sant Pere de Ribes',occHigh:.62,occLow:.4,adrHigh:100,adrLow:55}};
var HIGH=4,WA='34622448517';
function mult(g){return g<=2?.88:g<=4?1:g<=6?1.18:g<=8?1.32:1.42}
function part(m,o,a){var n=Math.round(m*30*o);return{nights:n,rev:n*a}}
function calc(z,g,m){var t=Z[z]||Z.sitges;m=Math.min(12,Math.max(4,m));var k=mult(g),ah=Math.round(t.adrHigh*k),al=Math.round(t.adrLow*k),o=Math.min(m,HIGH),c=part(o,t.occHigh,ah),l=part(m-o,t.occLow,al),u=c.nights+l.nights,d=c.rev+l.rev,f=part(HIGH,t.occHigh,ah);return{months:m,selected:d,high:f.rev,nights:u,nightsHigh:f.nights,occ:u/(m*30),occHigh:t.occHigh,adr:u?Math.round(d/u):ah,adrHigh:ah}}
var eur=function(v){return new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(v)},pct=function(v){return Math.round(v*100)+'%'};
var sec=document.getElementById('valora');if(!sec)return;var f=sec.querySelector('form'),sel=f.querySelectorAll('select'),rng=f.querySelectorAll('input[type=range]'),nm=f.querySelector('input[autocomplete=name],input[autoComplete=name]')||f.querySelector('input:not([type=range])'),as=f.querySelector('aside'),dl=as.querySelectorAll('dl > div'),tit=as.querySelectorAll('p')[1],copy=as.querySelector('button');
var zone=sel[0],lic=sel[1],pub=sel[2],g=rng[0],mo=rng[1];
function lbl(i,txt){var s=i.closest('label').querySelector('span span');if(s)s.textContent=txt}
function st(){var r=calc(zone.value,+g.value,+mo.value),name=zone.options[zone.selectedIndex].text;return{r:r,name:name}}
function render(){var x=st(),r=x.r;lbl(g,g.value+' personas');lbl(mo,mo.value+' meses');tit.textContent=x.name+', '+g.value+' personas';
var a=dl[0].querySelectorAll('dd');a[0].textContent=eur(r.high);a[1].textContent=pct(r.occHigh)+' · '+eur(r.adrHigh)+'/noche · '+r.nightsHigh+' noches';
var b=dl[1].querySelectorAll('dd');dl[1].querySelector('dt').textContent=r.months===12?'Año completo':'Con tus '+r.months+' meses';b[0].textContent=eur(r.selected);b[1].textContent=pct(r.occ)+' · '+eur(r.adr)+'/noche · '+r.nights+' noches'}
[zone,g,mo].forEach(function(e){e.addEventListener('input',render);e.addEventListener('change',render)});
copy.addEventListener('click',function(){var x=st(),r=x.r,t=['Informe orientativo · '+x.name,'Capacidad: '+g.value+' personas. Meses: '+mo.value+'.','Temporada alta (jun–sep): '+eur(r.high)+' · '+pct(r.occHigh)+' · '+eur(r.adrHigh)+'/noche · '+r.nightsHigh+' noches.',(r.months===12?'Año completo':'Con '+mo.value+' meses')+': '+eur(r.selected)+' · '+pct(r.occ)+' · '+eur(r.adr)+'/noche · '+r.nights+' noches.','Media de mercado, no una oferta ni un resultado de Holirentals.'].join('\n');
navigator.clipboard.writeText(t).then(function(){copy.textContent='Informe copiado';setTimeout(function(){copy.textContent='Copiar informe'},2000)}).catch(function(){})});
f.addEventListener('submit',function(e){e.preventDefault();var x=st(),r=x.r,L={si:'sí',no:'no'}[lic.value]||'no lo tengo claro',P=pub.value==='si'?'sí':'no',n=(nm&&nm.value||'').trim();
var m=['Hola Holirentals, quiero un análisis de mi vivienda en '+x.name+'.',n?'Me llamo '+n+'.':null,'Capacidad: '+g.value+' personas. Meses: '+mo.value+'. Licencia: '+L+'. Publicada: '+P+'.','La calculadora ya me da '+eur(r.high)+' en jun–sep y '+eur(r.selected)+' con '+mo.value+' meses.'].filter(Boolean).join(' ');
window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(m),'_blank','noopener')});
render();
})();
