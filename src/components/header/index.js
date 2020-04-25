import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1>Cyclic Streak</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Rock</Link>
			<Link activeClassName={style.active} href="/profile">Cunt</Link>
			<Link activeClassName={style.active} href="/profile/john">John</Link>
		</nav>
	</header>
);

export default Header;
