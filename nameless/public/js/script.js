
window.onload = function () {
	const dds = document.getElementsByTagName('dd');
	const dl = document.getElementsByTagName('dl')[0];
	dl.style.transform = "rotateX(-10deg) rotateY(0deg)";
	for (let i = 0; i < dds.length; i++) {
		const inverted = document.createElement('div');
		const inverteds = document.createElement('div');
		const img = document.createElement('img');
		img.src = dds[i].getElementsByTagName('img')[0].src;
		inverted.appendChild(img);
		inverted.className = 'inverted';
		inverteds.appendChild(inverted)
		inverteds.className = 'inverteds';
		dds[i].appendChild(inverteds);
	}
	deal(dds, dds.length - 1);

	// document.getElementsByTagName('dd')

	window.onmousedown = function (e) {
		e = e || window.event;
		const mouseX = e.clientX, mouseY = e.clientY;
		const transform = dl.style.transform;
		let rotateX = transform.substr(transform.indexOf('rotateX(') + 8);
		let rotateY = transform.substr(transform.indexOf('rotateY(') + 8);
		rotateX = parseInt(rotateX.substring(0, rotateX.indexOf('deg')));
		rotateY = parseInt(rotateY.substring(0, rotateY.indexOf('deg')));
		window.onmousemove = function (e) {
			e = e || window.event;
			let x = rotateX - (e.clientY - mouseY);
			let y = rotateY + (e.clientX - mouseX);
			if (x > 360 || x < -360)
				x %= 360;
			if (y > 360 || y < -360)
				y %= 360;
			// if (x > -5)
			// 	x = -5;
			// if (x < -90)
			// 	x = -90;
			dl.style.transform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
		}
		window.onmouseup = function () {
			window.onmousemove = null;
		}
	}

	function deal(dds, n) {
		const speed = 350;
		const translateZTerminus = 460;
		const angle = 360 / dds.length * n;
		let translateZ = 0;
		let rotateY = 0;
		const time = setInterval(function () {
			translateZ += translateZTerminus / speed * 10;
			rotateY += angle / speed * 10;
			dds[n].style.transform = 'rotateY(' + rotateY + 'deg) translateZ(' + translateZ + 'px)';
			if (rotateY >= angle && translateZ >= translateZTerminus) {
				clearInterval(time);
				dds[n].style.transform = 'rotateY(' + angle + 'deg) translateZ(' + translateZTerminus + 'px)';
				if (n > 0)
					deal(dds, n - 1);
			}
		}, 10);
	}
}