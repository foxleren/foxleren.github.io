const SIMPLE = "simple"
const PARAMETRIC = "parametric"

function Plotter(canvas, cellSizeX, cellSizeY, x0, y0, gridColor, axisColor, scale, indexScale) {
	this.ctx = canvas.getContext("2d")

	this.width = canvas.width
	this.height = canvas.height

	this.cellSizeX = cellSizeX
	this.cellSizeY = cellSizeY

	this.cellsX = this.width / (2 * this.cellSizeX)
	this.cellsY = this.height / (2 * this.cellSizeY)

	this.scale = scale
	this.scales = [2, 2, 2.5]
	this.scaleIndex = 0

	this.SetCenter(x0, y0)

	this.gridColor = gridColor
	this.axisColor = axisColor

	this.colors = ["blue", "red", "purple", "green", "black", "fuchsia", "maroon", "aqua", "navy", "teal", "gold", "orange", "orangeRed"]
	this.functions = []

	this.isPressed = false
	this.prevX = 0
	this.prevY = 0
}

Plotter.prototype.SetCenter = function (x0, y0) {
	this.x0 = this.width / 2 - this.cellSizeX * x0 * this.scale
	this.y0 = this.height / 2 + this.cellSizeY * y0 * this.scale

	this.xmin = x0 - this.cellsX / this.scale
	this.xmax = x0 + this.cellsX / this.scale

	this.ymin = y0 - this.cellsY / this.scale
	this.ymax = y0 + this.cellsY / this.scale
}

Plotter.prototype.DrawLine = function (x1, y1, x2, y2) {
	this.ctx.beginPath()
	this.ctx.moveTo(x1, y1)
	this.ctx.lineTo(x2, y2)
	this.ctx.stroke()
}

Plotter.prototype.DrawGrid = function () {
	this.ctx.strokeStyle = this.gridColor
	this.ctx.lineWidth = 1

	let top = Math.floor(this.y0 / this.cellSizeY)
	let bottom = Math.floor((this.height - this.y0) / this.cellSizeY)
	let right = Math.floor((this.width - this.x0) / this.cellSizeX)
	let left = Math.floor(this.x0 / this.cellSizeX)

	for (let i = -bottom; i <= top; i++)
		this.DrawLine(0, this.y0 - i * this.cellSizeY, this.width, this.y0 - i * this.cellSizeY)

	for (let i = -left; i <= right; i++)
		this.DrawLine(this.x0 + i * this.cellSizeX, 0, this.x0 + i * this.cellSizeX, this.height)
}

Plotter.prototype.DrawVerticalValues = function (x0, y0) {
	this.ctx.textBaseline = "middle"
	this.ctx.textAlign = x0 < this.width ? "left" : "right"

	let position = Math.min(Math.max(7, x0 + 7), this.width - 14)

	let top = Math.floor(this.y0 / this.cellSizeY)
	let bottom = Math.floor((this.height - this.y0) / this.cellSizeY)

	for (let i = -bottom; i <= top; i++) {
		if (i == 0)
			continue

		let y = this.y0 - i * this.cellSizeY
		let value = this.Round(this.HtoY(y))

		this.DrawLine(x0 - 4, y, x0 + 4, y)
		this.ctx.fillText(value , position, y)
	}
}

Plotter.prototype.DrawHorizontalValues = function (x0, y0) {
	this.ctx.textBaseline = y0 < this.height ? "top" : "bottom"
	this.ctx.textAlign = "center"

	let position = Math.min(Math.max(7, y0 + 7), this.height - 14)

	let right = Math.floor((this.width - this.x0) / this.cellSizeX)
	let left = Math.floor(this.x0 / this.cellSizeX)

	for (let i = -left; i <= right; i++) {
		if (i == 0)
			continue

		let x = this.x0 + i * this.cellSizeX
		let value = this.Round(this.WtoX(x))

		this.DrawLine(x, y0 - 4, x, y0 + 4)
		this.ctx.fillText(value, x, position)
	}
}

Plotter.prototype.DrawAxis = function () {
	this.ctx.strokeStyle = this.axisColor
	this.ctx.fillStyle = this.axisColor
	this.ctx.font = "14px Calibri"

	let x0 = Math.min(Math.max(this.x0, 0), this.width)
	let y0 = Math.min(Math.max(this.y0, 0), this.height)

	this.DrawLine(x0, 0, x0, this.height)
	this.DrawLine(0, y0, this.width, y0)

	this.DrawVerticalValues(x0, y0)
	this.DrawHorizontalValues(x0, y0)
}

Plotter.prototype.AddSimpleFunction = function (f) {
	let a = Math.round(Math.random() * this.colors.length)
	this.functions.push({ type: SIMPLE, f: f, color: this.colors[a] })
}

Plotter.prototype.AddParametricFunction = function (x, y, tmin, tmax, dt) {
	this.functions.push({ type: PARAMETRIC, x: x, y: y, tmin: tmin, tmax: tmax, dt: dt, color: this.colors[Math.random() * this.colors.length] })
}

Plotter.prototype.Round = function (value) {
	return Math.round(value * 100) / 100
}

