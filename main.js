// DOM Elements
const resultEL = document.getElementById("result");
const lengthEL = document.getElementById("length");
const uppercaseEL = document.getElementById("uppercase");
const lowercaseEL = document.getElementById("lowercase");
const numberEL = document.getElementById("number");
const symbolEL = document.getElementById("symbol");
const generateEL = document.getElementById("generate");
const clipboardEL = document.getElementById("clipboard");
const tooltipEL = document.getElementById("myTooltip");

clipboardEL.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEL.innerText;

  if(!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  tooltipEL.innerHTML = "Password copied"
  textarea.remove();
});

clipboardEL.addEventListener("mouseleave", () => {
  tooltipEL.innerHTML = "Copy to Clipboard";
})

const generatePassword = (lower, upper, number, symbol, length) => {
  // 1. Initialize password variable
  // 2. Filter out unchecked types
  // 3. Loop over length call generator function for each type
  // 4. Add final password to the password variable and return it

  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  // console.log(typesCount);

  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
    item => Object.values(item)[0]
  );

  if(typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += 1) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

generateEL.addEventListener("click", () => {
  const length = +lengthEL.value;
  const hasLower = lowercaseEL.checked;
  const hasUpper = uppercaseEL.checked;
  const hasNumber = numberEL.checked;
  const hasSymbol = symbolEL.checked;

  resultEL.innerText = generatePassword(
    hasLower, hasUpper, hasNumber, hasSymbol, length
  )
})

// generator functions
const getRandomLower = () => {
  // https://net-comber.com/charset.html
  // 26 letters in the alphabet - char code as per table in the above link goes from 97 - 122
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

const getRandomUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

const getRandomeNumber = () => {
  return Math.floor(Math.random() * 10);
}

const getRandomSymbol = () => {
  const symbols = "~!@#$%^&*()+=[]{}:;<>?";
  return symbols[Math.floor(Math.random() * symbols.length)]
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomeNumber,
  symbol: getRandomSymbol
}

let generatedPass = ""

for (let i = 0; i < 20; i ++) {
  const funcName = Object.keys(randomFunc)[Math.floor(Math.random() * 4)];
  generatedPass += randomFunc.lower()
}