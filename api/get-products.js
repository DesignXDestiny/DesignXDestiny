// api/get-products.js
export default async function handler(req, res) {
  // This pulls the key safely from Vercel's Environment Variables
  const apiKey = process.env.PRINTFUL_API_KEY; 

  try {
    const response = await fetch('https://api.printful.com/v2/stores/18317284/products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from Printful" });
  }
}
