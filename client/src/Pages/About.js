import profile from "../profile.jpg"

export default function About() {
    return (
        <div className="about-page list">
            <h1>About this page</h1>
            <p>This is a list of my favourite music albums. I made this app using Mongo DB, Express, React and Node.js.</p>
            <p>On the front page threre is a list of all albums, and the app has features to add, edit or delete an album. There is a special page for adding and editing an album, and all albums are stored in external database.</p>
            <p>This project was a good oportunity for me to learn using MERN.</p>
            <h2>About Me</h2>
            <img src={profile} alt="profile"/>
            <p>My name is Mor and I'm a web developer and a climbing instuctor. I love to learn new things and polish the knowledge I already have. I'm my free time i like to play guitar or go somewhere in the nature.</p>
            <p>As for my taste in music, I'll let this app speak for me.</p>
        </div>
    )
}