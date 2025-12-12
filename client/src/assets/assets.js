import logo from './logo.png'
import googlePlay from './googlePlay.svg'
import appStore from './appStore.svg'
import screenImage from './screenImage.svg'
import profile from './profile.png'
import bgImage from './bg_image.jpg'

export const assets = {
    logo,
    googlePlay,
    appStore,
    screenImage,
    profile,
    bgImage,
}

export const dummyTrailers = [
    {
        image: "https://i.ytimg.com/vi/BD6PoZJdt_M/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAY2CdKhOnz9uU_-PmJFwZjiSzzVA",
        videoUrl: 'https://www.youtube.com/watch?v=BD6PoZJdt_M&t=2s'
    },
    {
        image: "https://i.ytimg.com/vi/HXWRTGbhb4U/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAif0BBKk8ViZCLGwFIIinmsxR08Q",
        videoUrl: 'https://www.youtube.com/watch?v=HXWRTGbhb4U'
    },
    {
        image: "https://i.ytimg.com/vi/MKoSM_7OVhw/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDnMu2PadCaT4OZuj3xrte87ycoow",
        videoUrl: 'https://www.youtube.com/watch?v=MKoSM_7OVhw'
    },
    {
        image: "https://i.ytimg.com/vi/-cmwzbZ072U/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAvN1wD9huokIaDMiL3MyVgGuGwXQ",
        videoUrl: 'https://www.youtube.com/watch?v=-cmwzbZ072U'
    },
    {
        image: "https://img.youtube.com/vi/WpW36ldAqnM/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=WpW36ldAqnM'
    },
    {
        image: "https://img.youtube.com/vi/-sAOWhvheK8/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=-sAOWhvheK8'
    },
    {
        image: "https://img.youtube.com/vi/1pHDWnXmK7Y/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=1pHDWnXmK7Y'
    },
    {
        image: "https://img.youtube.com/vi/umiKiW4En9g/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=umiKiW4En9g'
    },
]

