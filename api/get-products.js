export default async function handler(req, res) {
  const apiKey = process.env.PRINTFUL_API_KEY; 

  try {
    // 1. The exact, correct V1 URL path
    const url = 'https://api.printful.com/sync/products';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        // 2. The proper header name and your actual Store ID
        'X-PF-Store-Id': '18317284', 
        'Content-Type': 'application/json'
      }
    });

    // 3. If Printful rejects it, this will tell us exactly why in the logs
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Printful API Error Response:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    
    // 4. Send the successful array back to your homepage script
    return res.status(200).json(data.result || []);

  } catch (error) {
    console.error("Serverless Function Crash:", error.message);
    return res.status(500).json({ error: error.message });
  }
}