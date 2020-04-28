import { h, Component } from "preact";
import style from "./style";
import Streak from "../../lib/streak.js";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: Date.now(),
      streak: "",
      streakBeginning: "Please enter a date",
      streakLength: "",
      streakList: [],
      months: [],
    };
  }

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

  onSubmit = (e) => {
    e.preventDefault();
    this.enterDate(this.state.streakBeginning)
  };

  onInput = (e) => {
    const { value } = e.target;
    this.setState({ streakBeginning: value });
  };
  enterDate = (input) => {
    console.log(input);
    
    let dateArr = input.split(" ");
    this.setState({
      streak: new Streak(dateArr[0], Number(dateArr[1]) - 1, dateArr[2]),
      streakBeginning: new Date(dateArr[0], Number(dateArr[1]) - 1, dateArr[2]),
    });
  };
  handleStreakBeginKeyDown = (e) => {
    console.log(e.type);
    if (e.keyCode != 13) return;
    e.preventDefault();
    this.enterDate(e.target.value);
  };

  generateStreak = () => {
    this.setState({
      streakBeginning: this.state.streak.beginning,
      streakLength: this.state.streak.streakLength,
      streakList: this.state.streak.list,
      months: this.state.streak.groupByMonth(),
    });
  };

  // Note: `user` comes from the URL, courtesy of our router
  render({}, { streak, streakBeginning, streakLength, months }) {
    function isDate(x) {
      return null != x && !isNaN(x) && "undefined" !== typeof x.getDate;
    }
    const showStreakBegin = () => {
      const beginning = streakBeginning;
      console.log("Beginning", beginning);
      if (!isDate(beginning)) {
        return beginning;
      }
      return beginning.toDateString();
    };
    console.log(showStreakBegin());
    return (
      <div class={style.profile}>
        <h1>Go</h1>

        <div>
          {/* <form onSubmit={this.generateStreak}>
            <p>When did your streak begin?</p>
            <input
              type="text"
              // value={streakBeginning}
              placeholder="YYYY MM DD"
              onInput={this.onInput}
              onKeyDown={this.handleStreakBeginKeyDown}
            />
            <p>Streak Beginning: {streakBeginning}</p>
            <button type="submit">Submit</button>
          </form> */}
          <form onSubmit={this.onSubmit}>
            <label>
              When did your Streak begin?
              <input
                placeholder="YYYY MM DD"
                autoFocus={true}
                onKeyDown={this.handleStreakBeginKeyDown}
                onInput={this.onInput}
                value={this.state.streakBeginning}
              />
              <button id="streakBeginInput" type="submit">
                Submit
              </button>
            </label>
            <p>Streak Begin {showStreakBegin()}</p>
          </form>
          <label>
            Gernerate Streak
            <button onClick={this.generateStreak}>Generate</button>
          </label>

          <p>Streak Length: {streakLength} Days</p>
        </div>

        <div>
          {months.map((month, index) => (
            <div>
              <h3 key={index}>
                {`${month[0]} ${month[2].length} of ${month[1]} Days`}
              </h3>
              <p>
                <ul>
                  {month[2].map((date, index) => (
                    <li key={index}>
                      {`Day ${date[2]}: ${date[0][0]} ${
                        date[0][2]
                      } ${streak.getChip(date)}`}
                    </li>
                  ))}
                </ul>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
