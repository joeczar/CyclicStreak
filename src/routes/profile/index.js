import { h, Component } from 'preact';
import style from './style';

export default class Profile extends Component {
	state = {
		time: Date.now(),
		count: 10,
		today: new Date(),
		streakBegin: "",
		streakLength: 0
	};

	// update the current time
	updateTime = () => {
		this.setState({ time: Date.now() });
	};

	increment = () => {
		this.setState({ count: this.state.count+1 });
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	handleStreakBeginKeyDown = e => {
		if (e.keyCode != 13) return
		e.preventDefault()
		let dateArr = e.target.value.split(" ")
		console.log(dateArr)
		this.setState({ 
			streakBegin: new Date(dateArr[0], Number(dateArr[1]) - 1, dateArr[2]),
			beginArr:  dateArr
		})
		console.log(this.state.streakBegin) 
	}
	handleStreakBegin = e => {
		this.setState({ streakBegin: e.target.value })
	}
	daysBetween = (startDate, endDate) => {
		const oneDay = 1000 * 60 * 60 * 24

		const differenceMilli = Math.abs(endDate - startDate)
		console.log(startDate, endDate, differenceMilli)
		return Math.round(differenceMilli / oneDay)
	}
	setStreakLength = () => {
		const begin = new Date(this.state.streakBegin)
		const today = new Date(this.state.today)
		if (begin != "") {
			let length = this.daysBetween(begin, today)
			console.log(length)
			this.setState({ streakLength: length })
		}
	}
	

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count, streakBegin, streakLength }) {
		//const streakBeginString = streakBegin.toLocaleString()
		return (
			<div class={style.profile}>
				<h1>Profile: {user}</h1>
				<p>This is the user profile for a user named { user }.</p>

				<div>Current time: {new Date(time).toLocaleString()}</div>
				<div>
				<label>
						When did your Streak begin?
						<input
							placeholder='YYYY MM DD'
							autoFocus={true}
							// onInput={this.handleStreakBegin}
							onKeyDown={this.handleStreakBeginKeyDown}
						>
						</input>
						
					</label>
					<p>
						Streak Begin {streakBegin.toLocaleString()}
					</p>
					<p>
						<button onClick={this.setStreakLength}>Get Streak Length</button>
						Streak Length: {streakLength} Days
					</p>
				</div>
				<p>
					
					<button onClick={this.increment}>Click Me</button>
					{' '}
					Clicked {count} times.
				</p>
			</div>
		);
	}
}
