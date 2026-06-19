import UserSidebar from './UserSidebar';
import MessageContainer from './MessageContainer';

const Home = () => {
    return (
        <div className="flex flex-1 h-full w-full bg-base-100 overflow-hidden">
            <UserSidebar />
            <MessageContainer />
        </div>
    )
}

export default Home;