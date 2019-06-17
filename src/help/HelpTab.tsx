import * as React from 'react';
import '../../style/help-style.css';
import '../../style/materialize/materialize.min.css';



class HelpTab extends React.Component {

    render() {
        return (
            [<div key="renku-help-header" className="section no-pad-bot" id="index-banner">
                <div className="container">
                    <br /><br />
                    <h2 className="header center purple-text">We are here to help you!</h2>
                </div>
            </div>
                ,
            <div key="renk-help-body" className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12 m12">
                            <div className="icon-block">
                                <h2 className="center light-blue-text"><span className='icon-what-is'></span></h2>
                                <h5 className="center">What is the nav bar?</h5>
                                <p className="light center-align">The nav bar is a tool that we developed in order to help you <strong>create</strong> and <strong>run</strong> your renku projects. We preselected a list of useful Git and Renku commands so you can run them with just a single click.</p>
                            </div>
                        </div>

                        <div className="col s12 m12">
                            <div className="icon-block">
                            <h2 className="center light-blue-text"><span className='icon-what-it-does'></span></h2>
                                <h5 className="center">How does it work?</h5>
                                <p className="light center-align">You just have click the command that you want to run, you might
                                    have to provide some parameters before you can run the command, but you won't have to
                                    remember what to fill, since it will be already there. The results of
                                    running a command will be shown in a terminal that will open automatically.</p>
                            </div>
                        </div>

                        <div className="col s12 m12">
                            <div className="icon-block">
                            <h2 className="center light-blue-text"><span className='icon-something-else '></span></h2>
                                <h5 className="center">What is an example of its functionality?</h5>
                                <p className="light center-align">One example is executing a notebook using renku with <a target="_blank" href="https://github.com/nteract/papermill">papermill</a>. We will scan the notebook for you to see if it has any parameters, provide you with an interface so you can edit the values of these parameters, and execute <code>renku run papermill</code> with the parameters you provide.</p>
                            </div>
                        </div>

                        <div className="col s12 m12">
                            <div className="icon-block">
                            <h2 className="center light-blue-text"><span className='icon-help-docu'></span></h2>
                                <h5 className="center">In need of some help?</h5>
                                <p className="light center-align">No worries! You can click on "About Renku" in our tab, and you will find links to our documentation, tutorial and everything you need to know to start working with renku.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>, <footer key="renku-help-footer" className="about-footer">Built by the <a target="_blank" href="https://datascience.ch/">SDSC</a>. Icons by <a target="_blank" href="https://icons8.com/icon/11691/box-important">Icons8</a> </footer>]
        );
    }

} export default HelpTab;