const dummyCastsData = [
    { "name": "Milla Jovovich", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", },
    { "name": "Dave Bautista", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", },
    { "name": "Arly Jover", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", },
    { "name": "Amara Okereke", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", },
    { "name": "Fraser James", "profile_path": "https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg", },
    { "name": "Deirdre Mullins", "profile_path": "https://image.tmdb.org/t/p/original/lJm89neuiVlYISEqNpGZA5kTAnP.jpg", },
    { "name": "Sebastian Stankiewicz", "profile_path": "https://image.tmdb.org/t/p/original/hLN0Ca09KwQOFLZLPIEzgTIbqqg.jpg", },
    { "name": "Tue Lunding", "profile_path": "https://image.tmdb.org/t/p/original/qY4W0zfGBYzlCyCC0QDJS1Muoa0.jpg", },
    { "name": "Jacek Dzisiewicz", "profile_path": "https://image.tmdb.org/t/p/original/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg", },
    { "name": "Ian Hanmore", "profile_path": "https://image.tmdb.org/t/p/original/yhI4MK5atavKBD9wiJtaO1say1p.jpg", },
    { "name": "Eveline Hall", "profile_path": "https://image.tmdb.org/t/p/original/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg", },
    { "name": "Kamila Klamut", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", },
    { "name": "Caoilinn Springall", "profile_path": "https://image.tmdb.org/t/p/original/uZNtbPHowlBYo74U1qlTaRlrdiY.jpg", },
    { "name": "Jan Kowalewski", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", },
    { "name": "Pawel Wysocki", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", },
    { "name": "Simon Lööf", "profile_path": "https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg", },
    { "name": "Tomasz Cymerman", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", }
]

export const dummyShowsData = [
    {
        "_id": "324548",
        "id": 324548,
        "title": "JUJUTSU KAISEN: Hidden Inventory / Premature Death - The Movie (2025)",
        "overview": "Pursued by a religious cult and other curse users, former friends Satoru Gojo and Suguru Geto are the only sorcerers capable of carrying the difficult task of protecting Riko Amanai, a student who has been designated to be sacrificed as the Star Plasma Vessel, until she can fulfill her duty.",
        "poster_path": "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/kZkyr1sRzarENrxjtltPvmHRrTk.jpg",
        "backdrop_path": "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/mA1mDJ7RB1zH8pyPCMb2J749uq5.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 14, "name": "Fantasy" },
            { "id": 12, "name": "Animation" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-10-10",
        "original_language": "en",
        "tagline": "The bond of the strongest duo, a time they lost forever...",
        "vote_average": 8.4,
        "vote_count": 15000,
        "runtime": 112,
        "trailer_link": "https://www.youtube.com/embed/A0p4XMdWvm8?si=lQRIcZsk-ewjmKCd"
    },
    {
        "_id": "324549",
        "id": 324549,
        "title": "Black Phone 2 (2025)",
        "overview": "Four years after escaping The Grabber, Finney Blake is struggling with his life after captivity. When his sister Gwen begins receiving calls in her dreams from the black phone and seeing disturbing visions of three boys being stalked at a winter camp, the siblings become determined to solve the mystery and confront a killer who has grown more powerful in death and more significant to them than either could imagine.",
        "poster_path": "https://media.themoviedb.org/t/p/w220_and_h330_face/xUWUODKPIilQoFUzjHM6wKJkP3Y.jpg",
        "backdrop_path": "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/oe2TOWykcLSGq67XPH4Bb0N1oU3.jpg",
        "genres": [
            { "id": 29, "name": "Horror" },
            { "id": 14, "name": "Thriller" },

        ],
        "casts": dummyCastsData,
        "release_date": "2025-10-10",
        "original_language": "en",
        "tagline": "Dead is just a word.",
        "vote_average": 5.4,
        "vote_count": 15000,
        "runtime": 114,
        "trailer_link": "https://www.youtube.com/embed/pWNucAcRoBY?si=52XzNuHnWHaopa3T"
    },
    {
        "_id": "324550",
        "id": 324550,
        "title": "Godzilla Minus One (2025)",
        "overview": "Godzilla Minus One is set in post-war Japan, where the country is recovering from the devastation of World War II. Amidst the ruins, Godzilla emerges from the sea, bringing destruction and chaos once again. The film explores themes of resilience, hope, and the human spirit as Japan faces this new threat while trying to rebuild itself.",
        "poster_path": "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/2E2WTX0TJEflAged6kzErwqX1kt.jpg",
        "backdrop_path": "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/bWIIWhnaoWx3FTVXv6GkYDv3djL.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 29, "name": "Horror" },
            { "id": 30, "name": "Science Fiction" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-10-10",
        "original_language": "en",
        "tagline": "Survive and fight. Live and resist.",
        "vote_average": 7.4,
        "vote_count": 15000,
        "runtime": 112,
        "trailer_link": "https://www.youtube.com/embed/MSp68m8OJus?si=aspRDGgzIKfAjWqk"
    },
    {
        "_id": "324551",
        "id": 324551,
        "title": "Predator: Badlands (2025)",
        "overview": "Cast out from his clan, a young Predator finds an unlikely ally in a damaged android and embarks on a treacherous journey in search of the ultimate adversary.",
        "poster_path": "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/ef2QSeBkrYhAdfsWGXmp0lvH0T1.jpg",
        "backdrop_path": "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/82lM4GJ9uuNvNDOEpxFy77uv4Ak.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 31, "name": "Adventure" },
            { "id": 30, "name": "Science Fiction" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-10-10",
        "original_language": "en",
        "tagline": "First hunt. Last chance.",
        "vote_average": 8.4,
        "vote_count": 15000,
        "runtime": 112,
        "trailer_link": "https://www.youtube.com/embed/9PgcAIgpwPA?si=FS8xunj2MvPkOw4W"
    },
    {
        "_id": "324544",
        "id": 324544,
        "title": "Good Fortune (2025)",
        "overview": "A well-meaning but rather inept angel named Gabriel meddles in the lives of a struggling gig worker and a wealthy capitalist.",
        "poster_path": "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/r83HIGA0mUiy7I9qVr17pF7SCDP.jpg",
        "backdrop_path": "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/q2V1q2Xxwqg3uXQKufpdCtrnAdn.jpg",
        "genres": [
            { "id": 18, "name": "Comedy" },
            { "id": 14, "name": "Fantasy" },
        ],
        "casts": dummyCastsData,
        "release_date": "2025-02-27",
        "original_language": "en",
        "tagline": "She seeks the power to free her people.",
        "vote_average": 6.8,
        "vote_count": 15000,
        "runtime": 102,
        "trailer_link": "https://www.youtube.com/embed/SAMkXY2Ja80?si=7OqPXY5W4zJ5Jy1n"
    },
    {
        "_id": "324534",
        "id": 324534,
        "title": "TRON: Ares (2025)",
        "overview": "A highly sophisticated Program called Ares is sent from the digital world into the real world on a dangerous mission, marking humankind's first encounter with A.I. beings.",
        "poster_path": "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/chpWmskl3aKm1aTZqUHRCtviwPy.jpg",
        "backdrop_path": "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/np0dsehLDdbfyHFRtqCiL1GR0TQ.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 31, "name": "Adventure" },
            { "id": 30, "name": "Science Fiction" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-02-27",
        "original_language": "en",
        "tagline": "She seeks the power to free her people.",
        "vote_average": 6.4,
        "vote_count": 15000,
        "runtime": 102,
        "trailer_link": "https://www.youtube.com/embed/gNa0j4mQo1k?si=imvbSMAz0RV3P2FI"
    },
    {
        "_id": "324535",
        "id": 324535,
        "title": "G-DRAGON IN CINEMA [Übermensch] (2025)",
        "overview": "A well-meaning but rather inept angel named Gabriel meddles in the lives of a struggling gig worker and a wealthy capitalist.",
        "poster_path": "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/9CpFMgqJXuv6rGkj55j28RD4cv8.jpg",
        "backdrop_path": "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/jSyBYgTBmnV5SK9jdj6VpqBdeyW.jpg",
        "genres": [
            { "id": 10, "name": "Music" },
            { "id": 17, "name": "Documentary" },
        ],
        "casts": dummyCastsData,
        "release_date": "2025-02-27",
        "original_language": "en",
        "tagline": "The Legend Returns. The Stage Trembles.",
        "vote_average": 6.4,
        "vote_count": 15000,
        "runtime": 102,
        "trailer_link": "https://www.youtube.com/embed/sIGBBl9kY-M?si=PDLt5lF8-fTn-RqW"
    },
    {
        "_id": "324536",
        "id": 324536,
        "title": "The Wind Rises (2013)",
        "overview": "A well-meaning but rather inept angel named Gabriel meddles in the lives of a struggling gig worker and a wealthy capitalist.",
        "poster_path": "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/jfwSexzlIzaOgxP9A8bTA6t8YYb.jpg",
        "backdrop_path": "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/zZiflZpuaZerugtfdyXcg6dcylD.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 14, "name": "Fantasy" },
            { "id": 12, "name": "Adventure" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-02-27",
        "original_language": "en",
        "tagline": "She seeks the power to free her people.",
        "vote_average": 6.4,
        "vote_count": 15000,
        "runtime": 102,
        "trailer_link": "https://www.youtube.com/embed/q3kdZpeVbLM?si=Y6dwrYaE5NQiSlUU"
    },
    {
        "_id": "324537",
        "id": 324537,
        "title": "Measure in Love (2025)",
        "overview": "A well-meaning but rather inept angel named Gabriel meddles in the lives of a struggling gig worker and a wealthy capitalist.",
        "poster_path": "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/7CSO29w9RYLY9R6TVLTkGy0oMIm.jpg",
        "backdrop_path": "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/n3mqsvKiqElRQ4KjDQ0NADQPVP5.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 14, "name": "Fantasy" },
            { "id": 12, "name": "Adventure" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-02-27",
        "original_language": "en",
        "tagline": "She seeks the power to free her people.",
        "vote_average": 6.4,
        "vote_count": 15000,
        "runtime": 102,
        "trailer_link": "https://www.youtube.com/embed/xiQlLJ2MeOc?si=8tZu0dBffgwgGMIm"
    },
    {
        "_id": "1232546",
        "id": 1232546,
        "title": "Until Dawn",
        "overview": "One year after her sister Melanie mysteriously disappeared, Clover and her friends head into the remote valley where she vanished in search of answers. Exploring an abandoned visitor center, they find themselves stalked by a masked killer and horrifically murdered one by one...only to wake up and find themselves back at the beginning of the same evening.",
        "poster_path": "https://image.tmdb.org/t/p/original/juA4IWO52Fecx8lhAsxmDgy3M3.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/icFWIk1KfkWLZnugZAJEDauNZ94.jpg",
        "genres": [
            { "id": 27, "name": "Horror" },
            { "id": 9648, "name": "Mystery" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-04-23",
        "original_language": "en",
        "tagline": "Every night a different nightmare.",
        "vote_average": 6.405,
        "vote_count": 18000,
        "runtime": 103,
    },

    {
        "_id": "552524",
        "id": 552524,
        "title": "Lilo & Stitch",
        "overview": "The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.",
        "poster_path": "https://image.tmdb.org/t/p/original/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
        "genres": [
            { "id": 10751, "name": "Family" },
            { "id": 35, "name": "Comedy" },
            { "id": 878, "name": "Science Fiction" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-05-17",
        "original_language": "en",
        "tagline": "Hold on to your coconuts.",
        "vote_average": 7.117,
        "vote_count": 27500,
        "runtime": 108,
    },
    {
        "_id": "668489",
        "id": 668489,
        "title": "Havoc",
        "overview": "When a drug heist swerves lethally out of control, a jaded cop fights his way through a corrupt city's criminal underworld to save a politician's son.",
        "poster_path": "https://image.tmdb.org/t/p/original/ubP2OsF3GlfqYPvXyLw9d78djGX.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/65MVgDa6YjSdqzh7YOA04mYkioo.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 80, "name": "Crime" },
            { "id": 53, "name": "Thriller" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-04-25",
        "original_language": "en",
        "tagline": "No law. Only disorder.",
        "vote_average": 6.537,
        "vote_count": 35960,
        "runtime": 107,
    },
    {
        "_id": "950387",
        "id": 950387,
        "title": "A Minecraft Movie",
        "overview": "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they'll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.",
        "poster_path": "https://image.tmdb.org/t/p/original/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
        "genres": [
            { "id": 10751, "name": "Family" },
            { "id": 35, "name": "Comedy" },
            { "id": 12, "name": "Adventure" },
            { "id": 14, "name": "Fantasy" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-03-31",
        "original_language": "en",
        "tagline": "Be there and be square.",
        "vote_average": 6.516,
        "vote_count": 15225,
        "runtime": 101,
    },
    {
        "_id": "575265",
        "id": 575265,
        "title": "Mission: Impossible - The Final Reckoning",
        "overview": "Ethan Hunt and team continue their search for the terrifying AI known as the Entity — which has infiltrated intelligence networks all over the globe — with the world's governments and a mysterious ghost from Hunt's past on their trail. Joined by new allies and armed with the means to shut the Entity down for good, Hunt is in a race against time to prevent the world as we know it from changing forever.",
        "poster_path": "https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/1p5aI299YBnqrEEvVGJERk2MXXb.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 12, "name": "Adventure" },
            { "id": 53, "name": "Thriller" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-05-17",
        "original_language": "en",
        "tagline": "Our lives are the sum of our choices.",
        "vote_average": 7.042,
        "vote_count": 19885,
        "runtime": 170,
    },
    {
        "_id": "324544",
        "id": 324544,
        "title": "In the Lost Lands",
        "overview": "A queen sends the powerful and feared sorceress Gray Alys to the ghostly wilderness of the Lost Lands in search of a magical power, where she and her guide, the drifter Boyce, must outwit and outfight both man and demon.",
        "poster_path": "https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 14, "name": "Fantasy" },
            { "id": 12, "name": "Adventure" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-02-27",
        "original_language": "en",
        "tagline": "She seeks the power to free her people.",
        "vote_average": 6.4,
        "vote_count": 15000,
        "runtime": 102,
    },
    {
        "_id": "986056",
        "id": 986056,
        "title": "Thunderbolts*",
        "overview": "After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.",
        "poster_path": "https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 878, "name": "Science Fiction" },
            { "id": 12, "name": "Adventure" }
        ],
        "casts": dummyCastsData,
        "release_date": "2025-04-30",
        "original_language": "en",
        "tagline": "Everyone deserves a second shot.",
        "vote_average": 7.443,
        "vote_count": 23569,
        "runtime": 127,
    }
]

export const dummyDateTimeData = {
    "2025-11-01": [
        { "time": "2025-11-01T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd1" },
        { "time": "2025-11-01T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd2" },
        { "time": "2025-11-01T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd3" }
    ],
    "2025-11-02": [
        { "time": "2025-11-02T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd4" },
        { "time": "2025-11-02T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd5" },
        { "time": "2025-11-02T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd6" }
    ],
    "2025-11-03": [
        { "time": "2025-11-03T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd7" },
        { "time": "2025-11-03T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd8" },
        { "time": "2025-11-03T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd9" }
    ],
    "2025-11-04": [
        { "time": "2025-11-04T01:00:00.000Z", "showId": "68395b407f6329be2bb45bda" },
        { "time": "2025-11-04T03:00:00.000Z", "showId": "68395b407f6329be2bb45bdb" },
        { "time": "2025-11-04T05:00:00.000Z", "showId": "68395b407f6329be2bb45bdc" }
    ],
    "2025-11-05": [
        { "time": "2025-11-05T01:00:00.000Z", "showId": "68395b407f6329be2bb45bdd" },
        { "time": "2025-11-05T03:00:00.000Z", "showId": "68395b407f6329be2bb45bde" },
        { "time": "2025-11-05T05:00:00.000Z", "showId": "68395b407f6329be2bb45bdf" }
    ],
    "2025-11-06": [
        { "time": "2025-11-06T01:00:00.000Z", "showId": "68395b407f6329be2bb45be0" },
        { "time": "2025-11-06T03:00:00.000Z", "showId": "68395b407f6329be2bb45be1" },
        { "time": "2025-11-06T05:00:00.000Z", "showId": "68395b407f6329be2bb45be2" }
    ]
}

export const dummyDashboardData = {
    "totalBookings": 14,
    "totalRevenue": 750000,
    "totalUser": 5,
    "activeShows": [
        {
            "_id": "68352363e96d99513e4221a4",
            "movie": dummyShowsData[0],
            "showDateTime": "2025-06-30T02:30:00.000Z",
            "showPrice": 50000,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "C1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
        },
        {
            "_id": "6835238fe96d99513e4221a8",
            "movie": dummyShowsData[1],
            "showDateTime": "2025-06-30T15:30:00.000Z",
            "showPrice": 50000,
            "occupiedSeats": {},
        },
        {
            "_id": "6835238fe96d99513e4221a9",
            "movie": dummyShowsData[2],
            "showDateTime": "2025-06-30T03:30:00.000Z",
            "showPrice": 50000,
            "occupiedSeats": {},
        },
        {
            "_id": "6835238fe96d99513e4221aa",
            "movie": dummyShowsData[3],
            "showDateTime": "2025-07-15T16:30:00.000Z",
            "showPrice": 50000,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A4": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
        },
        {
            "_id": "683682072b5989c29fc6dc0d",
            "movie": dummyShowsData[4],
            "showDateTime": "2025-06-05T15:30:00.000Z",
            "showPrice": 50000,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
            "__v": 0
        },
        {
            "_id": "68380044686d454f2116b39a",
            "movie": dummyShowsData[5],
            "showDateTime": "2025-06-20T16:00:00.000Z",
            "showPrice": 50000,
            "occupiedSeats": {
                "A1": "user_2xl7eCSUHddibk5lRxfOtw9RMwX",
                "A2": "user_2xl7eCSUHddibk5lRxfOtw9RMwX"
            }
        }
    ]
}


export const dummyBookingData = [
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 100000,
        "bookedSeats": ["D1", "D2"],
        "isPaid": false,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[1],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 50000,
        "bookedSeats": ["A1"],
        "isPaid": true,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[2],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 150000,
        "bookedSeats": ["A1", "A2", "A3"],
        "isPaid": true,
    },
]