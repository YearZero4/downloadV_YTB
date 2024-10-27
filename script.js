function audio() {
 const baseURL = 'https://redirector.gv.cmnetworkusercontent.com/video?scope=streaming&itag=';
 const itags = [251, 140, 250, 249, 139];
 var url = document.getElementById('url').value;

 var name = document.getElementById('name').value;
 var findx=url.indexOf("/short");
 if(findx == -1){
 var id = url.match(/v=([\w-]+)/);
 var id=id[1];
 } else {
 var id = url.split('/').pop();
 }
 if(name == ''){
  var name='audio';
 }
 function tryDownload(itagIndex) {
  if (itagIndex >= itags.length) {
document.getElementById('status').textContent = 'NO SE PUDO DESCARGAR EL VIDEO CON NINGUN ITAG';
return;
  }
  var link = baseURL + itags[itagIndex] + '&id=' + id;
  document.getElementById('result').textContent = 'DESCARGANDO AUDIO, POR FAVOR ESPERE...';
  var progressBar = document.getElementById('progressBar');
  progressBar.style.width = '0%';
  progressBar.style.display = 'block';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', link, true);
  xhr.responseType = 'blob';

  xhr.onprogress = function(event) {
if (event.lengthComputable) {
 var percentComplete = (event.loaded / event.total) * 100;
 progressBar.style.width = percentComplete + '%';
}
  };
  xhr.onload = function() {
if (xhr.status === 200) {
 const blob = xhr.response;
 const a = document.createElement('a');
 a.href = URL.createObjectURL(blob);
 a.download = name + '.mp3';
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(a.href);
} else {
 tryDownload(itagIndex + 1);
}
  };
  xhr.onerror = function() {
document.getElementById('status').textContent = 'OCURRIO UN ERROR AL INTENTAR REALIZAR LA DESCARGA';
  };

  xhr.send();
 }
 tryDownload(0);
}

function video() {
 var x = 'https://redirector.gv.cmnetworkusercontent.com/video?scope=streaming&itag=18&id=';
 var url = document.getElementById('url').value;
 var name = document.getElementById('name').value;

 var findx=url.indexOf("/short");
 if(findx == -1){
 var id = url.match(/v=([\w-]+)/);
 var id=id[1];
 } else {
 var id = url.split('/').pop();
 }
if(name == ''){
  var name='video';
 }
 var link = x + id;

 document.getElementById('result').textContent = 'DESCARGANDO VIDEO, POR FAVOR ESPERE...';
 var progressBar = document.getElementById('progressBar');
 progressBar.style.width = '0%';
 progressBar.style.display = 'block';
 var xhr = new XMLHttpRequest();
 xhr.open('GET', link, true);
 xhr.responseType = 'blob';

 xhr.onprogress = function(event) {
  if (event.lengthComputable) {
var percentComplete = (event.loaded / event.total) * 100;
progressBar.style.width = percentComplete + '%';
  }
 };

 xhr.onload = function() {
  if (xhr.status === 200) {
const blob = xhr.response;
const a = document.createElement('a');
a.href = URL.createObjectURL(blob);
a.download = name + '.mp4';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(a.href);
  } else {
document.getElementById('status').textContent = 'HUBO UN PROBLEMA EN LA DESCARGA';
  }
 };

 xhr.onerror = function() {
  document.getElementById('status').textContent = 'OCURRIO UN ERROR AL INTENTAR REALIZAR LA DESCARGA';
 };

 xhr.send();
}

function download() {
 const selectElement = document.getElementById('mediaSelect');
 const selectedValue = selectElement.value;
 if (selectedValue === 'audio') {
  audio();
 } else if (selectedValue === 'video') {
  video();
 }
}
