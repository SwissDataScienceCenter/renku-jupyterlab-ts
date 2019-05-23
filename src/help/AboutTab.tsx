import * as React from 'react';
import '../../style/help-style.css';
import '../../style/materialize/materialize.min.css';



class AboutTab extends React.Component {

    render() {
        return (
            [<div key="renku-about-header" className="section no-pad-bot" id="index-banner">
                <div className="container">
                    <br></br><br></br>
                    <h2 className="header center purple-text">Welcome to Renku!</h2>
                    <div className="row center">
                        <h5 className="header col s12 light">This is a JupyterLab instance with <a target="_blank" href="https://renku.readthedocs.io/en/latest/index.html#">Renku</a> running inside of it.</h5>
                    </div>
                </div>
            </div>,
            <div key="renku-about-main" className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center light-blue-text"><span className='icon-first-steps'></span></h2>
                                <h5 className="center">First steps with Renku</h5>
                                <p className="light center-align">If this is your first time using Reenku we recommend you to do our <a target="_blank" href="https://renku.readthedocs.io/en/latest/user/firststeps.html">tutorial</a>.</p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center light-blue-text"><span className='icon-help-cli'></span></h2>
                                <h5 className="center">Help with the CLI</h5>
                                <p className="light center-align"> Do you need more information about what you can do with our CLI? <a href="https://renku-python.readthedocs.io/en/latest/">Here</a> you can find our documentation.</p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center light-blue-text"><span className='icon-more-renku'></span></h2>
                                <h5 className="center">More about Renku</h5>
                                <p className="light center-align">Would you like to know more about renku? <a target="_blank" href="https://renku.readthedocs.io/en/latest/index.html#">Here</a> is a link to our general documentation.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center light-blue-text"><span className='icon-inspiration'></span></h2>
                                <h5 className="center">Inspiration</h5>
                                <p className="light center-align"> If you need some inspiration or you would like to see an overview of your projects you can find this in <a target="_blank" href="https://renkulab.io/">RenkuLab</a>.</p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center light-blue-text"><span className='icon-something-wrong'></span></h2>
                                <h5 className="center">Contact us</h5>
                                <p className="light center-align"> You can contact us thorugh  <a target="_blank" href="https://gitter.im/SwissDataScienceCenter/renku">Gitter</a> and see our project in <a target="_blank" href="https://github.com/SwissDataScienceCenter/renku">GitHub</a>. We will be happy to hear from you.
                                </p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center light-blue-text"><span className='icon-renku-team'></span></h2>
                                <h5 className="center">Renku Project</h5>
                                <p className="light center-align">Renku was created by the Swiss Data Science Center you can read about us <a target="_blank" href="https://datascience.ch/">here</a>.</p>
                            </div>
                        </div>
                    </div>

                </div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>, <footer key="renku-about-footer" className="about-footer">Built by the <a target="_blank" href="https://datascience.ch/">SDSC</a>. Icons by <a target="_blank" href="https://icons8.com/icon/11691/box-important">Icons8</a> </footer>]
        );
    }

} export default AboutTab;
