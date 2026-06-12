export default async function handler(req, res) {
  const apiKey = process.env.PRINTFUL_API_KEY; 

  try {
    // Uses the exact /sync/products path from the Sync API documentation
    const response = await fetch('https://api.printful.com/sync/products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-PF-Store-Id': '18317284' // Your verified Store ID
      }
    });

    const data = await response.json();
    
    // Returns your actual custom stickers instead of blank templates
    return res.status(200).json(data.result || []);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from Printful" });
  }
}
