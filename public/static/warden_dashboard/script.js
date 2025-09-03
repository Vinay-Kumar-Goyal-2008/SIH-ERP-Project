async function wardendata() {
    let wardendata = await fetch('/wardendatafetch', {
        method: "POST"
    })
    wardendata = await wardendata.json()
    document.querySelector('.wardennamevalue').innerText = wardendata.name
    console.log(wardendata)

    let numstudents = await fetch('/countstudents', {
        method: 'POST'
    })
    numstudents = await numstudents.json()
    document.querySelector('.totalstudents .card-value').innerText = numstudents.countstud
    let numroomsandhostels = await fetch('/countroomsandhostel', {
        method: 'POST'
    })
    numroomsandhostels = await numroomsandhostels.json()
    document.querySelector('.totalrooms .card-value').innerText = numroomsandhostels.count_rooms
    document.querySelector('.totalhostels .card-value').innerText = numroomsandhostels.count_hostels
    let uniquehostels = await fetch('/uniquehostels', {
        method: "POST"
    })
    uniquehostels = await uniquehostels.json()
    uniquehostels.hostels.forEach(element => {
        if (element != '') {
            document.querySelector('.uniquehostels ol').innerHTML += `<li>${element.trim()}</li>`
        }
    });



}

wardendata()
document.querySelector('.main3 .searchstudentform').addEventListener('submit', async (e) => {
    e.preventDefault()
    let studentdata = await fetch('/findstudentdata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.querySelector('.main3 .idsearch input').value
        })
    })
    studentdata = await studentdata.json()
    if (studentdata.status == 200) {
        document.querySelector('.main3 table tbody').innerHTML = `
        <td>${studentdata.studentdata.id}</td>
        <td>${studentdata.studentdata.name}</td>
        <td>${studentdata.studentdata.branch}</td>
        <td>${studentdata.studentdata.email}</td>
        <td>${studentdata.studentdata.mobile}</td>
        <td><img src='data:image/png;base64,${studentdata.studentdata.digi_id.qr_code}'></td>`
        console.log(studentdata.studentdata.digi_id.qr_code)
        document.querySelector('.main3 .studentdata').style.display = 'block'
    } else {
        alert('Invalid Data')
    }
})
document.querySelector('.main2 .searchstudentform').addEventListener('submit', async (e) => {
    e.preventDefault()
    let studentdata = await fetch('/findstudentdata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.querySelector('.main2 .idsearch input').value
        })
    })
    studentdata = await studentdata.json()
    if (studentdata.status = 200) {
        document.querySelector('.main2 .table-container tbody').innerHTML = `
        <td>${studentdata.studentdata.id}</td>
        <td>${studentdata.studentdata.name}</td>
        <td>${studentdata.studentdata.hostel.allocated_hostel}</td>
        <td>${studentdata.studentdata.hostel.allocated_room}</td>
        `
        document.querySelector('.main2 .table-container').classList.remove('hide')
    } else {
        alert('student not found')
    }

})

document.querySelector('.editstudenthostelform').addEventListener('submit',async (e)=>{
    e.preventDefault()
    let studid=document.querySelector('.editstudenthostelform input').value
    let studentdata = await fetch('/findstudentdata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.querySelector('.main4 input').value
        })
    })
    studentdata = await studentdata.json()
    if (studentdata.status==200){
        document.querySelector('.main4 table tbody').innerHTML=`
        <td id='id'>${studentdata.studentdata.id}</td>
        <td>${studentdata.studentdata.name}</td>
        <td><input type='text' value='${studentdata.studentdata.hostel.allocated_hostel}' id='allocatedroom'></td>
        <td><input type='text' value='${studentdata.studentdata.hostel.allocated_room}' id='allocatedhostel'></td>`
        document.querySelector('.editstudenthostelform button').disabled=true
        document.querySelector('.editstudentsdatahostel').classList.remove('hide')
    }else{
        alert('Wrong data input')
    }
})

document.querySelector('.changeddatasubmitbutton button').addEventListener('click',async ()=>{
    allocated_hostel=document.querySelector('#allocatedhostel').value
    allocated_room=document.querySelector('#allocatedroom').value
    let res=await fetch('/updatehosteldata',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:document.querySelector('td#id').value,
            allocated_hostel:allocated_hostel,
            allocated_room:allocated_room
        })
    })
    res=await res.json()
    if (res.status==200){
        alert('Data Updated')
    }else{
        alert('Data cant be updated')
    }
    window.location.reload()
})