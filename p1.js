var txt = '<students>';
txt += '<student>';
txt += '<ID>12345</ID>';
txt += '<name>Juan</name>';
txt += '<sex>Male</sex>';
txt+= '<maritalStatus>Single</maritalStatus>';
txt += '</student>';
txt += '<student>';
txt += '<ID>123456</ID>';
txt += '<name>Leticia</name>';
txt += '<sex>Female</sex>';
txt+= '<maritalStatus>Single</maritalStatus>';
txt += '</student>';
txt += '<student>';
txt += '<ID>1234578</ID>';
txt += '<name>Pedro</name>';
txt += '<sex>Male</sex>';
txt+= '<maritalStatus>Married</maritalStatus>';
txt += '</student>';
txt += '</studentes>';

var parser = new DOMParser();

var xmlDoc = parser.parseFromString(txt,"text/xml");


function s_create()
{
	document.getElementById("s_create").style.display = "block";
	document.getElementById("s_delete").style.display = "none";
	document.getElementById("s_search").style.display = "none";
	document.getElementById("s_update").style.display = "none";
	document.getElementById("s_report").style.display = "none";
} //s_create

function s_delete()
{
	document.getElementById("s_create").style.display = "none";
	document.getElementById("s_delete").style.display = "block";
	document.getElementById("s_search").style.display = "none";
	document.getElementById("s_update").style.display = "none";
	document.getElementById("s_report").style.display = "none";
}

function s_update()
{
	document.getElementById("s_create").style.display = "none";
	document.getElementById("s_delete").style.display = "none";
	document.getElementById("s_search").style.display = "none";
	document.getElementById("s_update").style.display = "block";
	document.getElementById("s_report").style.display = "none";
}

function s_search()
{
	document.getElementById("s_create").style.display = "none";
	document.getElementById("s_delete").style.display = "none";
	document.getElementById("s_search").style.display = "block";
	document.getElementById("s_update").style.display = "none";
	document.getElementById("s_report").style.display = "none";
}

function s_report()
{
	document.getElementById("s_create").style.display = "none";
	document.getElementById("s_delete").style.display = "none";
	document.getElementById("s_search").style.display = "none";
	document.getElementById("s_update").style.display = "none";
	document.getElementById("s_report").style.display = "block";

	var table = document.getElementById("tableReport");

	table.innerHTML = "";
	table.innerHTML = "<thead><tr>"
						+"<th>ID<th>"
						+"<th>Name</th>"
						+"<th>Marital Status</th>"
						+"</tr></thead>"
						+"<tbody>";

	x = xmlDoc.getElementsByTagName("student");
	l = x.length; 
	for(i=0;i<1;i++)
	{
			table.innerHTML += "<tr>"
							+"<td>"
							+ x[i].childNodes[0].childNodes[0].nodeValue
							+"</td>"
							+"<td>"
							+ x[i].childNodes[1].childNodes[0].nodeValue	
							+"</td>"
							+"<td>"
							+ x[i].childNodes[2].childNodes[0].nodeValue	
							+"</td>"
							+"<td>"
							+ x[i].childNodes[3].childNodes[0].nodeValue	
							+"</td>"
							+"</tr>";
	}//for
	table.innerHTML += "</tbody>";	
}
