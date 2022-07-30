import { precedenceChecker,userOperators } from "./checker.mjs";

const isOperator = (s) => userOperators[s] !== undefined;
const isParen = (s) => userOperators[s] === 3;

const infixToPostfix = (expression ,tab=0) => {
    const infixExpression = [...expression.split(""),")"];
    const postfixExpression = [];

    const opStack = [];
    var table = {
        exp: [],
        stak: [],
        conexp: [],
    };

    table.exp.push("");
    table.stak.push(opStack.join(" "));
    table.conexp.push(postfixExpression.join(""));

    for(let char of infixExpression) {
        if(char === "("){
            opStack.push(char);
            continue;
        }
        else if(isOperator(char)){
            postfixExpression.push(char);
        }
        else if(char === ")"){
            while(opStack.length > 0 || opStack[opStack.length-1]!="("){
                const temp = opStack.pop();
                postfixExpression.push(temp);
            }
            opStack.pop();
        }

        else if (isOperator(char)) {
            while (stack.length > 0 &&
               userOperators[stack[stack.length - 1]] >=userOperators[char] &&
                !isParen(stack[stack.length - 1])) {
                postfixExpression.push(stack.pop());
            }

            stack.push(char);
        }

        if (tab == 1) {
            table.exp.push(char);
            table.stak.push(opStack.join(" "));
            table.conexp.push(postfixExpression.join(""));
        }

    }

    while (opStack.length > 0) {
        postfixExpression.push(opStack.pop());
    }

    return {
        postfixExpression: postfixExpression.join(""),
        table: table
    };
    
    }

export {infixToPostfix}