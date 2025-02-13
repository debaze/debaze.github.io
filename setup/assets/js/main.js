import {Brand} from "./Brand.js";
import {Component} from "./Component.js";
import {Link} from "./Link.js";
import {Price} from "./Price.js";
import {Sell} from "./Sell.js";
import {Setup} from "./Setup.js";
import {Type} from "./Type.js";

const setup = new Setup([
	new Component({
		type: Type.CPU,
		brand: Brand.INTEL,
		model: "Core i7-13700K 3.4GHz",
		description: "LGA 1700 • 16 cores",
		image: "https://m.media-amazon.com/images/I/31Byi3U8YDL._AC_US256_.jpg",
		sells: [
			new Sell({
				price: new Price(415.45, 4.61),
				link: new Link("https://www.amazon.es/dp/B0BG6843GX"),
			}),
			new Sell({
				price: new Price(433.25, 4.61),
				link: new Link("https://www.amazon.de/dp/B0BG6843GX"),
			}),
			new Sell({
				price: new Price(473.20, 0),
				link: new Link("https://www.amazon.fr/dp/B0BG6843GX"),
			}),
			new Sell({
				price: new Price(463.95, 9.90),
				link: new Link("https://www.amazon.fr/dp/B0BS9CXQZQ"),
			}),
			new Sell({
				price: new Price(509.99, 0),
				link: new Link("https://www.topachat.com/pages/detail2_cat_est_micro_puis_rubrique_est_wpr_puis_ref_est_in20014981.html"),
			}),
		],
		bestPrice: new Price(407.99, 4.61),
		target: 424.50,
		certainty: true,
		buyed: true,
	}),
	new Component({
		type: Type.MOTHERBOARD,
		brand: Brand.ASUS,
		model: "ROG Strix Z790-F Gaming",
		description: "ATX • LGA 1700 • Wi-Fi",
		image: "https://m.media-amazon.com/images/I/41Er4p78RML._AC_US256_.jpg",
		sells: [
			new Sell({
				price: new Price(420.65, 10.80),
				link: new Link("https://www.amazon.de/dp/B0BH94RXPC/?smid=A2NVH5TXDWZ5IT&tag=idealode-mp-pk-21&linkCode=asn&creative=6742&camp=1638&creativeASIN=B0BH94RXPC&ascsubtag=2023-06-05_a4f15525228d5f06a4d8c2ed39ca42c7593769b361a2b103a6a0dbdaf5f51406&th=1&psc=1"),
			}),
			new Sell({
				price: new Price(429.19, 7.77),
				link: new Link("https://www.amazon.de/dp/B0BH94RXPC"),
			}),
			new Sell({
				price: new Price(469.00, 0),
				link: new Link("https://www.amazon.fr/dp/B0BH94RXPC"),
			}),
			new Sell({
				price: new Price(499.99, 0),
				link: new Link("https://www.topachat.com/pages/detail2_cat_est_micro_puis_rubrique_est_w_cm_1700_puis_ref_est_in20014869.html"),
			}),
			new Sell({
				price: new Price(494.60, 7.77),
				link: new Link("https://www.amazon.es/dp/B0BH94RXPC"),
			}),
		],
		bestPrice: new Price(387.90, 7.77),
		target: 430.43,
		certainty: true,
		buyed: true,
	}),
	new Component({
		type: Type.WATERCOOLING,
		brand: Brand.CORSAIR,
		model: "iCUE H150i ELITE LCD XT",
		description: "360mm • 3x120mm • LGA 1700",
		image: "https://m.media-amazon.com/images/I/31T3BaaHbFL._AC_US256_.jpg",
		sells: [
			new Sell({
				price: new Price(324.99, 0),
				link: new Link("https://www.amazon.fr/dp/B0BQWSP2ZP"),
			}),
			new Sell({
				price: new Price(335.00, 8.42),
				link: new Link("https://www.amazon.de/dp/B0BQWSP2ZP"),
			}),
			new Sell({
				price: new Price(352.90, 8.42),
				link: new Link("https://www.amazon.es/dp/B0BQWSP2ZP"),
			}),
			new Sell({
				price: new Price(374.99, 0),
				link: new Link("https://www.topachat.com/pages/detail2_cat_est_micro_puis_rubrique_est_w_reliq_puis_ref_est_in20017097.html"),
			}),
		],
		bestPrice: new Price(324.99, 0),
		target: 324.99,
		certainty: true,
		buyed: true,
	}),
	new Component({
		type: Type.RAM,
		brand: Brand.CORSAIR,
		model: "Vengeance 32Gb (2x16Gb)",
		description: "DDR5 6400MHz • CL32 • Black",
		image: "https://m.media-amazon.com/images/I/31s6I6ymzwL._AC_US256_.jpg",
		sells: [
			new Sell({
				price: new Price(124.99, 4.65),
				link: new Link("https://www.amazon.de/dp/B0BPL9VYPW"),
			}),
			new Sell({
				price: new Price(151.88, 0),
				link: new Link("https://www.amazon.fr/dp/B0BPL9VYPW"),
			}),
			new Sell({
				price: new Price(160.80, 4.65),
				link: new Link("https://www.amazon.es/dp/B0BPL9VYPW"),
			}),
		],
		bestPrice: new Price(124.99, 4.65),
		target: 129.64,
		certainty: true,
		buyed: true,
	}),
	new Component({
		type: Type.GPU,
		brand: Brand.AMD,
		model: "Radeon RX 7900 XTX",
		description: "24Gb GDDR6 • 4K",
		image: "https://m.media-amazon.com/images/I/31q7quYSDvL._AC_US256_.jpg",
		sells: [
			new Sell({
				price: new Price(1123.00, 0),
				link: new Link("https://shop-eu-fr.amd.com/amd-radeon-rx-7900-xtx-graphics"),
			}),
		],
		bestPrice: new Price(1069.00, 0),
		target: 1087,
		certainty: true,
		buyed: true,
	}),
	new Component({
		type: Type.SSD,
		brand: Brand.CORSAIR,
		model: "MP600 PRO XT 1Tb M.2 NVMe",
		description: "Gen4 • PCIe x4 • Read 7100Mb • Write 5800Mb",
		image: "https://m.media-amazon.com/images/I/31t-v2rIjcL._AC_US256_.jpg",
		sells: [
			new Sell({
				price: new Price(87.97, 4.82),
				link: new Link("https://www.amazon.de/dp/B09F5Z6BJ6"),
			}),
			new Sell({
				price: new Price(102.89, 0),
				link: new Link("https://www.amazon.fr/dp/B09F5Z6BJ6"),
			}),
			new Sell({
				price: new Price(105.14, 4.82),
				link: new Link("https://www.amazon.es/dp/B09F5Z6BJ6"),
			}),
			new Sell({
				price: new Price(124.99, 0),
				link: new Link("https://www.topachat.com/pages/detail2_cat_est_micro_puis_rubrique_est_w_ssd_puis_ref_est_in20010807.html"),
			}),
		],
		bestPrice: new Price(69.90, 4.82),
		target: 98.81,
		certainty: true,
		buyed: true,
	}),
	new Component({
		type: Type.SSD,
		brand: Brand.CORSAIR,
		model: "MP600 PRO XT 2Tb M.2 NVMe",
		description: "Gen4 • PCIe x4 • Read 7100Mb • Write 6800Mb",
		image: "https://m.media-amazon.com/images/I/31t-v2rIjcL._AC_US256_.jpg",
		sells: [
			new Sell({
				price: new Price(149.99, 0),
				link: new Link("https://www.topachat.com/pages/detail2_cat_est_micro_puis_rubrique_est_w_ssd_puis_ref_est_in20010806.html"),
			}),
			new Sell({
				price: new Price(169.00, 4.66),
				link: new Link("https://www.amazon.de/dp/B09F5X8ZMY"),
			}),
			new Sell({
				price: new Price(174.99, 4.66),
				link: new Link("https://www.amazon.es/dp/B09F5X8ZMY"),
			}),
			new Sell({
				price: new Price(182.88, 0),
				link: new Link("https://www.amazon.fr/dp/B09F5X8ZMY"),
			}),
		],
		bestPrice: new Price(149.99, 0),
		target: 149.99,
		certainty: true,
		buyed: true,
	}),
	new Component({
		type: Type.SSD,
		brand: Brand.SAMSUNG,
		model: "980 1Tb M.2 NVMe",
		description: "PCIe 3.0 • Read 3500Mb • Write 3000Mb",
		image: "https://m.media-amazon.com/images/I/31XnYpheJbL._AC_US256_.jpg",
		sells: [
			new Sell({
				price: new Price(44.99, 4.61),
				link: new Link("https://www.amazon.de/dp/B08TJ2649W"),
			}),
			new Sell({
				price: new Price(57.37, 0),
				link: new Link("https://www.amazon.fr/dp/B08TJ2649W"),
			}),
			new Sell({
				price: new Price(65.20, 4.61),
				link: new Link("https://www.amazon.es/dp/B08TJ2649W"),
			}),
			new Sell({
				price: new Price(74.99, 0),
				link: new Link("https://www.topachat.com/pages/detail2_cat_est_micro_puis_rubrique_est_w_ssd_puis_ref_est_in20007748.html"),
			}),
		],
		bestPrice: new Price(44.99, 4.56),
		target: 49.55,
		certainty: true,
		buyed: true,
	}),
	new Component({
		type: Type.HDD,
		brand: Brand.SEAGATE,
		model: "Barracuda 4Tb",
		description: "SATA III • 5400 RPM • 3.5\"",
		image: "https://m.media-amazon.com/images/I/41Z-sFIFVOL._AC_US256_.jpg",
		sells: [
			new Sell({
				price: new Price(73.50, 5.23),
				link: new Link("https://www.amazon.es/dp/B0713R3Y6F"),
			}),
			new Sell({
				price: new Price(85.30, 0),
				link: new Link("https://www.amazon.fr/dp/B0713R3Y6F"),
			}),
			new Sell({
				price: new Price(80.35, 5.23),
				link: new Link("https://www.amazon.de/dp/B0713R3Y6F"),
			}),
			new Sell({
				price: new Price(80.99, 6.00),
				link: new Link("https://www.amazon.de/dp/B07115ZSQ6"),
			}),
			new Sell({
				price: new Price(76.55, 11.51),
				link: new Link("https://www.amazon.fr/dp/B07115ZSQ6"),
			}),
			new Sell({
				price: new Price(77.04, 12.56),
				link: new Link("https://www.amazon.es/dp/B07115ZSQ6"),
			}),
			new Sell({
				price: new Price(89.99, 0),
				link: new Link("https://www.topachat.com/pages/detail2_cat_est_micro_puis_rubrique_est_wdi_sata_puis_ref_est_in10106812.html"),
			}),
			new Sell({
				price: new Price(84.99, 5.40),
				link: new Link("https://www.amazon.de/dp/B07D9C7SQH"),
			}),
			new Sell({
				price: new Price(92.99, 0),
				link: new Link("https://www.amazon.fr/dp/B07D9C7SQH"),
			}),
		],
		bestPrice: new Price(70.29, 5.40),
		target: 75.69,
		certainty: true,
		buyed: true,
	}),
	new Component({
		type: Type.PSU,
		brand: Brand.BE_QUIET,
		model: "Straight Power 11 1000W",
		description: "Modular • 80+ Platinum",
		image: "https://m.media-amazon.com/images/I/41UDBwjuXmL._AC_US256_.jpg",
		sells: [
			new Sell({
				price: new Price(199.49, 0),
				link: new Link("https://www.amazon.fr/dp/B083SVLLCQ"),
			}),
			new Sell({
				price: new Price(199.29, 9.90),
				link: new Link("https://www.amazon.es/dp/B078WZSN2W"),
			}),
			new Sell({
				price: new Price(207.31, 16.91),
				link: new Link("https://www.amazon.de/dp/B083SVLLCQ"),
			}),
			new Sell({
				price: new Price(219.90, 9.66),
				link: new Link("https://www.amazon.es/dp/B083SVLLCQ"),
			}),
		],
		bestPrice: new Price(193.02, 6.00),
		target: 202.80,
		certainty: true,
		buyed: true,
	}),
	new Component({
		type: Type.CASE,
		brand: Brand.CORSAIR,
		model: "Obsidian 500D RGB SE",
		description: "50.01 x 23.7 x 50.7cm • 3 LL120 RGB fans included",
		image: "https://m.media-amazon.com/images/I/41y8mm4LplL._AC_US256_.jpg",
		sells: [
			new Sell({
				price: new Price(268.85, 14.87),
				link: new Link("https://www.amazon.fr/dp/B07C46L1D8"),
			}),
			new Sell({
				price: new Price(269.53, 19.61),
				link: new Link("https://www.amazon.de/dp/B07C46L1D8"),
			}),
			new Sell({
				price: new Price(249.00, 61.29),
				link: new Link("https://www.amazon.es/dp/B07C46L1D8"),
			}),
		],
		bestPrice: new Price(216.41, 19.61),
		target: 283.73,
		certainty: true,
		buyed: true,
	}),
	new Component({
		type: Type.KEYBOARD,
		brand: Brand.LOGITECH,
		model: "G815 LIGHTSYNC RGB",
		description: "AZERTY • GL Clicky switches",
		image: "https://m.media-amazon.com/images/I/4117+8ARx3L._AC_US256_.jpg",
		sells: [
			new Sell({
				price: new Price(163.74, 0),
				link: new Link("https://www.amazon.fr/dp/B07W8NTYNY"),
			}),
			new Sell({
				price: new Price(172.84, 0),
				link: new Link("https://www.amazon.fr/dp/B07W6JPFH1"),
			}),
			new Sell({
				price: new Price(184.99, 0),
				link: new Link("https://www.topachat.com/pages/detail2_cat_est_gaming_puis_rubrique_est_wg_pccla_puis_ref_est_in20000200.html"),
			}),
			new Sell({
				price: new Price(183.67, 6.90),
				link: new Link("https://www.amazon.es/dp/B07W6JPFH1"),
			}),
			new Sell({
				price: new Price(219.76, 6.90),
				link: new Link("https://www.amazon.de/dp/B07W6JPFH1"),
			}),
		],
		bestPrice: new Price(130.99, 0),
		target: 130.99,
		certainty: true,
		buyed: true,
	}),
]);

setup.populate(table, total, template);