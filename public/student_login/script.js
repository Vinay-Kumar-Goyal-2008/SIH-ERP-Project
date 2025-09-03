document.querySelector('li').addEventListener('click',async ()=>{
    window.location.href='/'
})
document.querySelector('#viewpass').addEventListener('click',()=>{
    document.querySelector('#password').type='text'
    document.querySelector('#viewpass').style.display='none'
    document.querySelector('#hidepass').style.display='block'
})
document.querySelector('#hidepass').addEventListener('click',()=>{
    document.querySelector('#password').type='password'
    document.querySelector('#hidepass').style.display='none'
    document.querySelector('#viewpass').style.display='block'
})

document.querySelector('form').addEventListener('submit',async (e)=>{
    e.preventDefault()
    res= await fetch('/loginsubmitcheck',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username:document.querySelector('#username').value,
            password:document.querySelector('#password').value
        })
    }).then(res => {
  if (res.redirected) {
    window.location.href = res.url;
  }else{
    alert('Data cant be found')
    window.location.reload()
  }
})
    if (res.json.status==404){
        alert('Wrong input')
        window.location.reload()
    }
})