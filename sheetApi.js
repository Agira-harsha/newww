var form=document.getElementById('sheetid')
form.addEventListener('submit',e=>{
    e.preventDefault();
    fetch(form.action,{
        method:"POST",
        body: new FormData(document.getElementById('sheetid')),

    }).then((html)=>{
        window.open('msg.html','_blank')
    });
})