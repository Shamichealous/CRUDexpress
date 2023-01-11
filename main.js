let express = require("express");

let app = express()

app.use(express.json())

let PORT = 7666

let db = []

let nextId = 1

//add item
app.post("/todos", function(req, res){
    let payload = req.body;

    let task = payload.task;
    let description = payload.description;

    let id = nextId;

    nextId++;

    let element = {
        id: id,
        task: task, 
        description: description, 
        done: false
    }
    db.push(element);
    res.sendStatus(204); 
})
//get all items
app.get("/todos", function(req, res){
    res.json(db);
})

//get single item details
app.get("/todos/:id", function(req,res){

    let id = req.params.id;

    let matchItems;

    for(let i = 0; i < db.length; i++){
        let entry = db[i];
        if(entry.id == id){
            matchItems = entry;
            break;
        }
    }
    res.json(matchItems)
})
//delete items
app.delete("/todos/:id", function(req, res){

    let id = req.params.id;

    for(let i = 0; i < db.length; i++){
        if(id == db[i].id){
            db.splice(i,1);
        }
    }
    res.sendStatus(204);
})

//update item
app.put("/todos/:id", function(req, res){
    
    let id = req.params.id;

    for(let i = 0; i < db.length; i++){
        if(id == db[i].id){
            matchingItem = db[i];
            break;
        }
    }
    if(matchingItem){
        matchingItem.task = req.body.task;
        matchingItem.description = req.body.description;
        matchingItem.done = req.body.done == true;
    }
    res.sendStatus(204);
})

app.listen(PORT, function(){
    console.log("application started on port", PORT);
})

