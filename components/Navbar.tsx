import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import logo from '../public/nucleoid_logo.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { T } from './translations';

export default function Navbar() {
    return <nav className={styles.nav}>
        <Link href='https://nucleoid.xyz/'>
            <a>
                <Image src={logo} alt="Nucleoid logo" layout='fixed' />
            </a>
        </Link>

        <NavLink href='/games'>
            <T k='nucleoid.nav.recent_games' />
        </NavLink>
        <NavLink href='/leaderboards'>
            <T k='nucleoid.nav.leaderboards' />
        </NavLink>
        <NavLink href='/wrapped'>
            {/* From: https://icon-sets.iconify.design/basil/present-solid/ */}
            <svg className={styles.wrappedIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M6.25 5.5A3.25 3.25 0 0 1 12 3.423A3.25 3.25 0 0 1 17.062 7.5H18a2.5 2.5 0 0 1 2.5 2.5v1.25a.75.75 0 0 1-.75.75h-6.7a.3.3 0 0 1-.3-.3V8.24a3.267 3.267 0 0 1-.75-.663a3.267 3.267 0 0 1-.75.662V11.7a.3.3 0 0 1-.3.3h-6.7a.75.75 0 0 1-.75-.75V10A2.5 2.5 0 0 1 6 7.5h.938a3.236 3.236 0 0 1-.688-2Zm5 0a1.75 1.75 0 1 0-3.5 0a1.75 1.75 0 0 0 3.5 0Zm1.5 0a1.75 1.75 0 1 0 3.5 0a1.75 1.75 0 0 0-3.5 0Z" clip-rule="evenodd"/><path fill="currentColor" d="M11.25 13.65a.3.3 0 0 0-.3-.3H5.649a.833.833 0 0 0-.82.692a11.592 11.592 0 0 0 0 3.916l.224 1.309a2.008 2.008 0 0 0 1.755 1.656l1.065.119a37.15 37.15 0 0 0 3.071.215a.298.298 0 0 0 .306-.299V13.65Zm1.806 7.607a.298.298 0 0 1-.306-.299V13.65a.3.3 0 0 1 .3-.3h5.301c.406 0 .752.292.82.692c.223 1.296.223 2.62 0 3.916l-.223 1.309a2.008 2.008 0 0 1-1.756 1.656l-1.065.119a37.177 37.177 0 0 1-3.071.215Z"/></svg>
            Wrapped
        </NavLink>
    </nav>
}

const NavLink: React.FC<{ href: string }> = ({ href, children }) => {
    const router = useRouter();

    if (router.pathname.startsWith(href)) {
        return <Link href={href}>
            <a className={styles.selected}>
                {children}
            </a>
        </Link>
    } else {
        return <Link href={href}>
            <a>
                {children}
            </a>
        </Link>
    }
}
