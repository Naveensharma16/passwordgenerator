

document.getElementById("copybutton").addEventListener('click', async () =>{
    let text = document.getElementById("genpass").value;
    console.log(text);
    await navigator.clipboard.writeText(text);
    Toastify({
      text: "Password copied",
      duration: 3000,
      style:{
        background: "#55efc4",
      }
      }).showToast();
})



const inputElements = document.querySelectorAll('.setrange');

const handleInput = (inputElement) => {
  let isChanging = false;

  const setCSSProperty = () => {
    const percent =
      ((inputElement.value - inputElement.min) /
      (inputElement.max - inputElement.min)) *
      100;
    // Here comes the magic 🦄🌈
    inputElement.style.setProperty("--webkitProgressPercent", `${percent}%`);
  }

  // Set event listeners
  const handleMove = () => {
    if (!isChanging) return;
    setCSSProperty();
  };
  const handleUpAndLeave = () => isChanging = false;
  const handleDown = () => isChanging = true;

  inputElement.addEventListener("mousemove", handleMove);
  inputElement.addEventListener("mousedown", handleDown);
  inputElement.addEventListener("mouseup", handleUpAndLeave);
  inputElement.addEventListener("mouseleave", handleUpAndLeave);
  inputElement.addEventListener("click", setCSSProperty);

  // Init input
  setCSSProperty();
}

inputElements.forEach(handleInput)




// getting range value
let slider = document.getElementsByClassName("setrange");
let output = document.getElementById("pass-len");
output.innerHTML= slider[0].attributes.value.value;

// function to change the value of length of password
const changeLenValue = (e) =>{
  output.innerHTML= e.target.value;
}

// event listners to get the value of rane slider
slider[0].addEventListener("mousemove",(e) => changeLenValue(e))
slider[0].addEventListener("mousedown",(e) => changeLenValue(e))
slider[0].addEventListener("mouseup",(e) => changeLenValue(e))
slider[0].addEventListener("mouseleave",(e) => changeLenValue(e))
slider[0].addEventListener("click",(e) => changeLenValue(e))



// function to generate password set strength meter
const generatePassword = (strength,length,...range) =>{
    let str = "";
    while(length--){
      let index = Math.floor(Math.random() * range.length);   // getting the random elemtn from the range array
      let min = range[index][0].charCodeAt(0);       // get the unicode of the starting element of range
      let max = range[index][1].charCodeAt(0);      // get the unicode of the ending element of the range
      let char = Math.floor(Math.random() * (max - min +1) + min)   // getting the random value between min and max
      str+= String.fromCharCode(char)    // changing the unicode  to normal character
    }
    // setting the strength meter based on the strength supplied
    // TODO:  change this strength meter in a speprate function
    if(strength <= 2){
      document.getElementById("strent-type").innerHTML="low"
    }
    else if(strength === 3){
      document.getElementById("strent-type").innerHTML="medium"
    }
    else{
      document.getElementById("strent-type").innerHTML="high"
    }
    

    // showing the passwod to user
    document.getElementById("genpass").value = str;
    // showing the strength meter
    const strengthSpans = document.querySelectorAll(".strength-meter span")
    // removing the fill class
    strengthSpans.forEach((e) =>{
        e.classList.remove("fill")
    })
    // adding the fill calss
    for(let i = 0;i<strength;i++){
       strengthSpans[i].classList.add("fill")
    }

    return str;
}



// event listner on password generate button

