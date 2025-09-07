
async function studentdata() {
    let student = await fetch('/student_data', {
        method: 'POST'
    })
    let res = await student.json()
    console.log(res)
    document.querySelector('.name').innerText = res.name + ' ' + res.id
    let attendancelist = res.attendence
    let attendancesum = 0;
    attendancelist.forEach(e => {
        attendancesum += e.percentage
    });
    document.querySelector('.card1text').innerHTML += `<b> Average </b> :- ${attendancesum / attendancelist.length}`
    let currsemmarks = res.marks[res.marks.length - 1]
    let semmarkssum = 0
    currsemmarks.sem_marks_total.forEach(ev => {
        semmarkssum += ev.sub_marks
    })
    document.querySelector('.card2text').innerHTML += `<b> Semester </b> - ${currsemmarks.semester} <br> <b>Average</b> - ${semmarkssum / currsemmarks.sem_marks_total.length} <br>`
    document.querySelector('.card3text').innerText += `${res.fees.amount_due}`
    const today = new Date();
    const hours = today.getHours();
    day = res.timetable[0]
    slots = ['day', `${hours} - ${hours + 1}`]
    console.log(slots[1])
    slotdict = { 'slot1': '8-9', 'slot2': '9-10', 'slot3': '10-11', 'slot4': '11-12', 'slot5': '12-13', 'slot6': '13-14', 'slot7': '14-15', 'slot8': '15-16', 'slot9': '16-17' }
    currslot = Object.keys(slotdict).find(e => { slotdict[e] == slots[2] })
    if (typeof currslot == 'undefined') {
        document.querySelector('.card4text').innerHTML += `${slots[0]} - ${day[slots[0]]} <br> No classes now`
    } else {
        document.querySelector('.card4text').innerHTML += `${slotdict[currslot]} - ${day[currslot]} <br>`
    }


    // document.querySelector('.card4text').innerText+=res.tiimetable[dayIndex-1]
    l = ['name', 'branch', 'section', 'mobile', 'email', 'gender', 'semester']
    l.forEach(e => {
        document.querySelector(`.profileview .${e}>.value`).innerText += res[`${e}`]
    })
    let qrcode = await fetch('/studentqrcode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: res.id
        })

    })
    qrcode = await qrcode.json()
    document.querySelector('.qrcode').innerHTML += `<img src='${qrcode.qr}' alt='qrcode'>`
    document.querySelector('.studentid').innerText += res.id
    document.querySelector('.name>.input>input').value = res.name
    document.querySelector('.gender>.input>input').value = res.gender
    document.querySelector('.email>.input>input').value = res.email
    document.querySelector('.mobile>.input>input').value = res.mobile
    attendancesubjectcount = 0
    res.attendence.forEach(e => {
        document.querySelector('.attendance').innerHTML += `<div class="attendancesubject${attendancesubjectcount + 1}">
                    <div class="subject">${e.subject}</div>
                    <div class="tl">${e.lectures_conducted}</div>
                    <div class="la">${e.lectures_attended}</div>
                    <div class="attendanceofsubject">${e.percentage}</div>
                </div>`
        if (parseInt(document.querySelector(`.attendancesubject${attendancesubjectcount + 1} .attendanceofsubject`).innerText) < 75) {
            document.querySelector(`.attendancesubject${attendancesubjectcount + 1}`).classList.add('low-attendance')
            document.querySelector('.lowattendance').innerHTML += `You have a low attendance in ${e.subject}. To complete this you have to attend atleast ${Math.round(((75 / 100) * e.total_lectures) - e.lectures_attended)} more lectures. <br><br>`
        }
        attendancesubjectcount += 1
    })
    let resp = await (await fetch('/graph')).json()
    document.querySelector('.attendancegraph').innerHTML += `<img src=data:image/png;base64,${resp.graph} alt='graph'>`
    res.marks.forEach(e => {
        document.querySelector('.marks').innerHTML += `<h2>Semester- ${e.semester}</h2>`
        e.sem_marks_total.forEach((f) => {
            document.querySelector('.marks').innerHTML += `<div class="marksubject marksvalue" id="${f.subject}"><div>${f.subject}</div>  <div>${f.sub_marks}</div></div>`
            if (f.sub_marks < 33) {
                document.getElementById(`${f.subject}`).classList.add('low-marks')
            }
        })
    })
    res.timetable.forEach(e => {
        document.querySelector(`.${(e.day)}`).innerHTML += `<td>${e.day}</td>
        <td>${e.slot1}</td>
        <td>${e.slot2}</td>
        <td>${e.slot3}</td>
        <td>${e.slot4}</td>
        <td>${e.slot5}</td>
        <td>${e.slot6}</td>
        <td>${e.slot7}</td>
        <td>${e.slot8}</td>
        <td>${e.slot9}</td>
        `
    })
    res.fees.payment_history.forEach(e => {
        document.querySelector('.feestable>table').innerHTML += `<tbody class='txn${e.transaction_id}'>
        <td>${e.amount}</td>
        <td>${e.semester}</td>
        <td>${e.transaction_status}</td>
        <td>${e.transaction_id}</td>
        <td><button id='txn${e.transaction_id}'>Print</button></td>
        </tbody>`

    })
    res.fees.payment_history.forEach(e => {
        document.getElementById(`txn${e.transaction_id}`).addEventListener('click', async () => {
            let pdf = await fetch('/downloadreceipt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    txnid: e.transaction_id,
                    studentname: res.name,
                    studentid: res.id,
                    semester: e.semester,
                    amount: e.amount,
                    txnstatus: e.transaction_status
                })

            })
            const blob = await pdf.blob();
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        })
    })
    document.querySelector('.pendingfeesamount').innerText = res.fees.amount_due
    document.querySelector('.pendingfeespaymentbutton').addEventListener('click', async () => {
        if (res.fees.amount_due == 0) {
            alert('fees already paid')
        } else {


            let feesdata = await fetch('/payfees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: res.id,
                    semester: res.semester,
                    previd: res.fees.payment_history[res.fees.payment_history.length - 1].transaction_id,
                    amount: res.fees.amount_due
                })
            })
            feesdata = await feesdata.json()
            if (feesdata.status == 200) {
                alert('Fees Paid')
            } else {
                alert('Some Error Occurred. Please Try again later')
            }
            window.location.reload()
        }
    })
    res.library.borrowed_books.forEach(e => {
        let ind = res.library.borrowed_books.indexOf(e)
        document.querySelector('.librarytable table').innerHTML += `<td>${e}</td><td>${res.library.due_date[ind]}</td`
    })
    document.querySelector('.allocatedhostelvalue').innerText += res.hostel.allocated_hostel
    document.querySelector('.allocatedroomvalue').innerText += res.hostel.allocated_room
    document.querySelector('.logout>button').addEventListener('click', async () => {
        let logoutdata = await fetch('/logout', {
            method: 'POST'
        })
        logoutdata = await logoutdata.json()
        if (logoutdata.status == 200) {
            alert('Request Accepted')
            window.location.href = '/student_login'
        }

    })
    let attendanceqr = await fetch('/attendanceqrcode', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:res.id
        })
    })
    attendanceqr = await attendanceqr.json()
    document.querySelector('.attendanceqrcode').innerHTML = `<img src='${attendanceqr.url}' alt='attendance qr'>`
    setInterval(async () => {
        let attendanceqr = await fetch('/attendanceqrcode', {
            method: 'POST',
            headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:res.id
        })
        })
        attendanceqr = await attendanceqr.json()
        document.querySelector('.attendanceqrcode').innerHTML = `<img src='${attendanceqr.url}' alt='attendance qr'>`
    }, 10000)

}
studentdata()

