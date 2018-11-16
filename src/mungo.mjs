import OnOff from 'onoff';

const Gpio = OnOff.Gpio;

const IRRIGATION_CYCLE_INTERVAL = 3600000; //miliseconds = 1 hour
const IRRIGATION_CYCLE_DURATION = 300; //30 seconds

const waterPumpPin = 2;

export default class Irrigation {

	constructor() {
		this._waterPump = new Gpio(waterPumpPin, 'out');

		this._waterPump.writeSync(Gpio.LOW);

		this._irrigationInterval = null;
	}

	run() {
		this._irrigationCycle();
		this._irrigationInterval = setInterval(this._irrigationCycle.bind(this), IRRIGATION_CYCLE_INTERVAL);
	}

	stop() {
		clearInterval(this._irrigationInterval);
		this._waterPump.writeSync(Gpio.LOW);
	}

	async _irrigationCycle() {
		await this._activatePump();
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
