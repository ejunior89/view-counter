async function fetchViewers(channel) {
  try {
    const response = await fetch(`https://kick.com/api/v2/channels/${channel}`);
    if (!response.ok) throw new Error("Canal não encontrado");

    const data = await response.json();
    const viewers = data?.livestream?.viewer_count ?? 0;

    document.getElementById("channel-name").textContent = channel;
    document.getElementById("viewer-count").textContent = `👁 ${viewers}`;
  } catch (error) {
    document.getElementById("viewer-count").textContent = "Erro 😢";
    console.error(error);
  }
}

function getChannelFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("channel") || "kick";
}

function startCounter() {
  const channel = getChannelFromURL();
  fetchViewers(channel);
  setInterval(() => fetchViewers(channel), 5000); // Atualiza a cada 5s
}

startCounter();
// Exibe o nome do canal no título da página
document.title = `Contador de Visualizações - ${getChannelFromURL()}`;
// Exibe o nome do canal no elemento de título
document.getElementById("channel-name").textContent = getChannelFromURL();