let addBtn = document.getElementsByClassName("Element");
let newElement = document.getElementById("newElement");
let btn = document.querySelector('Element');

function init() {
  console.log(newElement);  
  console.log(addBtn)
  console.log(addBtn[0]);
  console.log(btn);
  /*
  newElement.addEventListener( 'click', (event) => {
    let list = document.querySelector('ul');
    list.innerHTML += `
      <li>
        <label>Item1</label>
        <div>
          <button type="submit">Check</button>
          <button type="submit">Delet</button>
        </div>
      </li>
      `;
  });*/
}
init();