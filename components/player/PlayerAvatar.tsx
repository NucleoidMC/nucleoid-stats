import Image, { ImageProps } from "next/image";
import { ImgHTMLAttributes } from "react";

interface Props {
    uuid: string
    size: number
    className: string
}

const PlayerAvatar: React.FC<Props> = (props) => {
    const { uuid, size, ...imgProps } = props;

    return <Image {...imgProps} src={`https://api.nucleoid.xyz/skin/face/64/${uuid}`} width={size} height={size} alt="avatar" />
}

export default PlayerAvatar;
