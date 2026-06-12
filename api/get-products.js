export default async function handler(req, res) {
  // This pulls the key safely from Vercel's Environment Variables
  const apiKey = process.env.PRINTFUL_API_KEY; 

  try {
    // UPDATED ENDPOINT: Changed /sync/products to /products
    const response = await fetch('https://api.printful.com/v2/stores/18317284/products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    // Pass the clean array straight to your gallery page
    return res.status(200).json(data.result || []);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from Printful" });
  }
}
