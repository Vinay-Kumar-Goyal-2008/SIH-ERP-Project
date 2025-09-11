let admshowcount = 0;
let studnuminfo = 0;

async function alldata() {
    let allstudentsnum = await fetch('/admin/totalstudents', {
        method: 'POST'
    });
    allstudentsnum = await allstudentsnum.json();
    if (allstudentsnum.status === 200) {
        document.querySelector('.totalstudents .value').innerText = allstudentsnum.num;
        document.querySelector('.totalfeescollected .value').innerText = allstudentsnum.amountpaid;
        document.querySelector('.totalpendingfees .value').innerText = allstudentsnum.amountdue;
    }
}

async function alladmissiondata() {

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
    }
}

function renderAdmissionRows(data, tbody, startIndex) {
    tbody.innerHTML = '';
    let count = 0;
    for (let i = startIndex; i < data.length && count < 30; i++) {
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
    admshowcount += 30;
    if (admshowcount >= data.length) {
        admshowcount = data.length - 30;
        if (admshowcount < 0) admshowcount = 0;
    }
    const tbody = document.querySelector('.admissionsstudentstable tbody');
    renderAdmissionRows(data, tbody, admshowcount);
}

function loadPrevAdmissions(data) {
    admshowcount -= 30;
    if (admshowcount < 0) admshowcount = 0;
    const tbody = document.querySelector('.admissionsstudentstable tbody');
    renderAdmissionRows(data, tbody, admshowcount);
}

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
    document.querySelectorAll('.studentaccept').forEach(async (e) => {
        e.addEventListener('click', async () => {
            let studid = e.id
            let respadac = await fetch('/admin/addadmdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tempid: studid
                })
            })
            respadac = await respadac.json()
            if (respadac.status == 200) {
                alert(`Student Admitted alloted hostel ${respadac.hostel}`)
                window.location.reload()
            } else {
                alert("Some error occured")
            }
        })
    })
}
async function rejectEventListener() {
    document.querySelectorAll('.studentreject').forEach(async (e) => {
        e.addEventListener('click', async () => {
            let studid = e.id
            let respadac = await fetch('/admin/deladmdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tempid: studid
                })
            })
            respadac = await respadac.json()
            if (respadac.status == 200) {
                alert("Data deleted")
                window.location.reload()
            }
        })
    })
}
async function hosteldata() {
    document.querySelector('.hostelstudidsubmit').addEventListener('click', async () => {
        let id = document.querySelector('.hostelstudidsearch').value
        let data = await fetch('/admin/hosteldataofstud', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        data = await data.json()
        if (data.status == 200) {
            document.querySelector('.main4 .studhosteldata').innerHTML = `<div class="metric-card"><h2 class='studid' id='${data.id}'>${data.id}</h2><h2>${data.name}</h2><div class="value">${data.data.allocated_hostel}</div><div class="change positive">${data.data.allocated_room}</div></div>`
            document.querySelector('.main4 .edithosteldata').style.display = 'block'
        }
        document.querySelector('.main4 .edithosteldata').addEventListener('click', async () => {
            document.querySelector('.main4 .studhosteldata').classList.add('hide')
            document.querySelector('.main4 form').classList.remove('hide')
            document.querySelector('.main4 .edithosteldata').style.display = 'none'
            document.querySelector('.main4 form #allocated_hostel').value = data.data.allocated_hostel
            document.querySelector('.main4 form #allocated_room').value = data.data.allocated_room
        })
        document.querySelector('.main4 form').addEventListener('submit', async (req, res) => {
            let dataresp = await fetch('/admin/edithosteldata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: document.querySelector('.main4 .studhosteldata .studid').id,
                    hostel: document.querySelector('.main4 form #allocated_hostel').value,
                    room: document.querySelector('.main4 form #allocated_room').value
                })
            })
            dataresp = await dataresp.json()
            if (dataresp.status == 200) {
                alert("data updated")
                window.location.reload()
            } else {
                alert("Data cant be reloaded")
                window.location.reload()
            }
        })
    })
}

