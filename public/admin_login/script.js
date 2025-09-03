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
    let username=document.querySelector('.username input').value
    let password=document.querySelector('.password input').value
    let res=await fetch('/adminloginsubmitcheck',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username:username,
            password:password
        })
    }).then(resp=>{
        if (resp.redirected){
            window.location.href=resp.url
        }else{
            alert('Data Cant be found Please try again')
            window.location.reload()
        }
    })
})