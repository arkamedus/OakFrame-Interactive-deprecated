import {Vec2} from "./Vec2";

export class SHIPP {
	private map: Array<any>;
	private width: number;
	private height: number;

	constructor(width, height) {
		this.map = [];
		this.width = width;
		this.height = height;
		for (let i = 0; i < width * height; i++) {
			this.map[i] = 0;
		}
	}

	getMap() {
		return this.map;
	}

	getDimensionalMap() {
		let m = [];
		for (let i = 0; i < this.height; i++) {
			m.push(this.map.slice(this.width * i, this.width * (i + 1)));
		}
		return m;
	}

	run(fn) {
		let self = this;
		let tmp = new SHIPP(this.width, this.height);
		this.map.forEach(function (m, i) {
			let x = (i) % self.width;
			let y = (i / self.width) | 0;
			tmp.map[i] = fn(m, x, y);
		});
		this.map = tmp.map;
		return this;
	}

	regionContains(tag, x1, y1, x2, y2) {
	    let cnt=0;
	    let ttl=0;
		for (let y = y1; y <= y2; y++) {
			for (let x = x1; x <= x2; x++) {
			    ttl++;
				if (this.getPosition(x, y) == tag) {
					cnt++;
				}
			}
		}
		return cnt/ttl;
	}

	setMap(m: Array<any>) {
		this.map = m;
		return this;
	}

	setPosition(x, y, value) {
		x = (x + (this.width * 1000000)) % this.width;
		y = (y + (this.height * 1000000)) % this.height;
		this.map[x + (y * this.width)] = value;
		return this;
	}

	getPosition(x, y) {
		x = (x + (this.width * 1000000)) % this.width;
		y = (y + (this.height * 1000000)) % this.height;
		return this.map[x + (y * this.width)];
	}

	overlay(map) {
		let self = this;
		map.getMap().forEach(function (m, i) {
			if (m) {
				self.map[i] = m;
			}
		});
		return this;
	}

	growClusters(tag, size, lin, fn?) {
		let f = fn || function (value, x, y) {
			return true;
		};
		let temp = new SHIPP(this.width, this.height);
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if (this.regionContains(tag, x - size, y - size, x + size, y + size)) {
					if (Math.random() < lin && f(this.getPosition(x, y), x, y)) {
						temp.setPosition(x, y, tag);
					}
				}
			}
		}
		this.overlay(temp);
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}

	replace(search, replace) {
		let self = this;
		this.map.forEach(function (e, i) {
			if (e == search) {
				self.map[i] = replace;
			}
		})
	}

	renderHTML(options?) {
		if (!options) {
			options = {
				attr: ""
			}
		}
		let table = "";
		table += `<table ${options.attr || ""}>`;

		this.getDimensionalMap().forEach(function (row) {
			table += "<tr>";
			row.forEach(function (col) {
				let rgb = [255, 255, 255];
				if (!isNaN(col)) {
					rgb = [255 - (col * 255) | 0, 255 - (col * 255) | 0, 255 - (col * 255) | 0];
				}

				switch ((col + "").toLowerCase()) {
					case 'f':
						rgb = [254, 214, 255];
						break;
					case 'r':
						rgb = [160, 160, 160];
						break;
					case 't':
						rgb = [109, 175, 99];
						break;
					case 'd':
						rgb = [247, 240, 203];
						break;
					case 'w':
						rgb = [217, 246, 255];
						break;
					default:
						rgb = [209, 235, 169];
						break;
				}
				table += `<td style='background-color:rgb(${rgb.join(",")})'>`;//style='background-color:rgb(${rgb.join(",")})'


				table += col;
				// table += isNaN(col)?col:"&nbsp;";

				table += "</td>";
			});
			table += "</tr>";
		});

		table += "</table>";
		return table;
	}

	walkLine(x1, y1, x2, y2, value) {
		let v = new Vec2().set(x1, y1);
		let v2 = new Vec2().set(x2, y2);

		let dir = v.pointTo(v2).mulI(-1).toRad();
		let dist = v.set(x1, y1).dist(v2);

		console.log('line', x1, y1, x2, y2, v.set(x1, y1).dist(v2));
		console.log('dist', dist);
		console.log('dir', dir);

		for (let p2 = 1; p2 < dist; p2 += 0.5) {
			let dx = x1 + ((Math.sin(dir)) * p2) | 0;
			let dy = y1 + ((Math.cos(dir)) * p2) | 0;
			this.setPosition(dx, dy, value);
		}

		//this.setPosition(x1,y1,0.75);
		//this.setPosition(x2,y2,0.75);
	}

	placeCluster(x, y, width, height, value) {
		let dox = x;// Math.floor((this.width * Math.random()) - width); //Math.floor(Math.random() * (( - (width * 2)) + width));
		let doy = y;// + Math.floor((this.height * Math.random()) - height);

		for (let oix = dox; oix < dox + width; oix += 1) {

			for (let oiy = doy; oiy < doy + height; oiy += 1) {

				//  if (Math.random() * 100 <= 10) {

				let x = (oix + this.width) % this.width;
				let y = (oiy + this.height) % this.height;

				this.setPosition(x, y, value);
				console.log(x, y);
				//  y

			}

		}
	}

}