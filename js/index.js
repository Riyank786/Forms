
let lastElement;
let paramToBeUpdate;
function deleteParam(param = lastElement) {
  if(confirm("Are sure you want to delete it?")){
    let devicetype = $("#devicetype").val();
    let url = `http://localhost:3000/deleteParam?value=${param}&devicetype=${devicetype}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("DELETE", url, false);
    xmlHttp.send(null);
    let paramData = JSON.parse(xmlHttp.response);
    setParams(paramData.params);
  }
}

function updateParam(){
  let newValue = $('#param-edit-input').val();
  let devicetype = $('#devicetype').val();
  let url = `http://localhost:3000/updateParam?value=${paramToBeUpdate}&newValue=${newValue}&devicetype=${devicetype}`;
  var xhr = new XMLHttpRequest();
  xhr.open("PATCH", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log(`Error ${xhr.status} : ${xhr.statusText}`);
    } else {
      let paramsData = JSON.parse(xhr.response);
      setParams(paramsData.params); 
    }
  };
  hideEditParamModal();
} 

function addParam(){
  let param = $("#param-input").val();
  if(!param || param == ""){
    alert("Parameter should not be empty!");
    return;
  }
  addParamToDb(param);
  hideAddParamModal();
}

function submit(){
  let devicetype = $("#devicetype").val();
  let paramData = getParamsData(devicetype); 
  console.log(paramData);
}

function setParams(paramList){
  $("#content-wrapper").empty();
  paramList.forEach((param, index) => {
    if(index == paramList.length - 1){
      lastElement = param;
    }
    $('#content-wrapper').append(`
      <div class="content" id="param-${index}">
        <div class="parameter">
          <span>${param}</span>
        </div>
        <div class="para-control">
          <div class="edit" onclick="showEditParamModal('${param}')"><i class="fa-solid fa-pencil"></i></div>
          <div class="delete" onclick="deleteParam('${param}')"><i class="fa-solid fa-trash"></i></div>
        </div>
      </div>
    `)
  });
}

// adding param to db
function addParamToDb(param){
  let devicetype = $('#devicetype').val();
  let data = {
    devicetype: devicetype,
    params: [param]
  };
  let url = "http://localhost:3000/addParam";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log(`Error ${xhr.status} : ${xhr.statusText}`);
    } else {
      let paramsData = JSON.parse(xhr.response);
      setParams(paramsData.params);
    }
  };
  
}

// getting all params for devicetype: devicetype
function getParamsData(devicetype){
  let url = `http://localhost:3000/getParams?devicetype=${devicetype}`;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  xmlHttp.send( null );
  return JSON.parse(xmlHttp.response)[0];
}

function getAndSetParams(devicetype){
  let paramsData = getParamsData(devicetype);
  setParams(paramsData.params);
}

onload = () => {
  let devicetype = $("#devicetype").val();

  getAndSetParams(devicetype);

  $(document).on("change", "#devicetype", function () {
    let devicetype = $(this).val();
    getAndSetParams(devicetype);
  });
}

// modal handling
const addParamModal = document.getElementById("addParamModal");
const editParamModal = document.getElementById("editParamModal");

function showAddParamModal(){
  addParamModal.style.display = 'flex';
  $("#param-input").focus();
}
function hideAddParamModal(){
  $('.modal').hide();
  $('#param-edit-input').val('');
  $("#param-input").val('');
}

function showEditParamModal(param){
  editParamModal.style.display = 'flex';
  $('#param-edit-input').val(param);
  $('#param-edit-input').focus();
  paramToBeUpdate = param;
}

function hideEditParamModal(){
  editParamModal.style.display = "none";
  $('#param-edit-input').val('');
}
window.onclick = function(event) {
  if (event.target == addParamModal || event.target == editParamModal) {
    hideAddParamModal();
  }
}
