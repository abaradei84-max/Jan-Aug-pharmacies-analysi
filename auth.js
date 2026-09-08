const AUTH_HASH='8c6366a7671b7c518c704f2c43bb5f07d8dafccc63cd537ad9a6f545a57f2f99';
const AUTH_KEY='pharmacy_dashboard_auth';

async function sha256(text){
  const data=new TextEncoder().encode(text);
  const digest=await crypto.subtle.digest('SHA-256',data);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
}

function unlockDashboard(){
  document.body.classList.remove('locked');
  document.body.classList.add('unlocked');
  const overlay=document.getElementById('loginOverlay');
  if(overlay) overlay.classList.add('auth-hidden');
}

function lockDashboard(){
  sessionStorage.removeItem(AUTH_KEY);
  document.body.classList.add('locked');
  document.body.classList.remove('unlocked');
  const overlay=document.getElementById('loginOverlay');
  if(overlay) overlay.classList.remove('auth-hidden');
  const input=document.getElementById('loginPassword');
  if(input){input.value='';setTimeout(()=>input.focus(),50)}
}

async function tryLogin(){
  const input=document.getElementById('loginPassword');
  const message=document.getElementById('loginMessage');
  const button=document.getElementById('loginButton');
  const password=input?.value||'';
  if(!password){
    if(message) message.textContent='Enter the password.';
    input?.focus();
    return;
  }
  if(button){button.disabled=true;button.textContent='Checking…'}
  try{
    const hash=await sha256(password);
    if(hash===AUTH_HASH){
      sessionStorage.setItem(AUTH_KEY,'1');
      if(message) message.textContent='';
      unlockDashboard();
    }else{
      if(message) message.textContent='Incorrect password. Please try again.';
      if(input){input.select();input.focus()}
    }
  }finally{
    if(button){button.disabled=false;button.textContent='Sign in'}
  }
}

window.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('loginForm');
  const logout=document.getElementById('logoutButton');
  form?.addEventListener('submit',e=>{e.preventDefault();tryLogin()});
  logout?.addEventListener('click',lockDashboard);
  if(sessionStorage.getItem(AUTH_KEY)==='1') unlockDashboard();
  else lockDashboard();
});