Plotter.prototype.Map = function (x, xmin, xmax, ymin, ymax) {
	return (x - xmin) / (xmax - xmin) * (ymax - ymin) + ymin
}

Plotter.prototype.XtoW = function (x) {
	return this.Map(x, this.xmin, this.xmax, 0, this.width)
}

Plotter.prototype.YtoH = function (y) {
	return this.Map(y, this.ymin, this.ymax, this.height, 0)
}

Plotter.prototype.WtoX = function (w) {
	return this.Map(w, 0, this.width, this.xmin, this.xmax)
}

Plotter.prototype.HtoY = function (h) {
	return this.Map(h, 0, this.height, this.ymax, this.ymin)
}

Plotter.prototype.PlotSimpleFunction = function (f, color) {
	let step = (this.xmax - this.xmin) / this.width

	f.SetValue(this.xmin, "x")
	let y = f.Calculate()

	this.ctx.strokeStyle = color
	this.ctx.lineWidth = 2
	this.ctx.beginPath()
	this.ctx.moveTo(this.XtoW(this.xmin), this.YtoH(y))

	for (let x = this.xmin + step; x <= this.xmax; x += step) {
		f.SetValue(x, "x")
		y = f.Calculate()
		this.ctx.lineTo(this.XtoW(x), this.YtoH(y))
	}

	this.ctx.stroke()
}

Plotter.prototype.PlotParametricFunction = function (x, y, tmin, tmax, dt, color) {
	this.ctx.strokeStyle = color
	this.ctx.lineWidth = 2
	this.ctx.beginPath()
	this.ctx.moveTo(this.XtoW(x(tmin)), this.YtoH(y(tmin)))

	for (let t = tmin; t <= tmax; t += dt)
		this.ctx.lineTo(this.XtoW(x(t)), this.YtoH(y(t)))

	this.ctx.stroke()
}

Plotter.prototype.Plot = function () {
	this.ctx.clearRect(0, 0, this.width, this.height)

	this.DrawGrid()
	this.DrawAxis()

	for (let i = 0; i < this.functions.length; i++) {
		if (this.functions[i].type == SIMPLE)
			this.PlotSimpleFunction(this.functions[i].f, this.functions[i].color)
		else
			this.PlotParametricFunction(this.functions[i].x, this.functions[i].y, this.functions[i].tmin, this.functions[i].tmax, this.functions[i].dt, this.functions[i].color)
	}
}

Plotter.prototype.ShowValues = function (mx, my, indexScale) {
	let x = this.WtoX(mx * indexScale) //
	let y = this.HtoY(my)

	for (let i = 0; i < this.functions.length; i++) {
		if (this.functions[i].type == PARAMETRIC)
			continue

		this.functions[i].f.SetValue(x, "x")
		let fy = this.functions[i].f.Calculate()

		this.ctx.beginPath()
		this.ctx.arc(mx*indexScale, this.YtoH(fy), 3, 0, Math.PI * indexScale ) //
		this.ctx.fillStyle = this.functions[i].color
		this.ctx.fill()
		this.ctx.fillText(this.Round(x) + "; " + this.Round(fy), mx*indexScale, this.YtoH(fy) ) //
	}
}

Plotter.prototype.MouseWheel = function (e) {
	if (e.target.tagName != "CANVAS")
		return

	let x0 = (this.width / 2 - this.x0) / this.cellSizeX / this.scale
	let y0 = (this.y0 - this.height / 2) / this.cellSizeY / this.scale

	let x = this.WtoX(e.offsetX)
	let y = this.HtoY(e.offsetY)

	let dx = x - x0
	let dy = y - y0

	let scale

	if (e.deltaY < 0) {
		scale = this.scales[this.scaleIndex]
		this.scaleIndex = (this.scaleIndex + 1) % this.scales.length
	}
	else {
		this.scaleIndex = (this.scaleIndex - 1 + this.scales.length) % this.scales.length
		scale = 1 / this.scales[this.scaleIndex]
	}

	this.scale *= scale

	this.SetCenter(x - dx / scale, y - dy / scale)
	this.Plot()
	this.ShowValues(e.offsetX, e.offsetY)
	e.preventDefault()
}

Plotter.prototype.MouseMove = function (e) {
	if (e.target.tagName != "CANVAS")
		return

	if (!this.isPressed) {
		this.Plot()
		this.ShowValues(e.offsetX, e.offsetY, indexScale)
		return
	}

	let dx = e.offsetX - this.prevX
	let dy = e.offsetY - this.prevY

	this.prevX = e.offsetX
	this.prevY = e.offsetY

	let x0 = (this.width / 2 - this.x0 - dx) / this.cellSizeX / this.scale
	let y0 = (this.y0 + dy - this.height / 2) / this.cellSizeY / this.scale

	this.SetCenter(x0, y0)
	this.Plot()
}

Plotter.prototype.MouseDown = function (e) {
	if (e.target.tagName == "CANVAS") {
		this.isPressed = true
		this.prevX = e.offsetX
		this.prevY = e.offsetY
	}
}

Plotter.prototype.MouseUp = function (e) {
	this.isPressed = false
}



