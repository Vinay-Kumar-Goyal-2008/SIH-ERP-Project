async function alldata() {
    document.querySelector('main div').style.display = 'none'
    document.querySelector('.loadingdata').style.display = 'block'
    let allstudentsnum = await fetch('/admin/totalstudents', {
        method: 'POST'
    })
    if (allstudentsnum.status = 200) {
        document.querySelector('main>div').style.display = 'block'
        document.querySelector('.loadingdata').style.display = 'none'
        allstudentsnum = await allstudentsnum.json()
        document.querySelector('.totalstudents .value').innerText = allstudentsnum.num
        document.querySelector('.totalfeescollected .value').innerText = allstudentsnum.amountpaid
        document.querySelector('.totalpendingfees .value').innerText = allstudentsnum.amountdue
    }
}
alldata()