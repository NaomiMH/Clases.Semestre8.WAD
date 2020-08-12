let addBtn = document.getElementsByClassName("Element");
let list = document.querySelector('ul');
let item = document.querySelector('input');

function init() {
  
  addBtn[0].addEventListener( 'click', (event) => {
    event.preventDefault();
    if(item.value != ""){
      let insert = `
      <li>
        <label>${item.value}</label>
        <div>
          <button type="submit" class="check">Check</button>
          <button type="submit" class="delete">Delete</button>
        </div>
      </li>
      `;
      list.innerHTML =  insert + list.innerHTML;
      item.value = "";
    }
  });

  list.addEventListener('click',(event) => {
    if( event.target.matches( '.check' ) ){
      if(event.target.parentNode.parentNode.querySelector('label').style.textDecoration == "line-through")
        event.target.parentNode.parentNode.querySelector('label').style.textDecoration = "none";
      else
        event.target.parentNode.parentNode.querySelector('label').style.textDecoration = "line-through";
    }
    if( event.target.matches( '.delete' ) ){
      event.target.parentNode.parentNode.remove();
    }
  });
}
init();
