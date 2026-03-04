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
txt += '</students>';

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

function sendData()
{
	id = document.getElementById("IDA").value;
	name = document.getElementById("nameA").value;
	sex = "";
	if(document.getElementById("sexMA").checked == true)
		sex = "Male";
	else
		sex = "Female";

	maritalStatus = document.getElementById("maritalStatusA").value;

	newEleID = xmlDoc.createElement("ID");
	newTxtID = xmlDoc.createTextNode(id);
	newEleID.appendChild(newTxtID);

	newEleName = xmlDoc.createElement("name");
	newTxtName =  xmlDoc.createTextNode(name);
	newEleName.appendChild(newTxtName);

	newEleSex = xmlDoc.createElement("sex");
	newTxtSex =  xmlDoc.createTextNode(sex);
	newEleSex.appendChild(newTxtSex);

	newEleMaritalStatus = xmlDoc.createElement("maritalStatus");
	newTxtMaritalStatus =  xmlDoc.createTextNode(maritalStatus);
	newEleMaritalStatus.appendChild(newTxtMaritalStatus);


	newEleA = xmlDoc.createElement("student");
	newEleA.appendChild(newEleID);
	newEleA.appendChild(newEleName);
	newEleA.appendChild(newEleSex);
	newEleA.appendChild(newEleMaritalStatus);

	xmlDoc.getElementsByTagName("students")[0].appendChild(newEleA);


	alert("Student created ");
}//sendData()

function s_delete()
{
	document.getElementById("s_create").style.display = "none";
	document.getElementById("s_delete").style.display = "block";
	document.getElementById("s_search").style.display = "none";
	document.getElementById("s_update").style.display = "none";
	document.getElementById("s_report").style.display = "none";
}

function deleteData()
{
	ID = document.getElementById("IDB").value;
	i = 0; //index
	flag = false;
	x = xmlDoc.getElementsByTagName("student");
	l = x.length;
	while ((i < l) && (flag==false))
	{
		if(x[i].childNodes[0].childNodes[0].nodeValue == ID)
		{
			userconf = confirm("Delete student : "
								+x[i].childNodes[0].childNodes[0].nodeValue //ID
								+" - "
								+x[i].childNodes[1].childNodes[0].nodeValue //name
								+"?"
							);
			if(userconf == true)
			{
				x[i].parentNode.removeChild(x[i]);
				alert("Student deleted");
			}
				flag = true;
		
		}//if 
		else
		{
			i++;	
	
		}//else
	}//while
	if(flag == false)
		alert("Student not found");
}//deleteData
function s_update()
{
	document.getElementById("s_create").style.display = "none";
	document.getElementById("s_delete").style.display = "none";
	document.getElementById("s_search").style.display = "none";
	document.getElementById("s_update").style.display = "block";
	document.getElementById("s_report").style.display = "none";
}

var indexFound;
function changeData()
{
	ID= document.getElementById("searchC").value;
	i = 0;
	flag = false;	
	x = xmlDoc.getElementsByTagName("student");
	l = x.length;
	while ((i < l) && (flag==false))
	{
		if(x[i].childNodes[0].childNodes[0].nodeValue == ID)		//Found student
		{
			document.getElementById("IDC").value =
				x[i].childNodes[0].childNodes[0].nodeValue;
			document.getElementById("nameC").value =
				x[i].childNodes[1].childNodes[0].nodeValue;
			if(x[i].childNodes[2].childNodes[0].nodeValue == "Female")
			{
				document.getElementById("sexFC").checked = true;
				document.getElementById("sexMC").checked = false;
			}
			else	//"Male"
			{
				document.getElementById("sexMC").checked = true;
				document.getElementById("sexFC").checked = false;
			}
			document.getElementById("maritalStatusC").value =
				x[i].childNodes[3].childNodes[0].nodeValue;
			indexFound = i;
			flag = true;
		}//if 
		else
		{
			i++;	
		}//else
	}//while
	if(flag)
	{
		document.getElementById("formUpdate").style.display = "block";
	}
	else
	{
		document.getElementById("formUpdate").style.display = "none";
		alert("Student not found");
	}
}

function updateData()
{
	// Get updated values from form
	id = document.getElementById("IDC").value;
	name = document.getElementById("nameC").value;
	sex = "";
	if(document.getElementById("sexMC").checked == true)
		sex = "Male";
	else
		sex = "Female";
	
	maritalStatus = document.getElementById("maritalStatusC").value;

	// Update the student in XML
	x = xmlDoc.getElementsByTagName("student");
	
	// Update ID
	x[indexFound].childNodes[0].childNodes[0].nodeValue = id;
	// Update Name
	x[indexFound].childNodes[1].childNodes[0].nodeValue = name;
	// Update Sex
	x[indexFound].childNodes[2].childNodes[0].nodeValue = sex;
	// Update Marital Status
	x[indexFound].childNodes[3].childNodes[0].nodeValue = maritalStatus;
	
	alert("Student updated successfully");
	
	// Hide the form after update
	document.getElementById("formUpdate").style.display = "none";
	document.getElementById("searchC").value = "";
}
function s_search()
{
	document.getElementById("s_create").style.display = "none";
	document.getElementById("s_delete").style.display = "none";
	document.getElementById("s_search").style.display = "block";
	document.getElementById("s_update").style.display = "none";
	document.getElementById("s_report").style.display = "none";
}//s_search

function search()
{
	field = document.getElementById("fieldSearch").value;
	value =  document.getElementById("textSearch").value;
	count = 0;

	a = xmlDoc.getElementsByTagName("student");
	x = xmlDoc.getElementsByTagName(field);
	l = a.length;

	var table = document.getElementById("resultSearch");

	table.innerHTML = "";
	table.innerHTML = "<thead><tr>"
						+"<th>ID</th>"
						+"<th>Name</th>"
						+"<th>Sex</th>"
						+"<th>Marital Status</th>"
						+"</tr></thead>"
						+"<tbody>";
	for(i=0;i<l;i++)
	{
		if (x[i].childNodes[0].nodeValue == value)
		{
			table.innerHTML += "<tr>"
							+"<td>"
							+ a[i].childNodes[0].childNodes[0].nodeValue
							+"</td>"
							+"<td>"
							+ a[i].childNodes[1].childNodes[0].nodeValue	
							+"</td>"
							+"<td>"
							+ a[i].childNodes[2].childNodes[0].nodeValue	
							+"</td>"
							+"<td>"
							+ a[i].childNodes[3].childNodes[0].nodeValue	
							+"</td>"
							+"</tr>";
		}
	}//for
	table.innerHTML += "</tbody>";	



}//search
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
						+"<th>ID</th>"
						+"<th>Name</th>"
						+"<th>Sex</th>"
						+"<th>Marital Status</th>"
						+"</tr></thead>"
						+"<tbody>";

	x = xmlDoc.getElementsByTagName("student");
	l = x.length; 
	for(i=0;i<l;i++)
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
