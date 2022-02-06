import './App.css';
import { Frame417, FormCheckout } from './ui-components';

function App() {
  return (
    <div className="App">
    <Frame417 width={{ small: "300px", large: "600px", xl: "800px" }}/>
    <FormCheckout width={{ small: "300px", large: "600px", xl: "800px" }}/>
    </div>
  );
}

export default App;
