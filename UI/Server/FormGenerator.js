//var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var mime = require('mime');

const officegen = require('officegen')
const fs = require('fs')

/* var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
}); */

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/BatchFile.html'));
});

/* app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
}); */

app.post('/generate', function (request, response)
    {
        let docx = officegen('docx')

        // Officegen calling this function after finishing to generate the docx document:
        docx.on('finalize', function(written) {
          console.log(
            'Finish to create a Microsoft Word document.'
          )
        })
        
        // Officegen calling this function to report errors:
        docx.on('error', function(err) {
          console.log(err)
        })
        
        // Create a new paragraph:
        let pObj = docx.createP()
        
        pObj.addText('Simple')
        pObj.addText(' with color', { color: '000088' })
        pObj.addText(' and back color.', { color: '00ffff', back: '000088' })
        
        pObj = docx.createP()
        
        pObj.addText('Since ')
        pObj.addText('officegen 0.2.12', {
          back: '00ffff',
          shdType: 'pct12',
          shdColor: 'ff0000'
        }) // Use pattern in the background.
        pObj.addText(' you can do ')
        pObj.addText('more cool ', { highlight: true }) // Highlight!
        pObj.addText('stuff!', { highlight: 'darkGreen' }) // Different highlight color.
        
        pObj = docx.createP()
        
        pObj.addText('Even add ')
        pObj.addText('external link', { link: 'https://github.com' })
        pObj.addText('!')
        
        pObj = docx.createP()
        
        pObj.addText('Bold + underline', { bold: true, underline: true })
        
        pObj = docx.createP({ align: 'center' })
        
        pObj.addText('Center this text', {
          border: 'dotted',
          borderSize: 12,
          borderColor: '88CCFF'
        })
        
        pObj = docx.createP()
        pObj.options.align = 'right'
        
        pObj.addText('Align this text to the right.')
        
        pObj = docx.createP()
        
        pObj.addText('Those two lines are in the same paragraph,')
        pObj.addLineBreak()
        pObj.addText('but they are separated by a line break.')
        
        //docx.putPageBreak()
        
        pObj = docx.createP()
        
        pObj.addText('Fonts face only.', { font_face: 'Arial' })
        pObj.addText(' Fonts face and size.', { font_face: 'Arial', font_size: 40 })
        
        docx.putPageBreak()
        
        pObj = docx.createP()
        
        // We can even add images:
        //pObj.addImage('some-image.png')
        
        // Let's generate the Word document into a file:
        
        let out = fs.createWriteStream('example.docx')
        
        out.on('error', function(err) {
          console.log(err)
        })
        
        // Async call to generate the output file:
        docx.generate(out)

        var file = __dirname + '/example.docx';

  var filename = path.basename(file);
  //var mimetype = mime.lookup(file);

  response.setHeader('Content-disposition', 'attachment; filename=' + filename);
  response.setHeader("Content-Type", "text/html");

  var filestream = fs.createReadStream(file);
  filestream.pipe(response);
        console.log('before setting attachement')
        response.attachment('/Server/example.docx');
        console.log('after setting attachement')
        response.download('/Server/..', 'example.docx');    
    }
)
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);