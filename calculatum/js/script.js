let buttons = document.querySelectorAll(".second-half button");
let operators = ["+", "-", "×", "÷"];
let decimal = false;


for (let i = 0; i < buttons.length; i++) {
	buttons[i].onclick = function (e) {

		let input = document.querySelector(".input");
		let inputValue = input.innerHTML;

		let buttonValue = this.innerHTML;

		if (inputValue.length >= 17) {
			input.style.fontSize = "2em";

		} else {
			input.style.fontSize = "2.5em";
		}

		if (inputValue.length >= 22) {
			input.style.fontSize = "1.5em";

		} else if (inputValue.length >= 17) {
			input.style.fontSize = "2em";
		}

		if (inputValue.length >= 30) {
			alert("Превышена максимальная длина вводимого значения. Окно ввода будет обновлено принудительно.");
			buttonValue = "C";
		}

		let total;
		if (buttonValue == "C") {
			input.innerHTML = "";
			decimal = false;
		} else if (buttonValue == "Del") {
			input.innerHTML = inputValue.substring("", inputValue.length - 1);
			decimal = false;
		} else if (buttonValue == "=") {
			let equivalent = inputValue;
			let lastNum = equivalent[equivalent.length - 1];

			while (equivalent.includes("×") == true) {
				equivalent = equivalent.replace("×", "*");
			}

			while (equivalent.includes("÷") == true) {
				equivalent = equivalent.replace("÷", "/");
			}


			if (operators.indexOf(lastNum) > -1 || lastNum == ".")
				equivalent = equivalent.replace(".", "");

			if (equivalent) {
				total = eval(equivalent);
				if (total.toString().indexOf(".") != -1)
					total = total.toFixed(2);

				input.innerHTML = total;
			}

			decimal = false;
		} else if (operators.indexOf(buttonValue) > -1) {

			let lastNum = inputValue[inputValue.length - 1];

			if (inputValue != "" && operators.indexOf(lastNum) == -1)
				input.innerHTML += buttonValue;

			else if (inputValue == "" && buttonValue == "-")
				input.innerHTML += buttonValue;

			if (operators.indexOf(lastNum) > -1 && inputValue.length > 1) {
				input.innerHTML = inputValue.replace(".", buttonValue);
			}

			decimal = false;
		} else if (buttonValue == ".") {
			if (!decimal) {
				input.innerHTML += buttonValue;
				decimal = true;
			}
		} else {
			input.innerHTML += buttonValue;
		}


		e.preventDefault();
	}
}