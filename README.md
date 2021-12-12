
<div id="top"></div>

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<div align="center">
    <img src="images/logo.png" alt="Logo" width="80" height="80">

  <h1 align="center">Gym App</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#demo">Demo</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


![Product Name Screen Shot][product-screenshot]
<a href="#demo">Demo</a>



"GymApp" is a university project related to the "Databases" course created for the purpose of managing a gym at the time of covid-19, via an online booking system, completely built from scratch.

Respectively for front-end, back-end and database the following tools have been used:
* __Front-end:__ The Angular 13 framework was used.
* __Back-End:__ Python, Flask and SQLAlchemy were used.
* __Database:__ PostgreSQL

In addition, __Docker__ was used to manage containers running the processes: Flask-App (back-end) and PosgreSQL database, in isolated environments!

This is a really really basic project based on a single postgreSQL database which is connected from a single flask rest-applications server which in turn communicates with the basic front-end webpage.
The purpose of this project is also to dockerize as much as possible, in order to, after-all enable a easy blue-red pipeline for CI/CD scope.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [Angular](https://angular.io/)
* [Python](https://www.python.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Bulma](https://bulma.io/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
* [Docker](https://www.docker.com/)
* [Docker-Compose](https://docs.docker.com/compose/)




<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

You should have installed Docker [here](https://docs.docker.com/get-docker/) in your local machine.

And also docker-compose [here](https://docs.docker.com/compose/install/).

Before proceeding with the build and run of the project be carefull on setting correctly the POSTGRES_HOST env variable inside the Dockerfile file.

In order to set it correctly check your own local machine ip, and set it as you see.


### Installation
After cloning this repository on your local machine:

<div align="center">
    
<h4> PostgreSQL(docker)</h4>

Command line for the PostgreSQL docker container : 

In the same folder of docker-compose.yml run : 
```
docker-compose up -d
```

To see the image and container you just created :
```
docker image ls
docker ps
```
</div>

<div align="center">
    <h4> Flask Application(docker) </h4>
Command list for the Flask docker container : 

In the same folder of the Dockerfile run : 
```
    docker build -t flask:0.1 .
    docker run -dit -p 5000:5000 flask:0.1
    docker container logs -f {id}
```
</div>


<!-- USAGE EXAMPLES -->
## Usage

Now you can interact with the rest-application server with Postman, for example : 
```
curl --location --request POST 'http://127.0.0.1:5000/add' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name" : "Ivan",
    "price" : 3000,
    "breed" : "type"
}'
```

```
curl --location --request GET 'localhost:5000/'
```
_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#top">back to top</a>)</p>


## Demo

<div id="demo"></div>
<span><img src="images/demo.gif" alt="demo"/></span>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/david-ambros-07404a174/
[product-screenshot]: images/fe.PNG
