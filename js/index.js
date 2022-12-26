let addEmployee = document.getElementById("btn1");
let modal = document.getElementById("modal");
let close = document.getElementById("close");
let registerForm = document.getElementById("register-form");
let Id = document.getElementById("Id");
let Name = document.getElementById("Name");
let LastName = document.getElementById("LastName");
let Email = document.getElementById("E-mail");
let OfficeCode = document.getElementById("OfficeCode");
let JobTitle = document.getElementById("JobTitle");
let registerBtn = document.getElementById("btn5");
let updatebtn = document.getElementById("btn6");
let tableData = document.getElementById("table-data");
let image = document.getElementById("image");
let upload = document.getElementById("upload");
let clrFilterBtn = document.getElementById("btn2");
let userData = [];
let imgUrl = "pf pic.jpg";
let search_bar=document.getElementById("search_bar");
let search_btn=document.getElementById("search_btn");

// to show the form abd close the form
addEmployee.onclick = () => {
  modal.classList.add("active");
  registerBtn.disabled = false;
  updatebtn.disabled = true;
};
close.onclick = () => {
  modal.classList.remove("active");
};

// to submit the form and display the data in the table

registerForm.onsubmit = (e) => {
  e.preventDefault();
  Register();
  add();
  registerForm.reset("");
  image.src = "pf pic.jpg";
  imgUrl = undefined;
  close.onclick();
};

// to add the data in the table

add = () => {
  userData = JSON.parse(localStorage.getItem("userData"));
  tableData.innerHTML = "";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
        <tr index="${index}">
                <td>${index + 1}</td>
                <td><img src="${data.img}" height="40px" width="40px"></td>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.lastName}</td>
                <td>${data.email}</td>
                <td>${data.officeCode}</td>
                <td>${data.jobTitle}</td>
                <td>
                    <button class="btn3"><i class="fa fa-eye"></i></button>
                    <button class="btn4"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
            `;
  });
  // to delete the particular row
  let delButton = document.querySelectorAll(".btn4");
  let i;
  for (i = 0; i < delButton.length; i++) {
    delButton[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let index = tr.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userData.splice(index, 1);
          localStorage.setItem("userData", JSON.stringify(userData));
          tr.remove();
          swal("Poof! Employee data deleted!", {
            icon: "success",
          });
        } else {
          swal("Employee data not deleted!");
        }
      });
    };
  }
  let updateButton = document.querySelectorAll(".btn3");
  for (i = 0; i < updateButton.length; i++) {
    updateButton[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let td = tr.getElementsByTagName("td");
      Id.value = td[2].innerHTML;
      image.src = td[1].firstElementChild.src;
      Name.value = td[3].innerHTML;
      LastName.value = td[4].innerHTML;
      Email.value = td[5].innerHTML;
      OfficeCode.value = td[6].innerHTML;
      JobTitle.value = td[7].innerHTML;

      addEmployee.onclick();
      registerBtn.disabled = true;
      updatebtn.disabled = false;

      updatebtn.onclick = function (e) {
        e.preventDefault();
        userData[tr.getAttribute("index")] = {
          id: Id.value,
          name: Name.value,
          lastName: LastName.value,
          email: Email.value,
          officeCode: OfficeCode.value,
          jobTitle: JobTitle.value,
          img: imgUrl == undefined ? "pf pic.jpg" : imgUrl,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        add();
        close.onclick();
        registerForm.reset("");
      };
    };
  }
};

// to send the data to local storage
Register = () => {
  userData.push({
    id: Id.value,
    name: Name.value,
    lastName: LastName.value,
    email: Email.value,
    officeCode: OfficeCode.value,
    jobTitle: JobTitle.value,
    img: imgUrl == undefined ? "pf pic.jpg" : imgUrl,
  });
  let FinalData = JSON.stringify(userData);
  localStorage.setItem("userData", FinalData);
  swal("Registration Successful", "Employee has been registered", "success");
};

// image conversion and displaying
upload.onchange = () => {
  if (upload.files[0].size < 100000) {
    var fReader = new FileReader();
    fReader.onload = (e) => {
      imgUrl = e.target.result;
      image.src = imgUrl;
    };
    fReader.readAsDataURL(upload.files[0]);
  } else {
    alert("File size is too large");
  }
};


// search bar coding

search_btn.onclick=function(){
  let tr=tableData.querySelectorAll("tr");
  let filter=search_bar.value.toLowerCase();
  let i;
  for(i=0;i<tr.length;i++){
    id=tr[i].querySelectorAll("td")[2].innerHTML.toLowerCase();
    nam=tr[i].querySelectorAll("td")[3].innerHTML.toLowerCase();
    l_nam=tr[i].querySelectorAll("td")[4].innerHTML.toLowerCase();
    ema=tr[i].querySelectorAll("td")[5].innerHTML.toLowerCase();
    o_code=tr[i].querySelectorAll("td")[6].innerHTML.toLowerCase();
    j_title=tr[i].querySelectorAll("td")[7].innerHTML.toLowerCase();
    
    if(id.indexOf(filter)>-1){
      tr[i].style.display="";
    }
    else if(nam.indexOf(filter)>-1){
      tr[i].style.display="";
    }
    else if(l_nam.indexOf(filter)>-1){
      tr[i].style.display="";
    }
    else if(ema.indexOf(filter)>-1){
      tr[i].style.display="";
    }
    else if(o_code.indexOf(filter)>-1){
      tr[i].style.display="";
    }
    else if(j_title.indexOf(filter)>-1){
      tr[i].style.display="";
    }
    else{
      tr[i].style.display="none";
    }
  }
}

// erase all data coding

let btn2=document.getElementById("btn2");

btn2.onclick=function(){
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this data!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      localStorage.removeItem("userData");
      window.location=location.href;
      swal("Poof! All data deleted!", {
        icon: "success",
      });
    } else {
      swal("data not deleted!");
    }
  });
}

// display localStorage data on screen even after refresh

if(localStorage.getItem("userData")){
  add();
}