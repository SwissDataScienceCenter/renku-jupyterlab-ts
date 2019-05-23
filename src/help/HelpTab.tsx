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
                                <p className="light center-align">The nav bar is a tool that we developed in order to help you
                                <strong>create</strong> and <strong>run</strong> your renku projects.
                                    We preselected a list of usefull Git and Renku commands so you can run them with just a
                                single click.</p>
                            </div>
                        </div>

                        <div className="col s12 m12">
                            <div className="icon-block">
                            <h2 className="center light-blue-text"><span className='icon-what-it-does'></span></h2>
                                <h5 className="center">How does it work?</h5>
                                <p className="light center-align">You just have click the command that you want to run, you might
                                    have to complete some form (parameters) before you can run the command but you won't have to
                                remember what to fill, since it will be already there. <strong>After you click Run you will
                                        see the result of running this command in a terminal that will open
                                    automatically.</strong></p>
                            </div>
                        </div>

                        <div className="col s12 m12">
                            <div className="icon-block">
                            <h2 className="center light-blue-text"><span className='icon-something-else '></span></h2>
                                <h5 className="center">Can you do something else with it?</h5>
                                <p className="light center-align"><strong>Yes, you can also run a notebook using renku with papermill</strong>, we will scan the notebook for you to see if the notebook has some parameters and if it does the tab will provide you with an interface so you can edit the values of this parameters and re run "renku run papermill" with the new values of this parameters. </p>
                            </div>
                        </div>

                        <div className="col s12 m12">
                            <div className="icon-block">
                            <h2 className="center light-blue-text"><span className='icon-help-docu'></span></h2>
                                <h5 className="center">In need of some Help?</h5>
                                <p className="light center-align">No worries! you can click in About in our tab and we will provide you with links to our doumentation, tutorial and everything you need to know to start working with renku.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>, <footer key="renku-help-footer" className="about-footer">Built by the <a target="_blank" href="https://datascience.ch/">SDSC</a>. Icons by <a target="_blank" href="https://icons8.com/icon/11691/box-important">Icons8</a> </footer>]
        );
    }

} export default HelpTab;
