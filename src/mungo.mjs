import OnOff from 'onoff';

const Gpio = OnOff.Gpio;

const IRRIGATION_CYCLE_INTERVAL = 7200000; //miliseconds = 2 hours
const IRRIGATION_CYCLE_DURATION = 200; //20 seconds

const waterPumpPin = 2;

export default class Irrigation {

	constructor() {
		this._waterPump = new Gpio(waterPumpPin, 'out');

		thiw._waterPump.writeSync(Gpio.LOW);
	}

	run() {
		setInterval(this._irrigationCycle.bind(this), IRRIGATION_CYCLE_INTERVAL);
	}

	_irrigationCycle() {
		this._activatePump();
	}

	async _activatePump() {
		this._waterPump.writeSync(Gpio.HIGH);

		for (let i = 0; i < IRRIGATION_CYCLE_DURATION; i++) {
			
			await this._sleep(100);
		}

		this._waterPump.writeSync(Gpio.LOW);

		return 0;
	}

	_sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
