import { h, Component } from 'preact';
import style from './style';
import addDate from '../../lib/streak.js'

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

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
		//this.timer = setInterval(this.updateTime, 1000);
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		//clearInterval(this.timer);
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
		return Math.round(differenceMilli / oneDay)
	}
	setStreakLength = () => {
		const begin = new Date(this.state.streakBegin)
		const today = new Date(this.state.today)
		if (begin != "") {
			let length = this.daysBetween(begin, today)
			this.setState({ streakLength: length })
		}
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, streakBegin, streakLength }) {

		Date.prototype.addDays = function(days) {
			const date = new Date(this.valueOf())
			date.setDate(date.getDate() + days)
			return date
		}
		const beginning = new Date(streakBegin)

		const dayArr = []
		for (let i = 0; i < streakLength; i++) {
			let streakDate = beginning.addDays(i)
			dayArr.push( [streakDate, streakDate.toDateString()] )
		}
		
		console.log(dayArr[0])
		
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
				
				<div>
					<ol>
						{ dayArr.map( ( day, index ) => 
							<li key={index}>
								{day[1]}
							</li>
						)} 
					</ol>
				</div>
			</div>
		);
	}
}
