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
alldata()