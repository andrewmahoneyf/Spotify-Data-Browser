import React from 'react';
 import _ from 'lodash';
 import './index.css'; //load CSS for this module
 import DataController from './DataController';
 import {Form, FormControl, InputGroup, Button, Glyphicon} from 'react-bootstrap';
 
 var SAMPLE_ARTISTS = [
   {artist:'J. Cole', genre:'Hip-Hop/Rap'}, {artist:'Drake', genre:'Hip-Hop/Rap'}, {artist:'Kendrick Lamar', genre:'Hip-Hop/Rap'}, {artist:'Red Hot Chili Peppers', genre:'Rock'}, {artist:'Fabolous', genre:'Hip-Hop/Rap'}, {artist:'Travis Scott', genre:'Hip-Hop/Rap'},
   {artist:'Lil Wayne', genre:'Hip-Hop/Rap'}, {artist:'Isaiah Rashad', genre:'Hip-Hop/Rap'}, {artist:'Chance The Rapper', genre:'Hip-Hop/Rap'}, {artist:'The Rolling Stones', genre:'Rock'}, {artist:'The Beatles', genre:'Classic Rock'}, {artist:'A$AP Rocky', genre:'Hip-Hop/Rap'}, 
   {artist:'Big Sean', genre:'Hip-Hop/Rap'}, {artist:'Bryson Tiller', genre:'RnB'}, {artist:'Meek Mill', genre:'Hip-Hop/Rap'}, {artist:'Bob Marley', genre:'Reggae'}, {artist:'Kanye West', genre:'Hip-Hop/Rap'}, {artist:'Nipsey Hussle', genre:'Hip-Hop/Rap'},
   {artist:'PartyNextDoor', genre:'RnB'}, {artist:'Curren$y', genre:'Hip-Hop/Rap'}, {artist:'Young Roddy', genre:'Hip-Hop/Rap'}, {artist:'Logic', genre:'Hip-Hop/Rap'}, {artist:'Lil Snupe', genre:'Hip-Hop/Rap'}, {artist:'Lil Yachty', genre:'Hip-Hop/Rap'}, {artist:'Ty Dolla $ign', genre:'RnB'},
   {artist:'ChainSmokers', genre:'EDM'}, {artist:'Frank Ocean', genre:'RnB'}, {artist:'Rich Homie Quan', genre:'Hip-Hop/Rap'}, {artist:'Young Thug', genre:'Hip-Hop/Rap'}, {artist:'YG', genre:'Hip-Hop/Rap'}, {artist:'Wiz Khalifa', genre:'Hip-Hop/Rap'}, {artist:'ScHoolboy Q', genre:'Hip-Hop/Rap'}
 ];
 
 class App extends React.Component {
   constructor(props){
     super(props);
     this.state = {tracks:[], totalResults:0, searchValue:'hits'};
     this.fetchData = this.fetchData.bind(this);
     this.fetchData(this.state.searchValue);
   }
   fetchData(searchTerm) {
     var thisComponent = this; 
     DataController.search(searchTerm)
       .then(function(data) {
         thisComponent.setState({tracks:data.tracks.items, totalResults:data.tracks.items.length})
       })
       .catch( (err) => this.setState({tracks:[], totalResults:0}));
   }
   render() {
     return (
       <div>
         <header className="well">
           <div className="container" role="banner" >
             <h1>SPOTIFY HITS</h1>
             <p>Search for your favorite songs and artists</p>
           </div>
         </header>
 
         <main className="container">
           <div className="row">
             <div className="col-xs-3" role="navigation">
               <Navigation searchFunction={this.fetchData} />
             </div>
             <div className="col-xs-9">
               <SearchForm searchFunction={this.fetchData} resultCount={this.state.totalResults}/>
               <SongList songs={this.state.tracks} />
             </div>
           </div>
         </main>
 
         <footer className="container" role="contentinfo">
           <small>Images from <a href="https://www.spotify.com/us/" alt="Spotify link">Spotify</a></small>
         </footer>
       </div>
     );
   }
 }
 
 class Navigation extends React.Component { 
    constructor(props){
     super(props);
     this.state = {tracks: SAMPLE_ARTISTS};
   }
   render() {
     var genres = Object.keys(_.groupBy(this.state.tracks, 'genre'))
     var artists = Object.keys(_.groupBy(this.state.tracks, 'artist'))
     return (
       <div>
         <Artists artists={artists} searchFunction={this.props.searchFunction} />
         <Genres genres={genres} />
         <AboutLinks />
       </div>
     );
   }
 }
 
 class Genres extends React.Component {
   render() {
     var links = this.props.genres.map(function(genre){
       return <li key={genre}><a>{genre}</a></li>;
     })
     return (
         <nav>
           <h2>Genres</h2>
           <ul className="list-unstyled">
             {links}
           </ul>            
         </nav>
     );
   }
 }
 
 class Artists extends React.Component {
   constructor(props){
     super(props);
     this.handleCLick = this.handleCLick.bind(this);
   }
   handleCLick(event){
     var search = event.target.text;
     this.props.searchFunction(search);
   }
   render() {
     var links = this.props.artists.map(function(artist){
       return <li key={artist}><a>{artist}</a></li>;
     })
     return (
       <nav>
         <h2>My Favorite Artists</h2>
         <ul className="list-unstyled"  onClick={this.handleCLick}>
           {links}
         </ul>
       </nav>      
     );
   }
 }
 
 class AboutLinks extends React.Component {
   render() {
     return (
       <nav>
         <h2>About</h2>
         <ul className="list-unstyled">
           <li><a>How to Search</a></li>
           <li><a>Donate</a></li>
           <li><a>About Us</a></li>
         </ul>
       </nav>      
     );
   }
 }
 
 class SongList extends React.Component {
   render() {
     var songResults = this.props.songs.map(function(song){
       return <Song songcard={song} />;
     })
     return (
       <div>
         <h2>Song Results:</h2>
         <div className="cards-container">
           {songResults}
         </div>
       </div>
     );
   }
 }
 
 class Song extends React.Component {
   render() {
     var song = this.props.songcard
     return (
       <div className="card">
         <div className="content">
           <img src={song.album.images[1].url} alt={song.name} />
           <h3>{song.name}</h3>
           <p>Artist: {song.album.artists[0].name} 
           <br /> Album: {song.album.name} 
           <br /> Popularity: {song.popularity}% 
           <br /> <a href={song.preview_url} target="_new" alt="Play"><input type="button" value="Play"/> </a></p>
         </div>
       </div>
     );
   }
 }
 
 class SearchForm extends React.Component {  
   constructor(props){
     super(props);
     this.state = {searchValue: ''}
     this.handleCLick = this.handleCLick.bind(this);
     this.handleTyping = this.handleTyping.bind(this);
   }
   handleTyping(event){
     this.setState( {searchValue: event.target.value} );
   }
   handleCLick(){
     this.props.searchFunction(this.state.searchValue);
   }
   render() {
     return (
       <Form inline>
         <InputGroup>
           <InputGroup.Button>
             <Button onClick={this.handleCLick}>
               <Glyphicon glyph="search" aria-label="Search"/>
             </Button>
           </InputGroup.Button>
           <FormControl type="text" placeholder="Search..." onChange={this.handleTyping} />
           <InputGroup.Addon> {this.props.resultCount} results </InputGroup.Addon>
         </InputGroup>
       </Form>
     );
   }
 }
 
 export default App;