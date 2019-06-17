import * as React from 'react';
import '../../style/help-style.css';
import '../../style/materialize/materialize.min.css';


export interface IDocumentationLink {
    href: string;
};

class DocumentationLink extends React.Component<IDocumentationLink> {
    constructor(props: IDocumentationLink) {
        super(props);
    }

    render() {
        return <a target="_blank" href={this.props.href}>{this.props.children}</a>
    }
}


class AboutTab extends React.Component {

    render() {
        return (
            [<div key="renku-about-header" className="section no-pad-bot" id="index-banner">
                <div className="container">
                    <br></br><br></br>
                    <h2 className="header center purple-text">Welcome to Renku!</h2>
                    <div className="row center">
                        <h5 className="header col s12 light">This is a JupyterLab UI with <DocumentationLink href="https://renku.readthedocs.io/en/latest/index.html#">Renku</DocumentationLink> running inside of it.</h5>
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
                                <p className="light center-align">If this is your first time using Renku, we encourage you to start with our tutorial <DocumentationLink href="https://renku.readthedocs.io/en/latest/user/firststeps.html">tutorial</DocumentationLink>.</p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center light-blue-text"><span className='icon-help-cli'></span></h2>
                                <h5 className="center">Help with the CLI</h5>
                                <p className="light center-align"> Do you need more information about what you can do with our CLI? <DocumentationLink href="https://renku-python.readthedocs.io/en/latest/">Here</DocumentationLink> you can find our documentation.</p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center light-blue-text"><span className='icon-more-renku'></span></h2>
                                <h5 className="center">More about Renku</h5>
                                <p className="light center-align">Would you like to know more about renku? <DocumentationLink href="https://renku.readthedocs.io/en/latest/index.html#">Here</DocumentationLink> is a link to our general documentation.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center light-blue-text"><span className='icon-inspiration'></span></h2>
                                <h5 className="center">Inspiration</h5>
                                <p className="light center-align"> If you need some inspiration or you would like to see some public projects, you can browse around <DocumentationLink href="https://renkulab.io/">RenkuLab</DocumentationLink>.</p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center light-blue-text"><span className='icon-something-wrong'></span></h2>
                                <h5 className="center">Contact us</h5>
                                <p className="light center-align"> You can contact us through <DocumentationLink href="https://gitter.im/SwissDataScienceCenter/renku">Gitter</DocumentationLink> or our repository in <a target="_blank" href="https://github.com/SwissDataScienceCenter/renku">GitHub</a>. We would be happy to hear from you.
                                </p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center light-blue-text"><span className='icon-renku-team'></span></h2>
                                <h5 className="center">Renku Project</h5>
                                <p className="light center-align">Renku was created by the <DocumentationLink href="https://datascience.ch/">Swiss Data Science Center</DocumentationLink>.</p>
                            </div>
                        </div>
                    </div>

                </div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>, <footer key="renku-about-footer" className="about-footer">Built by the <DocumentationLink href="https://datascience.ch/">SDSC</DocumentationLink>. Icons by <DocumentationLink href="https://icons8.com/icon/11691/box-important">Icons8</DocumentationLink> </footer>]
        );
    }

} export default AboutTab;
