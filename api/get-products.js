export default async function handler(req, res) {
  const apiKey = process.env.PRINTFUL_API_KEY; 

  try {
    // Base URL + documented request path for version 1
    const response = await fetch('https://api.printful.com/v1/sync/products', {
      method: 'GET',
      headers: {
        // Matches: --header 'Authorization: Bearer {private_token}'
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        // Matches: --header 'X-PF-Store-Id: {store_id}'
        'X-PF-Store-Id': '18317284'
      }
    });

    const data = await response.json();
    return res.status(200).json(data.result || []);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from Printful" });
  }
}
