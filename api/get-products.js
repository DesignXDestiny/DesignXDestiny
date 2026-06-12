export default async function handler(req, res) {
  // This pulls the key safely from Vercel's Environment Variables
  const apiKey = process.env.PRINTFUL_API_KEY; 

  try {
    // 1. CHANGED: Hit the global v2 store-products endpoint
    const response = await fetch('https://api.printful.com/v2/store-products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        // 2. ADDED: Pass your Store ID inside this specific header instead of the URL
        'X-PF-Store-Id': '18317284'
      }
    });

    const data = await response.json();
    
    // Pass the clean array straight to your gallery page
    return res.status(200).json(data.result || []);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from Printful" });
  }
}
