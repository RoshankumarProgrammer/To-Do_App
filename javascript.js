const adduserBtn=document.getElementById('adduser');
const btntext=adduserBtn.innerHTML;
const usernameTextField=document.getElementById('username');
const displayrecord=document.getElementById('tasklist');
let edit_id=null;
let userArray = [];
let objstr=localStorage.getItem('users');
if(objstr!=null)
    {
        userArray = JSON.parse(objstr);
    }
displayData();

adduserBtn.onclick=()=>{
    const name = usernameTextField.value;
    if(name=='')
        {
            alert("Plaese Enter Your task");
        }
    else if(edit_id!=null)
        {
        userArray.splice(edit_id,1,{'name':name})
        edit_id=null;
        }
    else
    {
    userArray.push({'name':name})
    }
    saveData(userArray);
    usernameTextField.value='';
    adduserBtn.innerHTML=btntext;
}

function saveData(userArray)
{
    let str = JSON.stringify(userArray);
    localStorage.setItem('users',str);
    displayData();
}

function displayData()
{
    let statement = '';
    userArray.forEach((user, i) => {
        statement += `<li>${user.name}
        <button><i class="fa fa-edit" onclick='editData(${i})'></i></button>
        <button><i class="fa fa-trash-o" onclick='deleteData(${i})'></i></button>
        <button><i class="fa fa-check" onclick='Completed(${i})'></i></button>
       </li>`
    });
    displayrecord.innerHTML=statement;
}

function editData(id)
{
    edit_id=id;
    usernameTextField.value=userArray[id].name;
    adduserBtn.innerHTML='Edit';
}

function deleteData(id)
{   if(confirm("Are you want to delete Task?"))
    {
    userArray.splice(id,1);
    saveData(userArray);
    }
}
function Completed(id)
{
    if(confirm("Are You done Your task?"))
    {
    userArray.splice(id,1,{'name':"Completed"});
    saveData(userArray);
    }
}