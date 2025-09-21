const RESOURCE_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

async function fetchMarketPrices({
  apiKey = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
  state,
  district,
  market,
  commodity,
  variety,
  grade,
  offset = 0,
  limit = 100,
  format = "json"
} = {}) {
  if (!apiKey) throw new Error("apiKey is required.");

  // Build query parameters
  const params = new URLSearchParams();
  params.set("api-key", apiKey);
  params.set("format", format);
  params.set("offset", String(offset));
  params.set("limit", String(limit));

  // Add filters only if provided
  if (state) params.set("filters[state.keyword]", state);
  if (district) params.set("filters[district]", district);
  if (market) params.set("filters[market]", market);
  if (commodity) params.set("filters[commodity]", commodity);
  if (variety) params.set("filters[variety]", variety);
  if (grade) params.set("filters[grade]", grade);

  const url = `${RESOURCE_URL}?${params.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });

  // Helpful debug info (in case of errors)
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Data.gov.in API error: ${res.status} ${res.statusText} — ${text}`);
  }

  // Parse JSON
  const json = await res.json();
  return json;
}

export { fetchMarketPrices };