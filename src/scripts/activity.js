let myIP = `Desconhecido${Math.floor(Math.random() * 1000)}`;

const getdataHour = () => {
  const currentDate = new Date();
  return currentDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
}

async function getIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    myIP = data.ip
  } catch (error) {
    console.error('Erro ao obter o endereço IP:', error);
  }
}

function getDeviceType() {
  const userAgent = navigator.userAgent;
  let device = /Mobi|Android/i.test(userAgent) ? "Mobile" : "Desktop";

  return device;
}

(async ()=>{
  await getIP();
  sendActivity("Acessou o site "+window.location.href);
})()


function sendActivity(activity) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "update_json.php", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
    }
  };
  var data = JSON.stringify({ cliente: myIP, device: getDeviceType(), activity: `${getdataHour()} - ${activity}` });
  xhr.send(data);
}