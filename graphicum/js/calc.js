function Calc(lexemes) {
	this.lexemes = lexemes

	this.GetRPN()
}

Calc.prototype.SetValue = function (value, name) {
	this.variables[name] = value
}

/*Calc.prototype.IsVariable = function(name) {
	return name == "x" 
}*/

Calc.prototype.IsNumber = function (num) {
	for (let i = 0; i < num.length; i++)
		if (num[i] != '.' && (num[i] < '0' || num[i] > '9'))
			return false

	return true
}

Calc.prototype.IsOperator = function (op) {
	return op == "+" || op == "-" || op == "^" || op == "%" || op == "*" || op == "/"
}

Calc.prototype.IsFunc = function (op) {
	return op == "cos" || op == "sin" || op == "tan" || op == "cot" || op == "ctg" || op == "exp" || op == "sqrt"
}

Calc.prototype.IsIdentifier = function (v) {
	return v.match(/^[a-z]+/gi)
}

Calc.prototype.IsConst = function (name) {
	return name == "pi" || name == "e"
}

Calc.prototype.CalcFunction = function (name, a) {
	a *= Math.PI / 180

	if (name == "cos")
		return Math.cos(a)

	if (name == "sin")
		return Math.sin(a)

	if (name == "tan" || name == "tg")
		return Math.tan(a)

	if (name == "cot" || name == "ctg")
		return 1 / Math.tan(a)

	if (name == "sqrt")
		return Math.sqrt(a)

	if (name == "exp")
		return Math.exp(a)

	throw "unknown function '" + name + "'"
}

Calc.prototype.CalcConst = function (name) {
	if (name == "pi")
		return Math.PI

	if (name == "e")
		return Math.E

	throw "unknown constant '" + name + "'"
}

Calc.prototype.CalcOperator = function (op, a, b) {
	if (op == "-")
		return a - b

	if (op == "+")
		return a + b

	if (op == "*")
		return a * b

	if (op == "/")
		return a / b

	if (op == "^")
		return Math.pow(a, b)

	if (op == "%")
		return a % b

	throw "unknown operator '" + op + "'"
}

Calc.prototype.Calculate = function (flag) {
	try {

		let stack = []

		for (let i = 0; i < this.rpn.length; i++) {
			if (this.IsNumber(this.rpn[i])) {
				stack.push(parseFloat(this.rpn[i]))
			}
			else if (this.IsConst(this.rpn[i])) {
				stack.push(this.CalcConst(this.rpn[i]))
			}
			else if (this.IsOperator(this.rpn[i])) {
				if (stack.length < 2)
					throw "Error, too little values to calculate operator '" + this.rpn[i] + "'"

				let a = stack.pop()
				let b = stack.pop()
				stack.push(this.CalcOperator(this.rpn[i], b, a))
			}
			else if (this.rpn[i] == "!") {
				if (stack.length < 1)
					throw "Error, too little values to insert value"

				stack.push(-stack.pop())
			}
			else if (this.IsFunc(this.rpn[i])) {
				if (stack.length == 0)
					throw "Error, too little values to calculate func '" + this.rpn[i] + "'"

				let a = stack.pop()
				stack.push(this.CalcFunction(this.rpn[i], a))
			}
			else if (this.IsIdentifier(this.rpn[i])/* && this.variables[this.rpn[i]] != NULL*/)
				stack.push(this.variables[this.rpn[i]])
			else {
				throw "Unknown rpn value '" + this.rpn[i] + "'"
			}
		}
if (flag == true) {
		stack = []
		return stack
	}
		if (stack.length > 1)
			throw "Error: incorret expression"

		return stack[stack.length - 1]
	}
	catch (error) {
		console.log(error);
	}

	
	
}

Calc.prototype.Priority = function (op) {
	if (op == "^")
		return 5

	if (op == "!")
		return 4

	if (op == "*" || op == "/" || op == "%")
		return 3

	if (op == "+" || op == "-")
		return 2

	return 1
}

Calc.prototype.GetRPN = function () {
	this.rpn = []
	this.variables = {}
	var stack = []
	IsUnary = true

	for (let i = 0; i < this.lexemes.length; i++) {
		if (this.IsFunc(this.lexemes[i])) {
			stack.push(this.lexemes[i])
			IsUnary = true
		}
		else if (this.IsIdentifier(this.lexemes[i])) {
			this.rpn.push(this.lexemes[i])
			this.variables[this.lexemes[i]] = 0
			this.IsUnary = false
		}
		else if (this.IsNumber(this.lexemes[i]) || this.IsConst(this.lexemes[i])) {
			this.rpn.push(this.lexemes[i])
			IsUnary = false
		}
		else if (this.lexemes[i] == "(") {
			stack.push(this.lexemes[i])
			IsUnary = true
		}
		else if (this.lexemes[i] == ")") {
			while (stack.length > 0 && stack[stack.length - 1] != "(")
				this.rpn.push(stack.pop())

			if (stack.length == 0)
				throw "Incorrect expression"

			stack.pop()
			IsUnary = false
		}
		else if (this.IsOperator(this.lexemes[i])) {
			while (stack.length > 0 && (this.IsFunc(stack[stack.length - 1]) || (this.Priority(stack[stack.length - 1]) > this.Priority(this.lexemes[i]))))
				this.rpn.push(stack.pop())

			if (IsUnary && this.lexemes[i] == "-")
				stack.push("!")
			else
				stack.push(this.lexemes[i])

			IsUnary = false
		}
	}

	while (stack.length > 0) {
		if (!this.IsFunc(stack[stack.length - 1]) && !this.IsOperator(stack[stack.length - 1]) && stack[stack.length - 1] != "!")
			throw "Incorrect expression"

		this.rpn.push(stack.pop())
	}
}

