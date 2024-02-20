const express = require("express");
const path = require("path");
const port = process.env.port || 4321;

const app = express();
app.set("view engine","ejs"); ///embedded javascript
app.use(express.static("/views"));
app.use(express.urlencoded({'extended':true}));
app.use(express.json());

let message="";

studentlist=[
	{
		'idno':'0001',
		'lastname':'alpha',
		'firstname':'bravo',
		'course':'bsit',
		'level':'3'
	},
	{
		'idno':'0002',
		'lastname':'charlie',
		'firstname':'delta',
		'course':'bscs',
		'level':'2'
	},
	{
		'idno':'0003',
		'lastname':'echo',
		'firstname':'foxtrot',
		'course':'bscs',
		'level':'1'
	},
];

app.post("/add",(req,res)=>{
	let idno = req.body.idno1;
	let lastname = req.body.lastname1;
	let firstname = req.body.firstname1;
	let course = req.body.course1;
	let level = req.body.level1;
	studentlist.push(
		{
			'idno':idno,
			'lastname':lastname,
			'firstname':firstname,
			'course':course,
			'level':level
		}
	);
	message="New Student Added";
	res.redirect("/");
});

app.get("/updatestudent/:idno/:lastname/:firstname/:course/:level", (req, res) => {
   const idno = req.params.idno;
   let lastname = req.body.lastname;
   let firstname = req.body.firstname;
   let course = req.body.course;
   let level = req.body.level;
   let message = "Student Updated"
   res.render("index.ejs",{header,studentlist,message,idno,lastname,firstname,course,level});
});

app.post("/updatestudent/:idno/:lastname/:firstname/:course/:level",(req,res)=>{
	const idno = req.params.idno;
    let lastname = req.body.lastname;
    let firstname = req.body.firstname;
    let course = req.body.course;
    let level = req.body.level;

    for (let i = 0; i < studentlist.length; i++) {
        if (studentlist[i].idno === idno) {
			idno === studentlist[i].idno
            studentlist[i] = {	
                'idno': idno,
                'lastname': lastname,
                'firstname': firstname,
                'course': course,
                'level': level
            };
            break;  
        }
    }
	message = "Student Updated" //MESSAGE ERROR
	res.render("index", {idno: idno,lastname: lastname, firstname:firstname, course:course, level:level, studentlist: studentlist, message: message});
});

app.get("/deletestudent",(req,res)=>{
	let index = req.query.index;
	studentlist.splice(index,1);
	message="Student Deleted";
	res.redirect("/");
});


app.get("/",(req,res)=>{	
    const idno = req.params.idno; 
	let lastname = req.body.lastname;
    let firstname = req.body.firstname;
    let course = req.body.course;
    let level = req.body.level;
	header=['idno','lastname','firstname','course','level','action'];
	res.render("index.ejs",{header,studentlist,message,idno,lastname,firstname,course,level});
});

app.listen(port,()=>{
	require("dns").lookup(require("os").hostname(),(err,addr,fam)=>{
		console.log("listening at %s:%s",addr,port);
	});
});


