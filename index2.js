let res = document.getElementById("results");
let tabs = document.getElementById("table");
const convert = document.getElementById("submit")
const convert2 = document.getElementById("submit-2");
let expression = 0;
let change = document.getElementById("change-name");
const display = document.getElementById("display");
const reset=document.getElementById("reset-form");
let post = document.getElementById("postfix-exp");
function sel(x) { return document.getElementById(x) }

//function to clear the input using clear button
function clearInp() {
    document.getElementById("init-expression").value = "";
    sel("tabledata").innerHTML = "";
}

//function to get the expression from the input field
// const getExpression = () => {
//     const temp = document.getElementById("init-expression").value;
//     expression = temp;
// }

//reset on click function
reset.onclick = () => {
    post.style.display = "none";
    tabs.style.display = "none";
    clearInp();
}

convert.onclick = () => {
    tabs.style.display = "inline-block";
    post.style.display = "block";
    // getExpression();
    let disp,items, tabitems = "";
    items = infixToPostfix(document.getElementById("init-expression").value, 1)['table'];
    sel("itemname").innerHTML = "Postfix";
    for (var i = 0; i < items.exp.length; i++) {
        tabitems += "<tr><td>" + i + "</td><td>" + items['exp'][i] + "</td><td>" + items['stak'][i] + "</td><td>" + items['conexp'][i] + "</td></tr>";
    }
    change.innerHTML = "The postfix expression is:"
    sel("tabledata").innerHTML = tabitems;
    disp=infixToPostfix(document.getElementById("init-expression").value, 1)['postfixExpression'];
    display.innerHTML = disp;
}

convert2.onclick = () =>{
    tabs.style.display = "inline-block";
    post.style.display = "block";
    // getExpression();
    let disp,items, tabitems = "";
    items = infixToPrefix(document.getElementById("init-expression").value, 1)['table'];
    sel("itemname").innerHTML = "Postfix";
    for (var i = 0; i < items.exp.length; i++) {
        tabitems += "<tr><td>" + i + "</td><td>" + items['exp'][i] + "</td><td>" + items['stak'][i] + "</td><td>" + items['conexp'][i] + "</td></tr>";
    }
    sel("tabledata").innerHTML = tabitems;
    change.innerHTML = "The prefix expression is:"
    disp=infixToPrefix(document.getElementById("init-expression").value, 1)['prefixExpression'];
    display.innerHTML = disp;
}

const userOperators = {
    "-": 0,
    "+": 0,
    "/": 1,
    "*": 1,
    "^": 2,
    ")": 3,
    "(": 3,
};

function precidencer(item) {
    /*
    precedence are :
            * > ^ > / > % > + > - > ) > ( > any operand
    */
    var operators = ['', '(', ')', '-', '+', '%', '/', '*', '^'];

    for (var j = 0; j < operators.length; j++) {
        if (item == operators[j]) {
            return j;
        }
    }

    return 0;
}

const iisOperator = (s) => userOperators[s] !== undefined;
const isAParen = (s) => userOperators[s] === 3;


// Infix to postfix conversion
function infixToPostfix(expression, tab = 0) {

    const infixExp = [...expression.split(""), ")"];
    const postfixExp = [];

    const opStack = ["("];

    let table = {
        exp: [],
        stak: [],
        conexp: [],
    };

    table.exp.push("");
    table.stak.push(opStack.join(" "));
    table.conexp.push(postfixExp.join(""));

    for (var char of infixExp) {

        if (char === "(") {
            opStack.push(char);
            continue;
        } else if (!iisOperator(char)) {
            postfixExp.push(char);
        } else if (char === ")") {
            while (opStack.length > 0 && opStack[opStack.length - 1] !== "(") {
                const newchar = opStack.pop();
                postfixExp.push(newchar);
            }
            opStack.pop();
        } else if (iisOperator(char)) {
            while (opStack.length > 0 &&
                userOperators[opStack[opStack.length - 1]] >= userOperators[char] &&
                !isAParen(opStack[opStack.length - 1])) {
                postfixExp.push(opStack.pop());
            }

            opStack.push(char);
        }

        if (tab == 1) {
            table.exp.push(char);
            table.stak.push(opStack.join(" "));
            table.conexp.push(postfixExp.join(""));
        }

    }

    while (opStack.length > 0) {
        postfixExp.push(opStack.pop());
    }
    console.log(table);
    return {
        postfixExpression: postfixExp.join(""),
        table: table
    };
}

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.onclick = () => {
    if(menu.classList.contains("hidden")){
        menu.classList.remove("hidden");
    }
    else{
        menu.classList.add("hidden");
    }
}

const reverseExpression = (expression) => {
    let temp = expression.split("");
    for(let i=0 ; i<expression.length ; i++) {
    if(temp[i]===")"){
        temp[i] = "("
    }
    else if(temp[i]==="("){
        temp[i] = ")";
    }
}
return temp.reverse().join("");
}


const infixToPrefix = (expression,tab=0) =>{
    let prefixExp = infixToPostfix(reverseExpression(expression),tab);
    return{
        prefixExpression : reverseExpression(prefixExp['postfixExpression']),
        table: prefixExp['table']
    }
}