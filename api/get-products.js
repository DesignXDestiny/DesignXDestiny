export default async function handler(req, res) {
  const apiKey = process.env.PRINTFUL_API_KEY; 

  try {
    // FIX: Changed from '/sync' to '/sync/products'
    const url = 'https://api.printful.com/sync/products';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        // Keep the store ID in the headers as Printful expects for V1 token authorization
        'X-PF-Store-Id': '18317284', 
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