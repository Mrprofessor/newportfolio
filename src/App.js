import React, { Component } from 'react';
import Header from './Header';
import Menu from './Menu';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPostLoading: true,
            isProjectLoading: true
        }
        this.myCallback = this.myCallback.bind(this); 
    }
    componentDidMount() {
        // fetch posts
        let postURL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mrprofessor`;
        fetch(postURL)
            .then( (response) =>{
                return response.json();
            })
            .then( (data) => {
                this.setState({
                    isPostLoading: false,
                    postData: data.items,
                    isDone: false
                })
            })
            .catch((error) => {
                console.error(error); //set state to bad
            });
        
        // Fetch projects
        let projectURL = "https://mrprofessor.io/api/projectList/projectList.json";
        fetch(projectURL, {redirect: "follow"})
            .then( (response) => {
                return response.json();
            })
            .then( (data) => {
                this.setState({
                    isProjectLoading: false,
                    projectData: data.projects,
                    isDone: false
                })
            })
            .catch((error) => {
                console.error("Can't load projects.");
            });
    }
    myCallback(menu) {
        setTimeout(() => {
            this.setState({
                isDone : menu
            })
        }, 500)
        
        // console.log(this.state.isDone);
        // return menu;
    }
    
    render() {
        // console.log(this.myCallback);
        if (!this.state.isPostLoading && !this.state.isProjectLoading && this.state.isDone) {
            return (
                <div className="container">
                    <Header myCallback={this.myCallback}/>
                    <Menu posts={this.state.postData} projects={this.state.projectData} />
                </div>
            )
        }
        return (
            <div className="container">
                <Header myCallback={this.myCallback}/>
                {/* <Menu posts={this.state.postData} /> */}
            </div>
        )
    }
}

export default App;
