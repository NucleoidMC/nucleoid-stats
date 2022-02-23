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
