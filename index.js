const webhookURL =
"https://discord.com/api/webhooks/1378339517244637254/MGvxvQUn99bCK-64RpXlMVJD1Le99nSmS5Dbxm6_hcT8D2AvP0jzulHdXtkFSyYYfsEW";

function switchSection() {
const val = document.getElementById("mainSelect").value;
document.getElementById("farm").style.display = "none";
document.getElementById("clan").style.display = "none";
document.getElementById("stock").style.display = "none";
document.getElementById(val).style.display = "block";
}

function getCheckedValues(name) {
return Array.from(
  document.querySelectorAll(`input[name="${name}"]:checked`)
).map((i) => i.value);
}

function submitForm() {
const section = document.getElementById("mainSelect").value;
let message = `**Форма: ${section.toUpperCase()}**\n`;

if (section === "farm") {
  const types = getCheckedValues("farmType");
  const amount = document.getElementById("farmAmount").value;
  const dsc = document.getElementById("farmDiscord").value;
  const steam = document.getElementById("farmSteam").value;
  message += `Типы: ${types.join(
    ", "
  )}\nКол-во: ${amount}\nDiscord: ${dsc}\nSteam: ${steam}`;
}

if (section === "clan") {
  const roles = getCheckedValues("role");
  const duties = getCheckedValues("duty");
  const dsc = document.getElementById("clanDiscord").value;
  const steam = document.getElementById("clanSteam").value;
  message += `Роли: ${roles.join(", ")}\nОтветственность: ${duties.join(
    ", "
  )}\nDiscord: ${dsc}\nSteam: ${steam}`;
}

if (section === "stock") {
  const dsc = document.getElementById("stockDiscord").value;
  const steam = document.getElementById("stockSteam").value;
  const text = document.getElementById("stockText").value;
  message += `Discord: ${dsc}\nSteam: ${steam}\nСклад: ${text}`;
}

fetch(webhookURL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content: message }),
});

document.getElementById("submitBtn").disabled = true;
document.getElementById("cooldownMsg").innerText =
  "Подождите 5 минут перед следующей отправкой!";
setTimeout(() => {
  document.getElementById("submitBtn").disabled = false;
  document.getElementById("cooldownMsg").innerText = "";
}, 5 * 60 * 1000);
}