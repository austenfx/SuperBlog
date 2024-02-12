import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

posts.push({
    title: "test",
    description: "descriprion test yes",
    content: "yesss lorem ipson",
    timeEdited: SetTimeEdited()
});


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
});

app.get("/create", (req, res) => {
    res.render("create.ejs")
});

app.get("/edit:id", (req, res) => {
    res.render("edit.ejs", { posts: posts[req.params.id], id: req.params.id});
});

app.get("/delete:id", (req, res) => {
    let x = posts.splice(req.params.id, 1);
    res.redirect("/");
})

app.post("/submitchanges:id", (req, res) => {
    let post = {
        title: req.body["title"],
        description: req.body["description"],
        content: req.body["content"],
        timeEdited: SetTimeEdited()
    }

    let oldPost = posts.splice(req.params.id, 1);
    posts.push(post);
    
    res.redirect("/");
})

app.post("/submit", (req, res) => {
    posts.push({
        title: req.body["title"],
        description: req.body["description"],
        content: req.body["content"],
        timeEdited: SetTimeEdited()
    });

    res.redirect("/");
});

app.get("/view:id", (req, res) => {
    
    res.render("view.ejs", { posts: posts[req.params.id], id: req.params.id });
})

function SetTimeEdited(){
    let date = new Date();
    let timeString = date.getHours() + ":" + date.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
    return timeString;
}


app.listen(port, () => {
    console.log("Server running on port " + port)
});


