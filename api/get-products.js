export default async function handler(req, res) {
  const apiKey = process.env.PRINTFUL_API_KEY; 

  try {
    // Combining the base URL and the endpoint path exactly as documented
    const response = await fetch('https://api.printful.com/sync/products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-PF-Store-Id': '18317284'
      }
    });

    const data = await response.json();
    return res.status(200).json(data.result || []);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from Printful" });
  }
}
