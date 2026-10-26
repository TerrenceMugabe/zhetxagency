'use strict';
// Set only to the confirmed business WhatsApp number, international digits only.
const CONTACT = Object.freeze({email:'hello@zhetx.co.za', whatsapp:'27655811001'});
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');closeServices();}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));});
document.addEventListener('click',e=>{if(!e.target.closest('header'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus();}});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
window.matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
document.querySelectorAll('details').forEach(el=>el.addEventListener('toggle',()=>{if(el.open)document.querySelectorAll('details').forEach(other=>{if(other!==el)other.open=false;});}));
const form=document.querySelector('#enquiry-form');
if(form){
 const service=new URLSearchParams(location.search).get('service');if([...form.elements.service.options].some(x=>x.value===service))form.elements.service.value=service;
 const status=document.querySelector('#form-status');
 function enquiry(){const d=new FormData(form);return `Hi Zhetx Agency,\n\nName: ${d.get('name').trim()}\nBusiness: ${d.get('business').trim()}\nEmail: ${d.get('email').trim()}\nPhone: ${d.get('phone').trim()||'Not provided'}\nService: ${form.elements.service.selectedOptions[0].textContent}\nWebsite: ${d.get('website').trim()||'Not provided'}\nBudget: ${d.get('budget')||'To discuss'}\nTiming: ${d.get('timing')||'Still planning'}\n\nProject details:\n${d.get('message').trim()}`;}
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const message=enquiry();document.querySelector('#enquiry-copy').value=message;document.querySelector('#email-fallback').hidden=false;status.textContent='Your email draft is ready. Send it from your email app to complete your enquiry.';location.href=`mailto:${CONTACT.email}?subject=${encodeURIComponent('Project enquiry — '+form.elements.business.value.trim())}&body=${encodeURIComponent(message)}`;});
 document.querySelector('#whatsapp-send').addEventListener('click',()=>{if(!form.reportValidity())return;if(!/^\d{8,15}$/.test(CONTACT.whatsapp)){status.textContent='WhatsApp enquiries are being connected. Please use the email option above to contact us.';return;}window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(enquiry())}`,'_blank','noopener,noreferrer');status.textContent='Your WhatsApp draft is ready. Press send in WhatsApp to complete your enquiry.';});
 document.querySelector('#copy-enquiry').addEventListener('click',async()=>{const text=document.querySelector('#enquiry-copy');try{await navigator.clipboard.writeText(text.value);status.textContent='Enquiry copied. Paste it into an email to hello@zhetx.co.za.';}catch{text.focus();text.select();status.textContent='Select and copy the enquiry below.';}});
}
// Keyboard and touch friendly services disclosure.
const servicesToggle=document.querySelector('.services-toggle');
const servicesMenu=document.querySelector('#services-menu');
function closeServices(){if(servicesMenu)servicesMenu.hidden=true;servicesToggle?.setAttribute('aria-expanded','false');}
servicesToggle?.addEventListener('click',()=>{const expanded=servicesToggle.getAttribute('aria-expanded')==='true';servicesMenu.hidden=expanded;servicesToggle.setAttribute('aria-expanded',String(!expanded));});
document.addEventListener('click',e=>{if(!e.target.closest('.services-nav'))closeServices();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&servicesMenu&&!servicesMenu.hidden){closeServices();servicesToggle.focus();}});
// Case index filters retain direct, crawlable project links.
document.querySelectorAll('[data-work-filter]').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.workFilter;let visible=0;document.querySelectorAll('[data-work-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-work-category]').forEach(row=>{row.hidden=filter!=='all'&&row.dataset.workCategory!==filter;if(!row.hidden)visible++;});const count=document.querySelector('.work-count');if(count)count.textContent=`Showing ${visible} selected experience ${visible===1?'overview':'overviews'}`;}));
