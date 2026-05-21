import { useParams } from 'react-router-dom';

const DynamicPage = () => {
    const { slug } = useParams();

    return <h1>Dynamic Page for: {slug}</h1>;
};

export default DynamicPage;
