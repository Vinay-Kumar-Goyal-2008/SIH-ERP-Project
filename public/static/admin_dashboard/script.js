let admshowcount = 0;
let studnuminfo = 0;

async function alldata() {
    document.querySelector('.main0').style.display = 'none';
    document.querySelector('.loadingdata').style.display = 'block';
    let allstudentsnum = await fetch('/admin/totalstudents', {
        method: 'POST'
    });
    allstudentsnum = await allstudentsnum.json();
    if (allstudentsnum.status === 200) {
        document.querySelector('.main0').style.display = 'block';
        document.querySelector('.loadingdata').style.display = 'none';
        document.querySelector('.totalstudents .value').innerText = allstudentsnum.num;
        document.querySelector('.totalfeescollected .value').innerText = allstudentsnum.amountpaid;
        document.querySelector('.totalpendingfees .value').innerText = allstudentsnum.amountdue;
    }
}

async function alladmissiondata() {
    document.querySelector('.main1').style.display = 'none';
    document.querySelector('.main2').style.display = 'none';
    document.querySelector('.loadingdata').style.display = 'block';

    let alladmissions = await fetch('/admin/admissionsdata', {
        method: 'POST'
    });
    alladmissions = await alladmissions.json();

    if (alladmissions.status === 200) {
        document.querySelector('.totalapplicants .value').innerText = alladmissions.num;
        document.querySelector('.pending .value').innerText = alladmissions.pending;

        admshowcount = 0;
        const tbody = document.querySelector('.admissionsstudentstable tbody');
        tbody.innerHTML = '';
        renderAdmissionRows(alladmissions.alldata, tbody, admshowcount);

        const table = document.querySelector('.admissionsstudentstable');
        if (!document.querySelector('.admshowmore')) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'action-button primary admshowmore';
            nextBtn.textContent = 'Next Page';
            table.appendChild(nextBtn);

            const prevBtn = document.createElement('button');
            prevBtn.id = 'admshowprev';
            prevBtn.className = 'action-button primary';
            prevBtn.textContent = 'Previous Page';
            table.appendChild(prevBtn);
        }

        table.addEventListener('click', (e) => {
            if (e.target.classList.contains('admshowmore')) {
                loadNextAdmissions(alladmissions.alldata);
            }
            if (e.target.id === 'admshowprev') {
                loadPrevAdmissions(alladmissions.alldata);
            }
        });

        document.querySelector('.nameidadmsearch').addEventListener('change', () => {
            const nameorid = document.querySelector('.nameidadmsearch').value;
            const student = alladmissions.alldata.find(s =>
                s.name === nameorid || s.student_id.toString() === nameorid
            );
            tbody.innerHTML = '';
            if (student) {
                tbody.innerHTML = generateAdmissionRow(student);
            } else {
                alert('Student not found');
            }
        });
        acceptEventListener()
        rejectEventListener()
        document.querySelector('.main1').style.display = 'block';
        document.querySelector('.main2').style.display = 'block';
        document.querySelector('.loadingdata').style.display = 'none';
    }
}

function renderAdmissionRows(data, tbody, startIndex) {
    tbody.innerHTML = '';
    let count = 0;
    for (let i = startIndex; i < data.length && count < 10; i++) {
        tbody.innerHTML += generateAdmissionRow(data[i]);
        count++;
    }
}

function generateAdmissionRow(student) {
    return `<tr>
        <td>${student.student_id}</td>
        <td>${student.name}</td>
        <td><span class="status-badge status-pending-review">${student.admission_status}</span></td>
        <td>${student.applied_on}</td>
        <td>
            <button class="action-button primary studentaccept" id="${student.student_id}">Accept</button>
            <button class="action-button danger studentreject" id="${student.student_id}">Reject</button>
        </td>
    </tr>`;
}

function loadNextAdmissions(data) {
    admshowcount += 10;
    if (admshowcount >= data.length) {
        admshowcount = data.length - 10;
        if (admshowcount < 0) admshowcount = 0;
    }
    const tbody = document.querySelector('.admissionsstudentstable tbody');
    renderAdmissionRows(data, tbody, admshowcount);
}

function loadPrevAdmissions(data) {
    admshowcount -= 10;
    if (admshowcount < 0) admshowcount = 0;
    const tbody = document.querySelector('.admissionsstudentstable tbody');
    renderAdmissionRows(data, tbody, admshowcount);
}

