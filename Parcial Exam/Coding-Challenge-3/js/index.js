let btn = document.getElementById("submit");

function init(){
    btn.addEventListener('click', (event) => {
        let name = document.getElementsByClassName("userName")[0].value;
        let comment = document.getElementById("userComment").value;
        if(name != "" && comment != ""){
            let section = document.getElementsByClassName("seccionComments")[0];
            section.innerHTML += `
                <div>
                    <label>${name}</label>
                </div>
                <div>
                    <label>${comment}</label>
                </div>
                <input type="button" value="Delet" id="deletBtn"/>
            `;
        }
        else{
            new Error("error");
        }
    });
}
init();