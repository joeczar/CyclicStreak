import { h, Component } from 'preact';
import style from './style';
import Streak from '../../lib/streak.js'

export default class Profile extends Component {
	state = {
		time: Date.now(),
        streak: "",
        streakBeginning: new Date(),
        streakLength: "",
        streakList: [],
        months: []
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
		this.setState({ 
            streak: new Streak(dateArr[0], Number(dateArr[1]) - 1, dateArr[2]),
            
		})
		console.log(this.state.streak) 
	}
	generateStreak = e => {
		this.setState({ 
            streakBeginning: this.state.streak.beginning,
            streakLength: this.state.streak.streakLength,
            streakList: this.state.streak.list,
            months: this.state.streak.groupByMonth()
        })
	}
	
	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, streak, streakBeginning, streakLength, streakList, months }) {
        
        
        console.log(months)
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
                    <label>
                        Gernerate Streak
                        <button onClick={this.generateStreak}>Generate</button>
                    </label>
					<p>
						Streak Begin {streakBeginning.toDateString()}
					</p>
					<p>
						
						Streak Length: {streakLength} Days
					</p>
				</div>
				
				<div>
					<ol>
					 { months.map( ( month, index ) => 
							<li key={ index }>
								{`${ month[0] } ${ month[2].length } of ${ month[1] } Days` }
								<ul>
									{ month[2].map(( date, index ) => 
									<li key={ index }>
										{
										`Day ${ date[2] }: ${ date[0][0] } ${ date[0][2] } ${ streak.getChip(date) }` }
									</li>
									)}
								</ul>
							</li>
						)} 
					</ol>
				</div>
			</div>
		);
	}
}