// Student information with proper pagination handling
async function studentinfo() {
    let iddata = document.querySelector('.main2 input').value;
    let branch = document.querySelector('.main2 .branch').value;
    let section = document.querySelector('.main2 .section').value;
    let semester = document.querySelector('.main2 .semester').value;

    let studdata = await fetch('/admin/studdata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: iddata,
            branch: branch,
            section: section,
            semester: semester
        })
    });
    studdata = await studdata.json();

    if (studdata.status === 200) {
        studnuminfo = 0;
        const tbody = document.querySelector('.main2 table tbody');
        tbody.innerHTML = '';
        renderStudentRows(studdata.founddata, tbody, studnuminfo);

        if (!document.querySelector('#admshowmore')) {
            const nextBtn = document.createElement('button');
            nextBtn.id = 'admshowmore';
            nextBtn.className = 'action-button primary';
            nextBtn.textContent = 'Next Page';
            tbody.appendChild(nextBtn);

            const prevBtn = document.createElement('button');
            prevBtn.className = 'action-button primary admshowprev';
            prevBtn.textContent = 'Previous Page';
            tbody.appendChild(prevBtn);
        }

        const table = document.querySelector('.main2 table');
        table.addEventListener('click', (e) => {
            if (e.target.id === 'admshowmore') {
                loadNextStudents(studdata.founddata);
            }
            if (e.target.classList.contains('admshowprev')) {
                loadPrevStudents(studdata.founddata);
            }
        });
    }
}

function renderStudentRows(data, tbody, startIndex) {
    tbody.innerHTML = '';
    let count = 0;
    for (let i = startIndex; i < data.length && count < 10; i++) {
        tbody.innerHTML += generateStudentRow(data[i]);
        count++;
    }
}

function generateStudentRow(student) {
    return `<tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.mobile}</td>
        <td>${student.gender}</td>
        <td>${student.branch}</td>
        <td>${student.section}</td>
    </tr>`;
}

function loadNextStudents(data) {
    studnuminfo += 10;
    if (studnuminfo >= data.length) {
        studnuminfo = data.length - 10;
        if (studnuminfo < 0) studnuminfo = 0;
    }
    const tbody = document.querySelector('.main2 table tbody');
    renderStudentRows(data, tbody, studnuminfo);
}

function loadPrevStudents(data) {
    studnuminfo -= 10;
    if (studnuminfo < 0) studnuminfo = 0;
    const tbody = document.querySelector('.main2 table tbody');
    renderStudentRows(data, tbody, studnuminfo);
}
async function acceptEventListener() {
    document.querySelectorAll('.studentaccept').forEach(async (e)=>{
        e.addEventListener('click',async ()=>{
        let studid=e.id
        let respadac=await fetch('/admin/addadmdata',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                tempid:studid
            })
        })
        respadac=await respadac.json()
        if (respadac.status==200){
            alert(`Student Admitted alloted hostel ${respadac.hostel}`)
            window.location.reload()
        }else{
            alert("Some error occured")
        }
    })
    })
}
async function rejectEventListener(){
     document.querySelectorAll('.studentreject').forEach(async (e)=>{
        e.addEventListener('click',async ()=>{
        let studid=e.id
         let respadac=await fetch('/admin/deladmdata',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                tempid:studid
            })
        })
        respadac=await respadac.json()
        if (respadac.status==200){
            alert("Data deleted")
            window.location.reload()
        }
    })})
}
async function hosteldata(){
    document.querySelector('.hostelstudidsubmit').addEventListener('click',async ()=>{
        let id=document.querySelector('.hostelstudidsearch').value
        let data=await fetch('/admin/hosteldataofstud',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:id
            })
        })
        data=await data.json()
        if (data.status==200){
            document.querySelector('.main4 .studhosteldata').innerHTML=`<div class="metric-card"><h2 class='studid' id='${data.id}'>${data.id}</h2><h2>${data.name}</h2><div class="value">${data.data.allocated_hostel}</div><div class="change positive">${data.data.allocated_room}</div></div>`
            document.querySelector('.main4 .edithosteldata').style.display='block'
        }
        document.querySelector('.main4 .edithosteldata').addEventListener('click',async ()=>{
            document.querySelector('.main4 .studhosteldata').classList.add('hide')
            document.querySelector('.main4 form').classList.remove('hide')
            document.querySelector('.main4 .edithosteldata').style.display='none'
            document.querySelector('.main4 form #allocated_hostel').value=data.data.allocated_hostel
            document.querySelector('.main4 form #allocated_room').value=data.data.allocated_room
        })
        document.querySelector('.main4 form').addEventListener('submit',async (req,res)=>{
            let dataresp=await fetch('/admin/edithosteldata',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:document.querySelector('.main4 .studhosteldata .studid').id,
                    hostel:document.querySelector('.main4 form #allocated_hostel').value,
                    room:document.querySelector('.main4 form #allocated_room').value
                })
            })
            dataresp=await dataresp.json()
            if (dataresp.status==200){
                alert("data updated")
                window.location.reload()
            }else{
                alert("Data cant be reloaded")
                window.location.reload()
            }
        })
    })
}
// Initialize data when page loads
alldata();
alladmissiondata();
hosteldata();
document.querySelector('.studinfosubmitt').addEventListener('click', studentinfo);