document.querySelector('.editprofilebutton>button').addEventListener('click', () => {
    document.querySelector('.profileview').classList.add('hide')
    document.querySelector('.editprofileform').classList.remove('hide')
})

document.querySelector('.editprofileform>form').addEventListener('submit', async (e) => {
    e.preventDefault()
    let name = document.querySelector('form .name input').value
    let gender = document.querySelector('form .gender input').value
    let email = document.querySelector('form .email input').value
    let mobile = document.querySelector('form .mobile input').value
    if (mobile.length != 10) {
        alert('Please Enter a correct mobile number')
    } else {
        let data = await fetch('/editprofiledata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                gender: gender,
                email: email,
                mobile: parseInt(mobile)
            })
        })
        let res = await data.json()
        if (res.status == 200) {
            alert('User Data Updated Successfully')
        } else {
            alert('Data cant be updated due to some error. Please try again later')
        }
        window.location.reload()
    }
})

document.querySelectorAll('.quicklinkslist>li').forEach(e => {
    document.getElementById(e.id).addEventListener('click', () => {
        document.querySelector(`.${e.id}`).scrollIntoView({
            behavior: 'smooth'
        })
    })
})

document.querySelector('#documents').addEventListener('click', () => {
    window.location.href = 'https://accounts.digitallocker.gov.in/signin/oauth_partner/%2Foauth2%2F1%2Fauthorize'
})

const chatbotBody = document.getElementById('chatbotBody');
const messagesDiv = document.getElementById('messages');

function toggleChat() {
  chatbotBody.style.display = chatbotBody.style.display === 'flex' ? 'none' : 'flex';
}

async function sendMessage(){
    prompt= document.querySelector('#userInput').value
    let ans=await fetch('/askchatbot',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            prompt:prompt
        })
    })
    ans=await ans.json()
    document.querySelector('.answerofchatbot').innerText=ans.ans
}