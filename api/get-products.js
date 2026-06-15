export default async function handler(req, res) {
  const apiKey = process.env.PRINTFUL_API_KEY; 

  try {
    // 1. Switched from /sync/products to the correct v1 manual catalog endpoint
    // 2. Moved the Store ID from the headers into the URL parameter (?store_id=)
    const url = 'https://api.printful.com/products?store_id=18317284';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    // Returns your artwork using the v1 "result" key wrapper
    return res.status(200).json(data.result || []);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from Printful" });
  }
}