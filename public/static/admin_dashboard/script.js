let admshowcount=0
async function alldata() {
    document.querySelector('.main0').style.display = 'none'
    document.querySelector('.loadingdata').style.display = 'block'
    let allstudentsnum = await fetch('/admin/totalstudents', {
        method: 'POST'
    })
    allstudentsnum = await allstudentsnum.json()
    if (allstudentsnum.status = 200) {
        document.querySelector('.main0').style.display = 'block'
        document.querySelector('.loadingdata').style.display = 'none'
        document.querySelector('.totalstudents .value').innerText = allstudentsnum.num
        document.querySelector('.totalfeescollected .value').innerText = allstudentsnum.amountpaid
        document.querySelector('.totalpendingfees .value').innerText = allstudentsnum.amountdue
    }
}

async function alladmissiondata() {
    document.querySelector('.main1').style.display = 'none'
    document.querySelector('.loadingdata').style.display = 'block'
    let alladmissions = await fetch('/admin/admissionsdata', {
        method: 'POST'
    })
    alladmissions = await alladmissions.json()
    
    if (alladmissions.status = 200) {
        document.querySelector('.main1').style.display = 'block'
        document.querySelector('.loadingdata').style.display = 'none'
        document.querySelector('.totalapplicants .value').innerText = alladmissions.num
        document.querySelector('.approved .value').innerText = alladmissions.approved
        document.querySelector('.pending .value').innerText = alladmissions.pending
        document.querySelector('.rejected .value').innerText = alladmissions.rejected
        for (let i=0;i<alladmissions.alldata.length;i++){
            document.querySelector('.admissionsstudentstable tbody').innerHTML+=`<tr>
                                 <td>${alladmissions.alldata[i].student_id}</td>
                                    <td>${alladmissions.alldata[i].name}</td>
                                    <td><span class="status-badge status-pending-review">${alladmissions.alldata[i].admission_status}</span></td>
                                    <td>${alladmissions.alldata[i].applied_on}</td>
                                    <td>
                                        <button class="action-button primary studentaccept" id="${alladmissions.alldata[i].student_id}">Accept</button>
                                        <button class="action-button danger studentreject" id="${alladmissions.alldata[i].student_id}">Reject</button>
                                    </td>
                                </tr>`
            admshowcount+=1
        if (admshowcount==10){
            document.querySelector(".admissionsstudentstable").innerHTML+=`<button class="action-button primary admshowmore"> Next Page </button>`
            document.querySelector(".admissionsstudentstable").innerHTML+=`<button id='admshowprev' class="action-button primary"> Previous Page </button>`
            break
        }
        }
        document.querySelector(".admshowmore").addEventListener('click',async (req,res)=>{
            document.querySelector('.admissionsstudentstable tbody').innerHTML=''
            let tempcount=0
            for (let i=admshowcount;i<alladmissions.alldata.length;i++){
            document.querySelector('.admissionsstudentstable tbody').innerHTML+=`<tr>
                                 <td>${alladmissions.alldata[i].student_id}</td>
                                    <td>${alladmissions.alldata[i].name}</td>
                                    <td><span class="status-badge status-pending-review">${alladmissions.alldata[i].admission_status}</span></td>
                                    <td>${alladmissions.alldata[i].applied_on}</td>
                                    <td>
                                        <button class="action-button primary studentaccept" id="${alladmissions.alldata[i].student_id}">Accept</button>
                                        <button class="action-button danger studentreject" id="${alladmissions.alldata[i].student_id}">Reject</button>
                                    </td>
                                </tr>`
            admshowcount+=1
            tempcount+=1
        if (tempcount==10){
            break
        }
        }
        })
        document.querySelector("#admshowprev").addEventListener('click',async ()=>{
            document.querySelector('.admissionsstudentstable tbody').innerHTML=''
            for (let i=(admshowcount-10);i<admshowcount;i++){
            document.querySelector('.admissionsstudentstable tbody').innerHTML+=`<tr>
                                 <td>${alladmissions.alldata[i].student_id}</td>
                                    <td>${alladmissions.alldata[i].name}</td>
                                    <td><span class="status-badge status-pending-review">${alladmissions.alldata[i].admission_status}</span></td>
                                    <td>${alladmissions.alldata[i].applied_on}</td>
                                    <td>
                                        <button class="action-button primary studentaccept" id="${alladmissions.alldata[i].student_id}">Accept</button>
                                        <button class="action-button danger studentreject" id="${alladmissions.alldata[i].student_id}">Reject</button>
                                    </td>
                                </tr>`
            
        }
        admshowcount-=10
        })
    }
    document.querySelector('.nameidadmsearch').addEventListener('change', () => {
    const nameorid = document.querySelector('.nameidadmsearch').value;

    const student = alladmissions.alldata.find(s => 
        s.name === nameorid || s.student_id.toString() === nameorid
    );

    const tbody = document.querySelector('.admissionsstudentstable tbody');
    tbody.innerHTML = ''; 

    if (student) {
        tbody.innerHTML += `<tr>
            <td>${student.student_id}</td>
            <td>${student.name}</td>
            <td><span class="status-badge status-pending-review">${student.admission_status}</span></td>
            <td>${student.applied_on}</td>
            <td>
                <button class="action-button primary studentaccept" id="${student.student_id}">Accept</button>
                <button class="action-button danger studentreject" id="${student.student_id}">Reject</button>
            </td>
        </tr>`;
    } else {
        alert('Student not found')
    }
});

}


async function studentinfo(){
    let iddata=document.querySelector('.main2 input').value
    let branch=document.querySelector('.main2 .branch').value
    let section=document.querySelector('.main2 .section').value
    let semester=document.querySelector('.main2 .semester').value
    console.log(branch, section, semester);
    let studdata=await fetch('/admin/studdata',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:iddata,
            branch:branch,
            section:section,
            semester:semester
        })
    })
    studdata=await studdata.json()
    if (studdata.status==200){
        document.querySelector('.main2 table tbody').innerHTML=''
        studdata.founddata.forEach(e=>{
            document.querySelector('.main2 table tbody').innerHTML+=`<tr>
                                 <td>${e.id}</td>
                                    <td>${e.name}</td>
                                    <td>${e.email}</td>
                                    <td>${e.mobile}</td>
                                    <td>${e.gender}</td>
                                    <td>${e.branch}</td>
                                    <td>${e.section}</td>
                                </tr>`
        })
        
    }
}
alldata()
alladmissiondata()
document.querySelector('.studinfosubmitt').addEventListener('click',studentinfo)