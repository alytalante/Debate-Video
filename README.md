<p align="center">
<img src='https://i.imgur.com/nOKnjLK.png'  width='600'>
</p>

<h1>Overview</h1>

Debate Video is a site to how videos of intercollegiate deabte in the NPDA/NPTE format. Every year, hundreds of rounds are recorded at various tournaments but these rounds are not centralized in a single location. Due to varying tagging and naming practices, it can be hard to find these rounds when querying youtube. This is where we come in: our site allows users to feature debate videos on our site in a single databse with query requests optimized towards the sorts of data associated with these rounds. 

<h1>Technologies</h1>

<ul>
  <li> HTML5
  <li> CSS
  <li> Javascript(ES6)
  <li> React
  <li> Node.js
  <li> Express
  <li> Mongoose
  <li> MongoDB
  <li> Git
  <li> Github 
</ul>

<h1>How It Works:</h1>

1. Users can copy and paste a youtube video link into the upload form. Our code then parses the url to extract the video ID and makes a GET request to the Youtube API to get data on this specific video. Once the data associated with the video has been fetched, the app checks the data against a MongoDB database to determine if the video has already been copied over to the database. If it has not, a new video object is created which includes the iframe html, video name, and video ID returned from the Youtube API and adds tags and round date entered by the user. This new video object is then posted to database via a REST API.

2. Once a video object has been entered into the database via POST request, it can be viewed on the site. Individual video pages are generate using dynamic routing. The URL for the page contains the video ID, and a useEffect hook then fetches API data based on that ID. The data is then rendered as an embedded video with a title, round information, and tags generated as text. 

3. Using Mongoose, the app's API allows for users to query data in the database. On the front-end this is connected to a search bar which accepts user input and query's the database using this input. 


<h1>Visuals and Features:</h1>

1. Easy to follow upload instructions to ensure ease of use and standard data entry practices. 

<p align="center">
<img src='https://i.imgur.com/y3mOlzF.png'  width='500'>
<img src='https://i.imgur.com/jL7dahE.png'  width='500'>
<img src='https://i.imgur.com/b7QcwX2.png'  width='500'>
</p>

2. Dynamically generated pages for individual videos which display relevant data and embed the video itself.


<p align="center">
<img src='https://i.imgur.com/sTzVhz8.png'  width='600'>
</p>

3. In-deoth search functionality to allow users to easily find and view videos. 

<p align="center">
<img src='https://i.imgur.com/eEIeiDH.png'  width='600'>
</p>
