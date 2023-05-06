import { PropagateLoader } from 'react-spinners';

function Loader() {
    return (
        <div className="loading">
            <PropagateLoader color="rgb(255, 179, 109)" />
        </div>
    );
}

export default Loader;
