
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './screens/Login';
import Error from './components/Error';
import Workflow from './screens/Workflow';
import FlowDiagram from './screens/FlowDiagram';

const App: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/workflow" element={<Workflow/> }/>
                <Route path="/flow" element={<FlowDiagram/> }/>

                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
}
export default App;