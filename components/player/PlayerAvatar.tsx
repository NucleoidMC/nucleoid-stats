import Image from "next/image";
import notFound from '../../assets/notfound.png';
import styles from './PlayerAvatar.module.css';

interface Props {
    uuid?: string
    size: number
    className: string
}

const PlayerAvatar: React.FC<Props> = (props) => {
    const { uuid, size, className, ...imgProps } = props;

    if (uuid) {
        return <Image {...imgProps} className={className + ' ' + styles.avatar} src={`https://api.nucleoid.xyz/skin/face/64/${uuid}`} width={size} height={size} alt="avatar" />
    } else {
        return <Image {...imgProps} className={className + ' ' + styles.avatar} unoptimized={true} src={notFound} width={size} height={size} alt="avatar" />
    }
}

export default PlayerAvatar;
