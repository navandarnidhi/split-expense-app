const apiRequest = async (url, method, body) => {
    url = `http://localhost:5000${url}`;
  try {
    const response = await axios(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}