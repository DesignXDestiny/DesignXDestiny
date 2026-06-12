export default async function handler(req, res) {
  const apiKey = process.env.PRINTFUL_API_KEY; 

  try {
    // Matches the exact URL path provided in the documentation sample
    const response = await fetch('https://api.printful.com/products', {
      method: 'GET',
      headers: {
        // Matches the required account-level authentication pattern
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
