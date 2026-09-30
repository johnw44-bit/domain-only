// Allt som skrivs/väljs i adressfältet hamnar på domänens rot, och inskrivna undersidor
// rensas ur historiken så att adressfältet aldrig föreslår dem.
const deep = u => {
  const x = new URL(u);
  return /^https?:$/.test(x.protocol) && (x.pathname !== '/' || x.search || x.hash);
};

chrome.webNavigation.onCommitted.addListener(d => {
  // redirect-kvalificerare = domänen skickade själv vidare (t.ex. gmail.com), respektera det
  if (d.frameId === 0 && d.transitionType === 'typed' && deep(d.url) &&
      !d.transitionQualifiers.some(q => q.endsWith('_redirect')))
    chrome.tabs.update(d.tabId, { url: new URL(d.url).origin + '/' });
});

chrome.history.onVisited.addListener(h => {
  if (h.typedCount > 0 && deep(h.url)) chrome.history.deleteUrl({ url: h.url });
});

chrome.runtime.onInstalled.addListener(async () => {
  for (const h of await chrome.history.search({ text: '', startTime: 0, maxResults: 1000000 }))
    if (h.typedCount > 0 && deep(h.url)) chrome.history.deleteUrl({ url: h.url });
});
