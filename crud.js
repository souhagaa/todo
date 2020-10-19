var ul = document.getElementById('list');
var li;
var addButton = document.getElementById('add');
addButton.addEventListener("click",addItem);

if (localStorage.length === 0){
  localStorage.setItem("index", "0");
}

function createCheck(item){ // creates a checkbox with the todo task

  var textNode = document.createTextNode(item);
  li = document.createElement('li');
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  var i = localStorage.getItem("index");
  var idCheck = 'check' + i;

  checkbox.setAttribute('id', idCheck);

  let label = document.createElement('label');
  label.setAttribute("for", checkbox.id);

  ul.appendChild(label);
  li.appendChild(checkbox);
  label.appendChild(textNode);
  li.appendChild(label);
  ul.insertBefore(li, ul.childNodes[0]);
  return i;

}

function addItem(){

    var input = document.getElementById('input');
    var item = input.value;
    if (item == '') {
        let msg= "Add new task to do ...";
        alert(msg);
        return false;

    } else {
        var i = createCheck(item);
        var idCheck = 'check' + i;
        // save in local localStorage
        localStorage.setItem(idCheck, item);
        localStorage.setItem("index", (Number(i)+1).toString());
        input.value = " ";
    }

}
function getAllCheck(){

  nbrCheck = Number(localStorage.getItem("index"));
  checks = {}
  for (var i = 0; i < nbrCheck; i++){
    keyCheck = "check" + i.toString();
    checks[keyCheck]=localStorage.getItem(keyCheck);
  }
  return checks;

}

function showItems() {

  nbrCheck = Number(localStorage.getItem("index"));
  for (var i = 0; i < nbrCheck; i++){
    keyCheck = "check"+i.toString();
    item = localStorage.getItem(keyCheck);
    createCheck(item);
  }

}


var removeButton = document.getElementById('remove');
removeButton.addEventListener("click",removeItem);

// remove all checked todo tasks
function removeItem(){

    li=ul.children;
    nbrCheck = Number(localStorage.getItem("index"));

    if (localStorage.getItem("delIndex") === null) {
      localStorage.setItem("delIndex", 0);
    }

    delIndex = localStorage.getItem("delIndex");

    for (let index = 0; index < li.length; index++) {
        while(li[index] && li[index].children[0].checked){
            val = li[index].children[1].innerHTML; // // value of label
            key = li[index].children[0].id; // // id and local storage key
            ul.removeChild(li[index]);
            localStorage.removeItem(key);
            idDel = "idDel" + delIndex;
            localStorage.setItem(idDel, val);
            localStorage.setItem("delIndex", (Number(delIndex)+1).toString());
            localStorage.setItem("index", (Number(localStorage.getItem("index"))-1).toString());

        }

    }
}

var removeButton = document.getElementById('retrieve');
removeButton.addEventListener("click", restoreDeleted);

function restoreDeleted() {

  nbrDel = Number(localStorage.getItem("delIndex"));
  for (var i = 0; i < nbrDel; i++){
    keyDel = "idDel" + i.toString();
    item = localStorage.getItem(keyDel);
    createCheck(item);
    // then delete it from localStorage
    localStorage.removeItem(keyDel);

    j = localStorage.getItem("index");
    var idCheck = 'check' + j;
    // save in local localStorage
    localStorage.setItem(idCheck, item);
    localStorage.setItem("index", (Number(j)+1).toString());
    localStorage.setItem("delIndex", "0");
  }

}