async function librarydata() {
    document.querySelector('.libsearchbystudidbutton').addEventListener('click', async (req, res) => {
        let id = document.querySelector('.libsearchbystudid').value
        let studdata = await fetch('/admin/libdataofstudent', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studid: id
            })
        })
        studdata = await studdata.json()
        if (studdata.status == 200) {
            document.querySelector('.main5 .library-tbody').innerHTML = ''
            studdata.borrowed_books.forEach(e => {
                document.querySelector('.main5 .library-tbody').innerHTML += `<tr><td>${studdata.id}</td>
                <td>${studdata.name}</td>
                <td>${e}</td>
                <td>${studdata.due_data[studdata.borrowed_books.indexOf(e)]}</td>
                <td>${Math.max(0, Math.floor((Date.now() - studdata.due_data[studdata.borrowed_books.indexOf(e)]) / (1000 * 60 * 60 * 24)) * 10)}</td>
                <td><button class="action-button primary studentreturn ${e} ${studdata.id}">Return</button></td></tr>`
                document.querySelectorAll('.main5 .studentreturn').forEach(e => {
                    e.addEventListener('click', async () => {
                        let id = e.classList[e.classList.length - 1]
                        let bookname = e.classList[e.classList.length - 2]
                        let resp = await fetch('/admin/returnbook', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: id,
                                bookname: bookname
                            })
                        })
                        resp = await resp.json()
                        if (resp.status == 200) {
                            alert("Book Returned")
                        } else {
                            alert("Some error occured")
                        }
                        window.location.reload()
                    })
                })
            })
        }
    })


    document.querySelector('.main5 .issue-book-button').addEventListener('click', async (req, res) => {
        document.querySelector('.main5 form').classList.remove('hide')
        document.querySelector('.main5 table').classList.add('hide')
        document.querySelector('.main5 .issue-book-button').disabled = true
        document.querySelectorAll('.main5 .toolbar').forEach(e => {
            e.classList.add('hide')
        })
    })

    document.querySelector('.main5 form').addEventListener('submit', async (req, res) => {
        let studid = document.querySelector('.main5 #issue-student-id').value
        let bookname = document.querySelector('.main5 #issue-book-name').value
        let resp = await fetch('/admin/issue-book', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: studid,
                bookname: bookname
            })
        })
        resp = await resp.json()
        if (resp.status == 200) {
            alert("Book issued")
            window.location.reload()
        } else {
            alert("Book cant be issued")
            window.location.reload()
        }
    })


}

async function announcements() {
    document.querySelector('.main6 .announcement-form button').addEventListener('click',async (req,res)=>{
        let announcement=document.querySelector('.main6 .announcement-form textarea').value
        let resp = await fetch('/admin/announcementpost',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                announcement:announcement
            })
        })
        resp= await resp.json()
        if (resp.json==200){
            alert('Announcement Posted')
        }else{
            alert('Some error occured')
        }
        window.location.reload()
    })
}

async function quicklinks() {
    let quicklist = ['main0', 'main1', 'main2', 'main4', 'main5', 'main6']
    quicklist.forEach(e => {
        document.querySelector(`.${e}`).classList.add('hide')
        if (e == 'main0') {
            document.querySelector(`.${e}`).classList.remove('hide')
        }
        document.querySelector(`#${e}`).addEventListener('click', () => {
            quicklist.forEach(el => {
                document.querySelector(`.${el}`).classList.add('hide')
                document.querySelector(`#${el}`).classList.remove('active')
            });
            document.querySelector(`.${e}`).classList.remove('hide')
            document.querySelector(`#${e}`).classList.add('active')
        })
    })
}

async function logout() {
    document.querySelector('.logout-admin').addEventListener('click',async ()=>{
        let resp=await fetch('/admin/logout',{
            method:'POST'
        })
        resp=await resp.json()
        if (resp.status==200){
            alert('Request accepted')
            window.location.href='/'
        }
    })
}
// Initialize data when page loads
document.addEventListener('DOMContentLoaded', () => {
    alldata();
    alladmissiondata();
    hosteldata();
    quicklinks()
    librarydata()
    announcements()
    logout()
    document.querySelector('.studinfosubmitt').addEventListener('click', studentinfo);
})

