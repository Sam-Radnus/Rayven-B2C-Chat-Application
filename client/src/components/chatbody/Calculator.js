import React, { useState } from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import "./styles/Calculator.css";
import { evaluate, round } from "mathjs";
function Calculator({handleCloseCalclModal}) {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  //input
  const handleMouseDown = (event) => {
    const startX = event.pageX - position.x;
    const startY = event.pageY - position.y;

    const handleMouseMove = (event) => {
      setPosition({
        x: event.pageX - startX,
        y: event.pageY - startY,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };
  const inputHandler = (event) => {
    if (answer === "Invalid Input!!") return;
    let val = event.target.innerText;
   
    if (val === "x2") val = "^2";
    else if (val === "x3") val = "^3";
    else if (val === "3√") val = "^(1÷3)";
    else if (val === "log") val = "log(";

    let str = input + val;
    if (str.length > 14) return;

    if (answer !== "") {
      setInput(answer + val);
      setAnswer("");
    } else setInput(str);
    // setInput(str);
  };

  //Clear screen
  const clearInput = () => {
    setInput("");
    setAnswer("");
  };

  // check brackets are balanced or not
  const checkBracketBalanced = (expr) => {
    let stack = [];
    for (let i = 0; i < expr.length; i++) {
      let x = expr[i];
      if (x === "(") {
        stack.push(x);
        continue;
      }

      if (x === ")") {
        if (stack.length === 0) return false;
        else stack.pop();
      }
    }
    return stack.length === 0;
  };

  // calculate final answer
  const calculateAns = () => {
    if (input === "") return;
    let result = 0;
    let finalexpression = input;
    //  finalexpression = input.replaceAll("^", "**");  //for eval()
    finalexpression = finalexpression.replaceAll("x", "*");
    finalexpression = finalexpression.replaceAll("÷", "/");

    // evaluate square root
    let noSqrt = input.match(/√[0-9]+/gi);

    if (noSqrt !== null) {
      let evalSqrt = input;
      for (let i = 0; i < noSqrt.length; i++) {
        evalSqrt = evalSqrt.replace(
          noSqrt[i],
          `sqrt(${noSqrt[i].substring(1)})`
        );
      }
      finalexpression = evalSqrt;
    }

    try {
      // check brackets are balanced or not
      if (!checkBracketBalanced(finalexpression)) {
        const errorMessage = { message: "Brackets are not balanced!" };
        throw errorMessage;
      }
      result = evaluate(finalexpression); //mathjs
    } catch (error) {
      result =
        error.message === "Brackets are not balanced!"
          ? "Brackets are not balanced!"
          : "Invalid Input!!"; //error.message;
    }
    isNaN(result) ? setAnswer(result) : setAnswer(round(result, 3));
  };

  // remove last character
  const backspace = () => {
    if (answer !== "") {
      setInput(answer.toString().slice(0, -1));
      setAnswer("");
    } else setInput((prev) => prev.slice(0, -1));
  };

  // change prefix of expression
  const changePlusMinus = () => {
    //need to change for answer
    if (answer === "Invalid Input!!") return;
    else if (answer !== "") {
      let ans = answer.toString();
      if (ans.charAt(0) === "-") {
        let plus = "+";
        setInput(plus.concat(ans.slice(1, ans.length)));
      } else if (ans.charAt(0) === "+") {
        let minus = "-";
        setInput(minus.concat(ans.slice(1, ans.length)));
      } else {
        let minus = "-";
        setInput(minus.concat(ans));
      }
      setAnswer("");
    } else {
      if (input.charAt(0) === "-") {
        let plus = "+";
        setInput((prev) => plus.concat(prev.slice(1, prev.length)));
      } else if (input.charAt(0) === "+") {
        let minus = "-";
        setInput((prev) => minus.concat(prev.slice(1, prev.length)));
      } else {
        let minus = "-";
        setInput((prev) => minus.concat(prev));
      }
    }
  };

  return (
    <>
      <div style={{ cursor:'pointer',position: 'absolute', zIndex:100000,left: position.x, top: position.y,maxHeight:'100px',width:'410px',transform: 'scale(0.7)'}}
      onMouseDown={handleMouseDown} className="container">
         
        <div  style={{position:'relative'}} className="main">

        <div>
            <b style={{position:'absolute',top:'-1%',right:0,cursor:'pointer'}} onClick={handleCloseCalclModal}>X</b>
         </div>
          <Display input={input} setInput={setInput} answer={answer} />
          <Buttons
            inputHandler={inputHandler}
            clearInput={clearInput}
            backspace={backspace}
            changePlusMinus={changePlusMinus}
            calculateAns={calculateAns}
          />
        </div>
      </div>
    </>
  );
}

export default Calculator;