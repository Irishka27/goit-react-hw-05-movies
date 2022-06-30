import Navigation from "components/Navigation";
import s from './AppBar.module.css';

export default function AppBar() {
    return (
        <header className={s.header}>
            <Navigation />
        </header>
    )
}