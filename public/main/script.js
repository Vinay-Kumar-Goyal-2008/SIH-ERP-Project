document.querySelector('#admin').addEventListener('click',()=>{
    window.location.href='/admin_login'
})
document.querySelector('#student').addEventListener('click',()=>{
    window.location.href='/student_login'
})

document.querySelector('.loginbutton button').addEventListener('click',()=>{
    window.location.href='/student_login'
})

document.querySelector('#home').addEventListener('click',()=>{
    window.location.href='/'
})

async function announcementdata() {
    let announcementdata=await fetch('/announcement_data')
    announcementdata=await announcementdata.json()
    if (announcementdata.status==200){
        announcementdata.data.forEach(e => {
            document.querySelector('.announcements .announcement-list').innerHTML+=`<div class="announcement-item">
                    <h4>${e.announcement.date}</h4>
                    <p>${e.announcement.desc}</p>
                </div>`
        });
        
    }
}

announcementdata()