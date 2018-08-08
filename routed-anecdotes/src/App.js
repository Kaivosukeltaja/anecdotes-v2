import React from 'react'
import { FormGroup, ControlLabel, FormControl, ListGroup, ListGroupItem, Grid, Row, Col, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import Anecdote from './components/Anecdote'
import styles from './styles'

const Menu = () => (
  <div>    
    <NavLink exact style={styles.link} to="/" activeStyle={styles.linkActive}>anecdotes</NavLink>&nbsp;
    <NavLink style={styles.link} to="/create" activeStyle={styles.linkActive}>create new</NavLink>&nbsp;
    <NavLink style={styles.link} to="/about" activeStyle={styles.linkActive}>about</NavLink>&nbsp;
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => (
        <ListGroupItem key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </ListGroupItem>
      ))}
    </ListGroup>  
  </div>
)

const About = () => (
  <Grid>
    <Row>
      <Col sm={8}>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col sm={4}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg" alt="Ada Lovelace" style={styles.ada} />
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div style={styles.footer}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>
              content 
            </ControlLabel>
            <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
            <ControlLabel>
              author
            </ControlLabel>
            <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
            <ControlLabel>
              url for more info
            </ControlLabel>
            <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
            <Button bsStyle="primary" type="submit" style={styles.submitButton}>create</Button>
          </FormGroup>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.showNotification(`Added new anecdote ${anecdote.content}`)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  showNotification = (notification) => {
    this.setState({ notification })
    window.setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <div style={styles.navigationBar}>
              <div className="container">
                <div style={styles.navigation}>
                  <h1 style={styles.title}>Software anecdotes</h1>
                  <Menu />
                </div>
              </div>
            </div>
            <div className="container">
              { this.state.notification &&
                <div style={styles.notification}>{this.state.notification}</div>
              }
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route path="/about" render={() => <About />} />
              <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew} />} />
              <Route path="/anecdotes/:id" render={({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
              <Footer />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
