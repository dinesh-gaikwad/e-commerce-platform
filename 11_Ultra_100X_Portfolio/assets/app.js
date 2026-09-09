
const q=document.querySelector('.search');
if(q){q.addEventListener('input',()=>{const v=q.value.toLowerCase();document.querySelectorAll('.card').forEach(c=>c.style.display=c.innerText.toLowerCase().includes(v)?'block':'none')})}
document.querySelectorAll('.bar').forEach((b,i)=>{setTimeout(()=>b.classList.add('loaded'),100+i*30)})
