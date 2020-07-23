window.onload = function (e) {
  this.i = 0;
  window.onclick = function (e) {
    if (e.target.className == "far fa-edit") {
      makeEditable(e);
    } else if (e.target.className === "color") {
      changeColor(e);
    } else if (e.target.className == "far fa-trash-alt") {
      deleteNote(e);
    } else {
    }
  };
  document.getElementById("btn").onclick = function (e) {
    createNotes();
  };
};

// Make title and description editable
makeEditable = (e) => {
  const targettitle =
    e.target.parentElement.parentElement.parentElement.childNodes[1];
  targettitle.setAttribute("contenteditable", "true");
  const targetdescription =
    e.target.parentElement.parentElement.parentElement.childNodes[3];
  targetdescription.setAttribute("contenteditable", "true");
};

// Change color of note
changeColor = (e) => {
  e.target.parentElement.parentElement.style.backgroundColor = e.target.id;
};

// Delete Note
deleteNote = (e) => {
  document
    .getElementById(`${e.target.id}`)
    .parentElement.parentElement.parentElement.parentElement.remove();
};

// Create Notes Dynamically
createNotes = () => {
  // Get data from input
  const titlevalue = document.getElementById("title").innerText;
  const descriptionvalue = document.getElementById("description").innerText;
  const dragstartfn = "ondragstart = 'dragStart(event);'";
  const dragendfunction = "ondragend = 'dragEnd(event);'";

  // Basic Validations
  if (titlevalue === "" && descriptionvalue == "") {
    alert("Title and Description cannot be empty");
  } else if (descriptionvalue == "") {
    alert("Please enter the value to the desc");
    document.getElementById("title").innerText = "";
  } else if (titlevalue === "") {
    alert("Please enter the value to the title");
    document.getElementById("description").innerText = "";
  } else {
    // Creating notes
    const template = this.noteTemplate();
    const newdiv = document.createElement("div");
    newdiv.innerHTML = template
      .replace("{{title}}", titlevalue)
      .replace("{{description}}", descriptionvalue)
      .replace("{{dragstart}}", dragstartfn)
      .replace("{{dragend}}", dragendfunction);
    document.getElementById("mainnotesdiv").prepend(newdiv);
    document.getElementById("title").innerText = "";
    document.getElementById("description").innerText = "";
  }
};

// Drag And Drop
let elementtodrag;

const dragStart = (e) => {
  elementtodrag = e.target;
  setTimeout(() => (e.target.className = "invisible"), 0);
};

const dragEnd = (e) => {
  e.target.className = "visible";
};

// Create Dropzones for dragged items
const dropzones = document.getElementsByClassName("dropzone");

// functions for eventlisteners
const dragEnter = (event) => {
  event.preventDefault();
};

const dragOver = (event) => {
  event.preventDefault();
};

const dragLeave = (event) => {
  event.preventDefault();
};

const drop = (event) => {
  event.target.append(elementtodrag);
};

// Create a note Template that is required
function noteTemplate() {
  this.i += 1;
  return `
  <div>
  <div id="secondarynotesdiv" draggable="true" {{dragstart}} {{dragend}} class="notes${i}">
  <div class="eachnote" >
    <div id="content">
      <div class="notetitle${i}" style="text-align:center;padding:10px 0px 20px;color:maroon;"  id="data">
        {{title}}
      </div>
      <div class="notebody${i}"  id="data" style="text-align:center;padding:10px 20px 20px;color:maroon;">
        {{description}}
      </div>
      <div class="editbtn">
        <span  id="editbutton">
          <i class="far fa-edit"></i>
        </span>
        <span
          id="delete"
        >
          <i class="far fa-trash-alt" id="trash${i}"></i>
        </span>
      </div>
    </div>
    <div
      id="colors"
      style="display: flex; justify-content: space-around;"
    >
      <div
        style="
          width: 10%;
          background-color: chartreuse;
          border-radius: 30px;
          height: 20px;
          border: 1px solid black;
        "
        id="chartreuse"
        class="color"
      ></div>
      <div
        style="
          width: 10%;
          background-color: yellow;
          border-radius: 30px;
          height: 20px;
          border: 1px solid black;
        "
        id="yellow"
        class="color"
      ></div>
      <div
        style="
          width: 10%;
          background-color: pink;
          border-radius: 30px;
          height: 20px;
          border: 1px solid black;
        "
        id="pink"
        class="color"
      ></div>
      <div
        style="
          width: 10%;
          background-color: lightblue;
          border-radius: 30px;
          height: 20px;
          border: 1px solid black;
        "
        id="lightblue"
        class="color"
      ></div>
    </div>
  </div>
</div>
</div>
  `;
}
