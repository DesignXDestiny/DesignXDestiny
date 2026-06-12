export default async function handler(req, res) {
  const apiKey = process.env.PRINTFUL_API_KEY; 

  try {
    // Stable v1 endpoint that accesses the sync products for your token's store
    const response = await fetch('https://api.printful.com/v1/sync/products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    // Send the raw data to the browser console so we can read exactly what it returns
    console.log("Printful Response:", data);

    // Pass the clean array of products straight to art.html
    return res.status(200).json(data.result || []);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from Printful" });
  }
}
