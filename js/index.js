const paramList = []; 
let editIndex;

function deleteParam(index){
  if(confirm("Are sure you want to delete it?")){
    paramList.splice(index, 1);
    setParams();
  }
}

function updateParam(){
  paramList[editIndex] =   $('#param-edit-input').val();
  hideEditParamModal();
  setParams();
} 

function addParam(){
  let param = $("#param-input").val();
  if(!param || param == ""){
    alert("Parameter should not be empty!");
    return;
  }
  paramList.push(param);
  setParams();
  hideAddParamModal();
}

function removeLastParam(){
  paramList.pop();
  setParams();
}

function submit(){
  console.log(paramList);
}

function setParams(){
  $("#content-wrapper").empty();
  paramList.forEach((param, index) => {
    $('#content-wrapper').append(`
      <div class="content" id="param-${index}">
        <div class="parameter">
          <span>${param}</span>
        </div>
        <div class="para-control">
          <div class="edit" onclick="showEditParamModal(${index}, '${param}')"><i class="fa-solid fa-pencil"></i></div>
          <div class="delete" onclick="deleteParam(${index})"><i class="fa-solid fa-trash"></i></div>
        </div>
      </div>
    `)
  });
}

// modal handling
const addParamModal = document.getElementById("addParamModal");
const editParamModal = document.getElementById("editParamModal");

function showAddParamModal(){
  $("#param-input").focus();
  addParamModal.style.display = 'flex';
}
function hideAddParamModal(){
  $('.modal').hide();
  $('#param-edit-input').val('');
  $("#param-input").val('');
}

function showEditParamModal(index, param){
  $('#param-edit-input').val(param);
  editParamModal.style.display = 'flex';
  editIndex = index;
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
