const form1 = document.getElementById('form1');

const clientId = "b50a7fd880081de9af8f";
const clientSecret = "84ca898a563234b6895d8f3b791c5355518764af";

const handleSubmit = (event) => {
    event.preventDefault();
    const input = document.forms["form1"][0].value;
    if(input === ""){
        alert("Fill in the UserName or ID");
        return false;
    }
    else{
        document.getElementById('sb').style.display = 'none';
        searchEngine(input); 
        return true;
    }
}
form1.addEventListener("submit", handleSubmit); // add event listener takes in function reference.

const searchEngine= (inp) => {
      FetchUser(inp)
      .then(data => display(data))
      .catch(error => console.log(error))
}

const FetchUser = async (userInp) => {
    const userProf = await fetch(`http://api.github.com/users/${userInp}?client_id=${clientId}&client_secret=${clientSecret}`);
    const data = await userProf.json();
    return data;
}

const display = (data) => {
    document.getElementById("prof").style.display="block";

    const image = document.getElementById("imag");
    image.setAttribute("src",data.avatar_url);

    const datadiv = document.getElementById("disdata");

    for(let i in data){

        if(i === "name" || i === "bio" || i === "company"){
        let head = document.createElement("h1");
        let value = data[i];
        if(value === null){
            head.innerHTML = `${i.toLocaleUpperCase()}: Not yet set`;
        }
        else{
            head.innerHTML = `${i.toLocaleUpperCase()}: ${value}`;

        }
        head.classList.add("data");
        datadiv.appendChild(head);
        }

        }
    }
