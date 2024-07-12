function clickme()
{
    alert('helllo world')
}
let box=document.getElementById('box')
box.addEventListener('mouseover',()=>[box.style.background='yellow']);
box.addEventListener('mouseout',()=>[box.style.background='red']);

let btn1=document.getElementById('btn1')
btn1.addEventListener("click",()=> {
    let email=document.getElementById("a1").value;
    let pass=document.getElementById("a2").value;
    console.log(email,pass)


});