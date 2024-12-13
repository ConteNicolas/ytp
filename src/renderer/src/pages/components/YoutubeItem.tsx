
interface YoutubeItemProps {
    title: string;
    thumbnail: string;
    duration: string;
    views: string;
    likes: string;
    description: string;
    channel: {
        name: string;
        thumbnail: string;
    }
}


const YoutubeItem = ({ title, thumbnail, duration, views, likes, description, channel }: YoutubeItemProps) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <img src={thumbnail} className="w-full h-full rounded-md" />
            <div className="w-full h-1/3 flex flex-col justify-center items-center">
                <span className="text-sm font-bold">{title}</span>
                <span className="text-xs font-bold">{duration}</span>
                <span className="text-xs font-bold">{views}</span>
                <span className="text-xs font-bold">{likes}</span>
            </div>
            <div className="w-full h-2/3 flex flex-col justify-center items-center">
                <span className="text-xs font-bold">{description}</span>
                <span className="text-xs font-bold">{channel.name}</span>
            </div>
        </div>
    )
}

export default YoutubeItem;
