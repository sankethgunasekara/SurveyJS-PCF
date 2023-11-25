import * as React from 'react';
import SeerSurvey from './SeerSurvey';
import SurveyComponent from './Seer2';


class App extends React.Component {
    public render() {
        return (
            <div className="App">
            <SeerSurvey />
            {/* <SurveyComponent /> */}
          </div>
        )
    }
}

export default App;