document.querySelector(".gen-password").addEventListener("click",() =>{

    if(output.innerHTML < 4){
      Toastify({
        text: "password length should be more than 4",
        duration: 3000,
        style:{
          background: "red",
        }
        }).showToast();
        return null;
    }

    const upper = document.getElementById("uppercase")
    const lower = document.getElementById("lowercase")
    const number = document.getElementById("numercase")
    const symbol = document.getElementById("symbolcase")


    let strength = 0;

    if(upper.checked && lower.checked && number.checked && symbol.checked){
        console.log("all condition is true");
        if(output.innerHTML >= 8){
          strength = 4;
        }
        else{
          strength = 3;
        }
       generatePassword(strength,output.innerHTML,["A","Z"],["a","z"],["0","9"],["!","/"],[":","@"])
    }
    else if(upper.checked && lower.checked && number.checked && !symbol.checked){
       console.log("upper lower and number");
        if(output.innerHTML >= 8){
         strength = 3;
        }
        else{
          strength = 2;
        }
       generatePassword(strength,output.innerHTML,["A","Z"],["a","z"],["0","9"])
    }
    else if(upper.checked && lower.checked && !number.checked && !symbol.checked){
      console.log("upper and lower");
      if(output.innerHTML >= 8){
        strength = 2;
       }
       else{
         strength = 1;
       }
     generatePassword(strength,output.innerHTML,["A","Z"],["a","z"])  
    }
    else if(upper.checked && !lower.checked && !number.checked && !symbol.checked){
      console.log("upper");
      if(output.innerHTML >= 8){
        strength = 1;
       }
       else{
         strength = 1;
       }
      generatePassword(strength,output.innerHTML,["A","Z"])
    }
    else if(upper.checked && !lower.checked && number.checked && symbol.checked){
       console.log("upper number and symbol");
       if(output.innerHTML >= 8){
        strength = 3;
       }
       else{
         strength = 2;
       }
       generatePassword(strength,strength,output.innerHTML,["A","Z"],["0","9"],["!","/"],[":","@"])
    }
    else if(upper.checked && lower.checked && !number.checked && symbol.checked){
      console.log("upper lower and symbol");
      if(output.innerHTML >= 8){
        strength = 3;
       }
       else{
         strength = 2;
       }
      generatePassword(strength,output.innerHTML,["A","Z"],["a","z"],["!","/"],[":","@"])
    }
    else if(upper.checked && !lower.checked && number.checked && !symbol.checked){
        console.log("upper and number");
        console.log("upper lower and symbol");
        if(output.innerHTML >= 8){
          strength = 2;
         }
         else{
           strength = 1;
         }
        generatePassword(strength,output.innerHTML,["A","Z"],["0","9"])
    }
    else if(upper.checked && !lower.checked && !number.checked && symbol.checked){
        console.log("upper and symbol");
        console.log("upper lower and symbol");
        if(output.innerHTML >= 8){
          strength = 3;
         }
         else{
           strength = 2;
         }
        generatePassword(strength,output.innerHTML,["A","Z"],["!","/"],[":","@"])
    }
    else if(!upper.checked && lower.checked && number.checked && symbol.checked){
      console.log("lower number and symbol");
      if(output.innerHTML >= 8){
        strength = 3;
       }
       else{
         strength = 2;
       }
      generatePassword(strength,output.innerHTML,["a","z"],["0","9"],["!","/"],[":","@"])
    }
    else if(!upper.checked && lower.checked && number.checked && !symbol.checked){
      console.log("lower and number");
      if(output.innerHTML >= 8){
        strength = 2;
       }
       else{
         strength = 1;
       }
      generatePassword(strength,output.innerHTML,["a","z"],["0","9"])
    }
    else if(!upper.checked && lower.checked && !number.checked && symbol.checked){
      console.log("lower and symbol");
      if(output.innerHTML >= 8){
        strength = 2;
       }
       else{
         strength = 1;
       }
      generatePassword(strength,output.innerHTML,["a","z"],["!","/"],[":","@"])
    }
    else if(!upper.checked && lower.checked && !number.checked && !symbol.checked){
      console.log("lower");
      if(output.innerHTML >= 8){
        strength = 2;
       }
       else{
         strength = 1;
       }
      generatePassword(strength,output.innerHTML,["a","z"])
    }
    else if(!upper.checked && !lower.checked && number.checked && symbol.checked){
      console.log("number and symbol");
      if(output.innerHTML >= 8){
        strength = 2;
       }
       else{
         strength = 1;
       }
      generatePassword(strength,output.innerHTML,["0","9"],["!","/"],[":","@"])
    }
    else if(!upper.checked && !lower.checked && number.checked && !symbol.checked){
      console.log("number");
      if(output.innerHTML >= 8){
        strength = 1;
       }
       else{
         strength = 1;
       }
      generatePassword(strength,output.innerHTML,["0","9"])
    }
    else if(!upper.checked && !lower.checked && !number.checked && symbol.checked){
      console.log("symbol");
      if(output.innerHTML >= 8){
        strength = 1;
       }
       else{
        strength = 1;
       }
      generatePassword(strength,output.innerHTML,["!","/"],[":","@"])
    }
    else{
      Toastify({
        text: "check atleast one box",
        duration: 3000,
        style:{
          background: "red",
        }
        }).showToast();
    }

})